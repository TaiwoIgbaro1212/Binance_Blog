const pool = require("../config/dbConfig");

async function addPost({ title, message, imageurl }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO public."post" (title, message, imageurl) VALUES ($1, $2, $3) RETURNING *`,
      [title, message, imageurl]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

// Get all post
const getPosts = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM public."post"`);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};


// update posts
async function editPost(id, { title, message }) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE public."post" SET title = $1, message = $2 WHERE id = $3 RETURNING *`,
      [title, message, id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

// get post
async function getPost(id) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM public."post" WHERE id = $1`,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}



module.exports = {
  addPost,
  getPosts,
  editPost,
  getPost
};
