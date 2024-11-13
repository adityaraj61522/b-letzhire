// controllers/resumeController.js
const { Resume, Education, WorkExperience, Project, Skill } = require('../models');
const { Op } = require('sequelize');

exports.createResume = async (req, res) => {
    try {
        const { name, email, phone, address, summary, education, workExperience, skills, certifications, projects, languages, awards, publications, interests, customSections, templateId } = req.body;
        
        // Create the resume
        const resume = await Resume.create({
            userId: req.user.id,
            name,
            email,
            phone,
            address,
            summary,
            templateId
        });
        
        // Create associated records
        if (education) {
            await Promise.all(education.map(edu => Education.create({ ...edu, resumeId: resume.id })));
        }
        
        if (workExperience) {
            await Promise.all(workExperience.map(exp => WorkExperience.create({ ...exp, resumeId: resume.id })));
        }

        if (projects) {
            await Promise.all(projects.map(project => Project.create({ ...project, resumeId: resume.id })));
        }

        if (skills) {
            await Promise.all(skills.map(skill => Skill.create({ ...skill, resumeId: resume.id })));
        }
        res.status(201).send(resume);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


exports.updateResume = async (req, res) => {
    try {
        const resumeId = req.body.id;
        const { name, email, phone, address, summary, templateId, education, workExperience, skills, projects } = req.body;

        // Check if the resume belongs to the current user
        const resume = await Resume.findOne({ where: { id: resumeId, userId: req.user.id } });
        if (!resume) {
            return res.status(404).send({ error: 'Resume not found or you are not authorized to update this resume' });
        }

        // Update resume details
        resume.name = name || resume.name;
        resume.email = email || resume.email;
        resume.phone = phone || resume.phone;
        resume.address = address || resume.address;
        resume.summary = summary || resume.summary;
        resume.templateId = templateId || resume.templateId;
        await resume.save();

        // Add or update education records
        if (education) {
            await Promise.all(education.map(edu => Education.upsert({ ...edu, resumeId })));
        }

        // Add or update work experience records
        if (workExperience) {
            await Promise.all(workExperience.map(exp => WorkExperience.upsert({ ...exp, resumeId })));
        }

        // Add or update project records
        if (projects) {
            await Promise.all(projects.map(project => Project.upsert({ ...project, resumeId })));
        }

        // Add or update skill records
        if (skills) {
            await Promise.all(skills.map(skill => Skill.upsert({ ...skill, resumeId })));
        }

        res.status(200).send(resume);
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).send({ error: error.message });
    }
};