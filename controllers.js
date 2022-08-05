const pool = require("./queries");
const { generateUpdateByIdQuery } = require("./utils");

exports.getUsers = (req, res) => {
  pool.query("SELECT * from USERS ORDER BY id ASC", (error, results) => {
    if (error) return res.status(500).json({ error });

    res.status(200).json(results.rows);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id * 1;

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: `id should be an integer` });
    return;
  }

  pool.query("SELECT * FROM users where id = $1", [id], (error, result) => {
    if (error) return res.status(500).json({ error });

    if (result.rows.length === 0)
      return res.status(404).json({ error: "No user found for id:" + id });

    res.status(200).json(result.rows);
  });
};

exports.postUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "Name or Email missing" });

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, result) => {
      if (error) return res.status(500).json({ error });

      res.status(201).json(result.rows);
    }
  );
};

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: `id should be an integer` });
    return;
  }

  const values = Object.values(req.body);

  pool.query(
    generateUpdateByIdQuery("users", id, req.body),
    values,
    (error, result) => {
      if (error) return res.status(500).json({ error });

      if (!result.rowCount)
        return res.status(404).json({ error: `no user found for id:${id}` });

      res.status(200).json(result.rows);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: `id should be an integer` });
    return;
  }

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) return res.status(500).json({ error });

    res.status(204).json(null);
  });
};
