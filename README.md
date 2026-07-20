# Merkato Store API

Express + Prisma + PostgreSQL REST API for the Merkato Store project.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy .env.example to .env and fill in your values
cp .env.example .env

# 3. First-time setup (creates the database if missing, runs migrations, seeds products)
npm run db:setup

# 4. Start the dev server (also ensures the database exists)
npm run dev
```

## Folder Structure

```
merkato_store_api_node/
├── server.js          ← entry point (add routers here)
├── prisma/
│   ├── schema.prisma  ← database models (Product, User, CartItem)
│   └── seed.js        ← populates products table
└── src/
    ├── prisma.js      ← PrismaClient singleton
    ├── routes/        ← (you will create these)
    ├── controllers/   ← (you will create these)
    └── middleware/    ← (you will create these)
```
