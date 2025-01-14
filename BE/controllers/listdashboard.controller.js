const db = require("../models");
const ListDashBoard = db.list_dashboard;
const jwt = require("jsonwebtoken");



// Create a new user
exports.create = async (req, res) => {
  const {
    namaOpd,
    namaAplikasi,
    url,
    logo
  } = req.body;

  try {
    // Check if the username is already taken
    let check = await ListDashBoard.findOne({ where: { username: username } });
    if (check) {
      return res.status(409).json({ message: "Username telah terdaftar", code: 409 });
    }

    // Create the new user
    let newData = await ListDashBoard.create({
      namaOpd,
      namaAplikasi,
      url,
      logo
    });

    // Respond with success message
    res.status(201).json({
      message: "Data telah ditambahkan",
      code: 201,
      user: {
        namaOpd: newData.namaOpd,
        namaAplikasi: newData.namaAplikasi,
        url: newData.url,
        logo: newData.logo
      }
    });

  } catch (error) {
    // Handle any errors that occur during user creation
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all users
exports.findAll = (req, res) => {
  ListDashBoard.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single user by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  ListDashBoard.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a user by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const { 
    namaOpd,
    namaAplikasi,
    url,
    logo
   } = req.body;

  try {
    // Check if username is already taken by another user
    let check = await ListDashBoard.findOne({ where: { namaAplikasi: namaAplikasi } });
    if (check != null && check.id != id) {
      return res.status(500).json({
        message: "Aplikasi telah terdaftar",
        code: 500,
      });
    }

    // Find the user by ID
    let user = await ListDashBoard.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    // Update the user with the new values
    ListDashBoard.namaOpd = namaOpd;
    ListDashBoard.namaAplikasi = namaAplikasi;
    ListDashBoard.url = url;
    ListDashBoard.logo = logo;

    // Save the updated user
    let updatedListDashBoard = await ListDashBoard.save();

    return res.status(200).json({
      message: `List ${updatedListDashBoard.namaAplikasi} telah diubah`,
      code: 200,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  ListDashBoard.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      return ListDashBoard.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
