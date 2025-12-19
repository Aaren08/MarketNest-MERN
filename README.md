## MarketNest (MERN)

Short, useful documentation for this repository so you (or collaborators) can run, develop, and extend the app.

## Project overview

MarketNest is a small MERN-style example app that demonstrates a product CRUD (Create, Read, Update, Delete) workflow.

- Backend: Express + Mongoose (MongoDB) API exposing product endpoints.
- Frontend: React + Vite + Chakra UI, uses Zustand for client state and React Router for navigation.

This repository includes a combined root workspace with a `backend/` folder (server + API) and a `frontend/` folder (React app).

## Tech stack

- Node.js (ES modules)
- Express
- MongoDB (Mongoose)
- React (Vite)
- Chakra UI
- Zustand for client state

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- A running MongoDB instance (local, Docker, or Atlas)

## Environment variables

Create a `.env` file in the repository root with at least:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
NODE_ENV=development
```

Replace `<your-mongodb-connection-string>` with your MongoDB connection URI. Example for local MongoDB: `mongodb://localhost:27017/marketnest`.

Note: The backend uses `dotenv` and reads `MONGO_URI` in `backend/config/db.js`.

## Installation & Local development (Windows PowerShell)

Open two terminals (one for backend, one for frontend).

1. Install dependencies (root script also handles frontend install):

```powershell
# from repository root
npm install
npm install --prefix frontend
```

2. Run backend (development)

```powershell
# from repository root
npm run dev
```

This runs `cross-env NODE_ENV=development nodemon backend/server.js` which starts the Express server and restarts on changes.

3. Run frontend (development)

```powershell
# open a second terminal
npm --prefix frontend run dev
```

The frontend is a Vite app; the dev server prints the localhost URL (commonly http://localhost:5173). The frontend expects the API under `/api/products` and relies on a development proxy or same-origin setup when running production builds.

## Production build and start (one-step)

There is a root `build` and `start` script that are opinionated:

- `npm run build` will run `npm install` and then `npm install --prefix frontend` and `npm run build --prefix frontend` to produce a frontend `dist` in `frontend/dist`.
- `npm start` will run `cross-env NODE_ENV=production node backend/server.js` which serves the frontend `frontend/dist` if `NODE_ENV === 'production'`.

Typical production flow:

```powershell
npm run build
# ensure MONGO_URI is set in environment
npm start
```

## API reference

Base URL: http://localhost:<PORT> (default 3000)

Endpoints (all under `/api/products`):

- GET /api/products

  - Description: Return all products
  - Response: Array of product objects

- POST /api/products

  - Description: Create a new product
  - Body (JSON): { name: string, price: number, image: string }
  - Response: 201 with created product object

- PUT /api/products/:id

  - Description: Update an existing product by MongoDB \_id
  - Body (JSON): portion or full product fields to update
  - Response: updated product

- DELETE /api/products/:id
  - Description: Delete a product by id
  - Response: success message

Example (create):

```http
POST /api/products
Content-Type: application/json

{
  "name": "Sample",
  "price": 9.99,
  "image": "https://example.com/image.jpg"
}
```

Errors returned by the backend are JSON containing a `message` property and appropriate HTTP status codes (400, 404, 500).

## Data model

Product (Mongoose schema, located at `backend/models/product.model.js`):

- name: String (required)
- price: Number (required)
- image: String (required)
- createdAt / updatedAt: timestamps (auto)

## Frontend notes

- The frontend lives in `frontend/` and is built with Vite and React.
- Main entry: `frontend/src/main.jsx` (wraps app with Chakra UI provider and React Router).
- Pages: `HomePage.jsx` (list products), `CreatePage.jsx` (create product form).
- Components: `ProductList.jsx`, `ProductCard.jsx`, `Modal.jsx`, `Navbar.jsx`, and ui helpers.
- Client state: `frontend/src/store/product.js` uses Zustand and fetches `/api/products` endpoints.

When developing locally, open the Vite dev server (frontend) and the Express server (backend) in parallel. The frontend fetches to `/api/products` — when running the frontend dev server on a different port you may need to configure a proxy or use relative paths with a development proxy.

## Useful scripts (from package.json)

- `npm run dev` — run backend in development (nodemon). Run this from the repo root.
- `npm start` — start backend in production mode (serves built frontend when present).
- `npm run build` — install and build the frontend; produces `frontend/dist`.
- `npm --prefix frontend run dev` — start Vite dev server for frontend.

## Troubleshooting

- "MongoDB connection error": ensure `MONGO_URI` is correct and MongoDB is reachable. Check network/firewall.
- Frontend cannot reach API: either run frontend and backend on same origin (production build + start), or configure a proxy for the Vite dev server. You can also set absolute API URLs in the frontend store (not recommended for production secrets).

## Security & notes

- Do not commit secrets (passwords or full MongoDB URIs with credentials) to the repo. Use `.env` and a `.gitignore` that excludes `.env`.
- This project uses `type: "module"` in package.json — code is written using ES modules (import/export).

## Suggested follow-ups / improvements

1. Add a `.env.example` file listing `MONGO_URI` and `PORT` keys (without secrets).
2. Add API tests (Jest / Supertest) for the backend endpoints.
3. Add a Dockerfile / docker-compose for local development (Mongo + app).
4. Add CI (GitHub Actions) for linting and tests.
5. Add small screenshots in README and usage examples.

---
