const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async (req, res) => {
    try {

        const { title, description, projectId, priority, deadline } = req.body;

        const task = await Task.create({
            title,
            description,
            projectId,
            assignedTo: req.user.id,
            priority,
            deadline
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET TASKS FOR A PROJECT
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            projectId: req.params.projectId
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// UPDATE TASK
exports.updateTask = async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE TASK
exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};