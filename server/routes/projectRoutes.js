const express = require("express");

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("members")
      .populate("createdBy");

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error
    });

  }

});

module.exports = router;