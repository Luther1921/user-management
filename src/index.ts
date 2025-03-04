import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./module/user/route";
import addressRoutes from "./module/address/route";
import postRoutes from "./module/post/route";
import errorHandler from "./middleware/errorHandler";

const app = express();
dotenv.config();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("User Management API is running 🚀");
});

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});

const shutdown = async () => {
  console.log("Shutting down gracefully...");

  try {
    await prisma.$disconnect();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing database connection", err);
  }

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 5000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default app;
