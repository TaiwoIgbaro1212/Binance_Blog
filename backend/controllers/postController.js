const postService = require("../service/postService");
const validation = require("../validation");

async function createPost(req, res) {
  try {
    console.log({ body: req.body });
    const { title, message, imageurl } = req.body;
    // console.log(req)
    const errors = new validation();
    errors.validateTitle(title);
    errors.validateMessage(message);

    if (errors.getErrors().length > 0) {
      return res.status(400).json(errors.getErrors());
    } else {
      const newPost = await postService.addPost({
        title: title,
        message: message,
        imageurl: imageurl,
      });
      if (newPost === undefined) {
        return res.status(400).json("Post was not created");
      }

      return res.status(201).json(newPost);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

async function editPost(req, res) {
  try {
    const { id } = req.params;
    const { title, message } = req.body;
    const errors = new validation();

    errors.validateTitle(title);
    errors.validateMessage(message);

    if (errors.getErrors().length > 0) {
      return res.status(400).json(errors.getErrors());
    } else {
      const editedPost = await postService.editPost(id, {
        title: title,
        message: message,
      });
      if (editedPost === undefined) {
        return res.status(400).json("Post was not edited");
      }

      return res.status(200).json(editedPost);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;
    const post = await postService.getPost(id);
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}


module.exports = {
  createPost,
  getAllPosts,
  editPost,
  getPost
};
