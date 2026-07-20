require("dotenv").config();
const { Client } = require("pg");

async function ensureDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set in .env");
  }

  const url = new URL(databaseUrl);
  const dbName = decodeURIComponent(url.pathname.slice(1).split("/")[0]);

  if (!dbName) {
    throw new Error("DATABASE_URL must include a database name");
  }

  url.pathname = "/postgres";

  const client = new Client({ connectionString: url.toString() });
  await client.connect();

  const { rowCount } = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName.replace(/"/g, '""')}"`);
    console.log(`Database "${dbName}" created`);
  } else {
    console.log(`Database "${dbName}" already exists`);
  }

  await client.end();
}

ensureDatabase().catch((err) => {
  console.error("Failed to ensure database:", err.message);
  process.exit(1);
});
