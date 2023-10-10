const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = require("./upload");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", userController.signup);
app.post("/signin", userController.signIn);

app.post("/addPost", postController.createPost);
app.get("/", postController.getAllPosts);
app.put("/editPost/:id", postController.editPost);
app.get("/:id", postController.getPost);

// Start server
const PORT = 4010;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
