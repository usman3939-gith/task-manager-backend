const Task = require("../models/Task");

// ✅ GET all tasks for logged-in user
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// ✅ CREATE a task for logged-in user
const createTask = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Task text required" });

        const task = await Task.create({ text, user: req.user });
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// ✅ UPDATE a task (only if it belongs to the logged-in user)
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user });
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.text = req.body.text ?? task.text;
        task.completed = req.body.completed ?? task.completed;

        await task.save();
        res.json(task);
    } catch (err) {
        next(err);
    }
};

// ✅ DELETE a task (only if it belongs to the logged-in user)
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
