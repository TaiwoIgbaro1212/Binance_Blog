const { createUser, signInUser } = require("../service/userService"); // Create the createUser function in userService
const validation = require("../validation");

async function signup(req, res) {
  console.log("Oh! I actually do work and y'all just don't know it");
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const errors = new validation();
    errors.validateName(name);
    errors.validateEmail(email);
    errors.validatePassword(password);

    if (errors.getErrors().length > 0) {
      return res.status(400).json(errors.getErrors());
    } else {
      // Call the createUser function to add the user to the database
      const newUser = await createUser({
        name: name,
        email: email,
        password: password,
      });
      if (newUser === undefined) {
        return res.status(400).json("User was not created");
      }

      return res.status(201).json(newUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Sign In Controller
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const errors = new validation();
    errors.validateEmail(email);
    errors.validatePassword(password);

    if (errors.getErrors().length > 0) {
      return res.status(400).json(errors.getErrors());
    } else {
      const signIn = await signInUser({
        email: email,
        password: password,
      });

      if (signIn === undefined) {
        return res.status(400).json("Invalid credentials");
      }

      if (password !== signIn.password) {
        return res.status(400).json("Invalid credentials");
      }

      return res.status(200).json(signIn);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
// Get all posts controller
async function getPosts(req, res) {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

module.exports = {
  signup, // Export the signup function
  signIn,
};
