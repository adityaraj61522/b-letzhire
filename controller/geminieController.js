const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyBkOSVVzys7_eb92k39R6lJ9sXR2ww03ic';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const queryBestResumes = (extractedText) => {
    return new Promise((resolve, reject) => {
        if (!extractedText) {
            reject(new Error('Extracted text cannot be empty.'));
            return;
        }

        extractedText += extractedText + `\n \n Find the best resume for a software engineer role.`;

        axios
            .post(
                GEMINI_API_URL,
                {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": "Help me find a job"
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            .then((response) =>
                resolve(response.data))
            .catch((error) =>
                reject(error));
    });
};


module.exports = queryBestResumes;
