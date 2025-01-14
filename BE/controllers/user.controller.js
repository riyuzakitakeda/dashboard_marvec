const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");

// login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password (assuming validatePassword is a custom method)
    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token (avoid hardcoding the secret key, use env variable)
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET, // Use a more secure secret key
      { expiresIn: "1h" } // Adjust the token expiration time as needed
    );

    // Respond with the token and user information (exclude sensitive info)
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        nama: user.nama,
        id_skpd: user.skpd_id,
        email: user.email,
        role: user.role,
        status: user.status
      },
    });

  } catch (error) {
    // Handle any errors during the login process
    return res.status(500).json({ message: error.message });
  }
};



// Create a new user
exports.create = async (req, res) => {
  const { username, password, nama, email, no_hp, skpd_id, role, status } = req.body;

  try {
    // Check if the username is already taken
    let check = await User.findOne({ where: { username: username } });
    if (check) {
      return res.status(409).json({ message: "Username telah terdaftar", code: 409 });
    }

    // Create the new user
    let newUser = await User.create({
      username,
      nama,
      email,
      no_hp,
      skpd_id,
      role,
      status
    });

    // Set the password after creating the user
    newUser.setPassword(password);  // Assuming setPassword is a method to hash the password
    await newUser.save();

    // Respond with success message
    res.status(201).json({
      message: "User telah ditambahkan",
      code: 201,
      user: {
        id: newUser.id,
        username: newUser.username,
        nama: newUser.nama,
        email: newUser.email
      }
    });

  } catch (error) {
    // Handle any errors that occur during user creation
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all users
exports.findAll = (req, res) => {
  User.findAll({
    attributes: ['id', 'nama', 'email', 'no_hp', 'skpd_id', 'role', 'status', 'username'],
    include: [{
      model: db.skdp
    }]
  })
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
  User.findByPk(id)
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
  const { username, password, nama, email, no_hp, skpd_id, role, status } = req.body;

  try {
    // Check if username is already taken by another user
    let check = await User.findOne({ where: { username: username } });
    if (check != null && check.id != id) {
      return res.status(500).json({
        message: "Username telah terdaftar, silahkan gunakan username lainnya",
        code: 500,
      });
    }

    // Find the user by ID
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    // Update the user with the new values
    user.username = username;
    user.nama = nama;
    user.email = email;
    user.no_hp = no_hp;
    user.skpd_id = skpd_id;
    user.role = role;
    user.status = status;

    // Only update the password if it is not empty
    if (password && password.trim() !== "") {
      user.setPassword(password); // Assuming `setPassword` is a custom method to hash the password
    }

    // Save the updated user
    let updatedUser = await user.save();

    return res.status(200).json({
      message: `User ${updatedUser.username} telah diubah`,
      code: 200,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      return user.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
