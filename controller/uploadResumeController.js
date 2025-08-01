
const AdmZip = require('adm-zip');
const pdfParse = require('pdf-parse');
const fs = require('fs/promises');
const path = require('path');
const geminiAPIController = require('./geminieController');

exports.uploadResumes = async (req, res) => {
    const uploadedZipPath = req.file?.path;
    // const extractedFolderPath = path.join('uploads', req.file?.filename);

    if (!uploadedZipPath) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
        // Step 2: Extract PDFs from the ZIP file
        const pdfPaths = await extractZip(uploadedZipPath, 'extractedPdf');

        // Step 3: Extract text from each PDF
        const pdfTexts = await extractTextFromPdfs(pdfPaths);

        // Step 4: Cleanup files
        await cleanupFiles([uploadedZipPath, ...pdfPaths]);


        let geminaiRes = await geminiAPIController(pdfTexts[0].toString());
        // Step 5: Return the extracted text
        res.json({ geminaiRes });
    } catch (error) {
        const rcaMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: rcaMessage });
    }
}

const extractZip = (zipPath, destFolder) => {
    return new Promise((resolve, reject) => {
        try {
            const zip = new AdmZip(zipPath);
            const zipEntries = zip.getEntries();

            const extractedFiles = [];
            zipEntries.forEach((entry) => {
                const entryName = entry.entryName;
                const isHiddenFile = path.basename(entryName).startsWith('._') || entryName.startsWith('__MACOSX');

                // Only process valid PDF files
                if (!isHiddenFile && path.extname(entryName).toLowerCase() === '.pdf') {
                    const outputPath = path.join(destFolder, path.basename(entryName));
                    zip.extractEntryTo(entry, destFolder, false, true);
                    extractedFiles.push(outputPath);
                }
            });

            if (extractedFiles.length === 0) {
                return reject(new Error('No valid PDFs found in the ZIP file.'));
            }

            resolve(extractedFiles);
        } catch (error) {
            reject(new Error(`Failed to extract ZIP file: ${error.message}`));
        }
    });
};


/**
 * Extract text from each PDF.
 */
const extractTextFromPdfs = (pdfPaths) => {
    return Promise.all(
        pdfPaths.map(async (pdfPath) => {
            try {
                const data = await fs.readFile(pdfPath);
                const pdfData = await pdfParse(data);
                return pdfData.text.split('\n'); // Return an array of strings
            } catch (error) {
                throw new Error(`Failed to extract text from ${pdfPath}: ${error.message}`);
            }
        })
    );
};

/**
 * Delete files after processing.
 */
const cleanupFiles = (filePaths) => {
    return Promise.all(
        filePaths.map(async (filePath) => {
            try {
                await fs.rm(filePath, { recursive: true, force: true });
            } catch (error) {
                throw new Error(`Failed to delete file ${filePath}: ${error.message}`);
            }
        })
    );
};

