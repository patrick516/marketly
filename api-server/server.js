import express from "express";
import cors from "cors";
import fs from "fs/promises";

const PORT = 4000;
const DB_PATH = "./db.json";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // higher limit for base64 image uploads

async function readDb() {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

function newId(collection) {
  const maxId = collection.reduce(
    (max, item) => Math.max(max, Number(item.id) || 0),
    0,
  );
  return String(maxId + 1);
}

// ── Products ──────────────────────────────────────────────
app.get("/products", async (req, res) => {
  const db = await readDb();
  res.json(db.products);
});

app.post("/products", async (req, res) => {
  const db = await readDb();
  const product = { id: newId(db.products), ...req.body };
  db.products.push(product);
  await writeDb(db);
  res.status(201).json(product);
});

app.patch("/products/:id", async (req, res) => {
  const db = await readDb();
  const index = db.products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  db.products[index] = { ...db.products[index], ...req.body };
  await writeDb(db);
  res.json(db.products[index]);
});

app.delete("/products/:id", async (req, res) => {
  const db = await readDb();
  db.products = db.products.filter((p) => p.id !== req.params.id);
  await writeDb(db);
  res.status(204).end();
});

// ── Categories
app.get("/categories", async (req, res) => {
  const db = await readDb();
  res.json(db.categories);
});

app.post("/categories", async (req, res) => {
  const db = await readDb();
  const category = { id: newId(db.categories), ...req.body };
  db.categories.push(category);
  await writeDb(db);
  res.status(201).json(category);
});

// ── Orders
app.get("/orders", async (req, res) => {
  const db = await readDb();
  res.json(db.orders);
});

app.post("/orders", async (req, res) => {
  const db = await readDb();
  const order = {
    id: newId(db.orders),
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  db.orders.push(order);
  await writeDb(db);
  res.status(201).json(order);
});

// ── Settings
app.get("/settings", async (req, res) => {
  const db = await readDb();
  res.json(db.settings);
});

app.patch("/settings", async (req, res) => {
  const db = await readDb();
  db.settings = { ...db.settings, ...req.body };
  await writeDb(db);
  res.json(db.settings);
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
