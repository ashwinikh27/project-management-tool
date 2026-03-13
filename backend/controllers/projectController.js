const Project = require("../models/Project");


// CREATE PROJECT
exports.createProject = async (req, res) => {
    try {

        const { title, description, deadline } = req.body;

        const project = await Project.create({
            title,
            description,
            deadline,
            owner: req.user.id
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET USER PROJECTS
exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            owner: req.user.id
        });

        res.json(projects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// UPDATE PROJECT
exports.updateProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProject);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE PROJECT
exports.deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await project.deleteOne();

        res.json({ message: "Project deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};