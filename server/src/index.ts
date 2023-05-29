const express = require("express");
import { Request, Response } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const app = express();
const port = 3002;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello server how are you");
});

app.get("/contacts", async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM contacts");
    res.send(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.get("/messages/:contactId", async (req: Request, res: Response) => {
  const messages = await db.query("SELECT * FROM messages");
  const { contactId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM messages WHERE ("receiverId" = $1)',
      [contactId]
    );
    const filteredMessages = result.rows;
    res.json(filteredMessages);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/create-messages", async (req: Request, res: Response) => {
  const { text, date, senderId, receiverId, emoji } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO messages (text, date, "senderId", "receiverId") VALUES ($1, $2, $3, $4) RETURNING *',
      [text, date, senderId, receiverId]
    );
    res.send(result.rows);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.put("/edit-messages/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const result = await db.query(
      "UPDATE messages SET text = $1 WHERE id = $2 RETURNING *",
      [text, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.delete("/delete-messages/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ message: "Сообщение успешно удалено" });
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { login, password } = req.body;
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE login = $1 AND password = $2",
      [login, password]
    );
    if (result.rows.length > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
