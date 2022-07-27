const pool = require("./queries");

exports.getUsers = (req, res) => {
  pool.query("SELECT * from USERS ORDER BY id ASC", (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id * 1;

  pool.query("SELECT * FROM users where id = $1", [id], (error, result) => {
    if (error) throw error;

    res.status(200).json(result.rows);
  });
};

exports.postUser = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, result) => {
      if (error) throw error;

      res.status(201).json(result.rows);
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id=$3",
    [name, email, id],
    (error, result) => {
      console.log(error, result);
      if (error) throw error;

      res.status(200).json(result.rows);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    res.status(204).json(null);
  });
};
