const express = require("express");
const router = express.Router();
const UserController = require("../controllers/listdashboard.controller.js");
const authenticateJWT = require('../midleware/auth.js'); // Import the JWT authentication middleware

// Define routes


// Create a new user (protected route)
router.post("/", authenticateJWT, UserController.create);

// Retrieve all users (protected route)
router.get("/", UserController.findAll);

// Retrieve a single user by ID (protected route)
router.get("/:id", authenticateJWT, UserController.findOne);

// Update a user by ID (protected route)
router.put("/:id", authenticateJWT, UserController.update);

// Delete a user by ID (protected route)
router.delete("/:id", authenticateJWT, UserController.delete);

module.exports = router;
