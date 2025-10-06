const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authMiddleware'); // import auth
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

// /api/tasks
router.route("/")
    .get(auth, getTasks)      // protect route
    .post(auth, createTask);  // protect route

// /api/tasks/:id
router.route("/:id")
    .put(auth, updateTask)    // protect route
    .delete(auth, deleteTask); // protect route

module.exports = router;
