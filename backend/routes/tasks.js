const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).send("Task not found");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    console.log("Creating task with:", { title, description, priority });

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "INSERT INTO tasks (title, description, priority, completed, created_at) VALUES (?, ?, ?, ?, NOW())",
        [title, description || "", priority || "low", 0]
      );
      const [rows] = await connection.query("SELECT * FROM tasks WHERE id = ?", [
        result.insertId,
      ]);
      res.status(201).json(rows[0]);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("POST /tasks error:", err.message);
    console.error("Error code:", err.code);
    console.error("SQL:", err.sql);
    res.status(500).json({
      error: "Failed to create task",
      message: err.message,
      sqlMessage: err.sqlMessage,
      code: err.code,
    });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, priority, completed } = req.body;
    await pool.query(
      "UPDATE tasks SET title=?, description=?, priority=?, completed=? WHERE id=?",
      [title, description, priority, completed, req.params.id],
    );
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id=?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id=?", [
      req.params.id,
    ]);
    if (!rows.length) return res.status(404).send("Task not found");
    await pool.query("DELETE FROM tasks WHERE id=?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
