const pool = require("../config/dbConfig");

async function createUser({ name, email, password}) {
  const client = await pool.connect();
  console.log({ name: name, email: email, password: password });
  try {
    const { rows } = await client.query(
      `INSERT INTO public."user" (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

const getUsers = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM "UserTable"."user"`);
    console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

// Sign in service
const signInUser = async ({ email, password }) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM public."user" WHERE email = $1`,
      [email]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally { 
    client.release();
  }
};

module.exports = {
  createUser,
  getUsers,
  signInUser
};
