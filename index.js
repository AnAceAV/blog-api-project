import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
const port = 4000;

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  password: "AjAy@2004", // Change this to your PostgreSQL password
  host: "localhost",
  port: 5432,
  database: "Blogsite",
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize sample data (run once)
const initializeDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized");

    // Check if posts exist, if not add sample data
    const result = await pool.query("SELECT COUNT(*) FROM posts");
    if (result.rows[0].count === 0) {
      await pool.query(`
        INSERT INTO posts (title, content, author) VALUES
        ('The Rise of Decentralized Finance', 'Decentralized Finance (DeFi) is an emerging and rapidly evolving field...', 'Alex Thompson'),
        ('The Impact of Artificial Intelligence on Modern Businesses', 'Artificial Intelligence (AI) is no longer a concept of the future...', 'Mia Williams'),
        ('Sustainable Living: Tips for an Eco-Friendly Lifestyle', 'Sustainability is more than just a buzzword...', 'Samuel Green');
      `);
      console.log("Sample data inserted");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

initializeDB();

// GET All posts
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// GET a specific post by id
app.get("/posts/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

// POST a new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *",
      [title, content, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// PATCH a post
app.patch("/posts/:id", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (content) {
      updates.push(`content = $${paramCount++}`);
      values.push(content);
    }
    if (author) {
      updates.push(`author = $${paramCount++}`);
      values.push(author);
    }
    
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.params.id);

    const query = `UPDATE posts SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
});

// DELETE a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
