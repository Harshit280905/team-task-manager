const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("projectId")
      .populate("createdBy");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

});

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

});

module.exports = router;