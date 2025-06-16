import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/products", productRoutes); // Mount product routes

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Serve static files from the frontend build directory

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // Serve index.html for all other routes
  });
}

app.listen(port, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + port);
});
