"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const route_1 = __importDefault(require("./module/user/route"));
const route_2 = __importDefault(require("./module/address/route"));
const route_3 = __importDefault(require("./module/post/route"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("User Management API is running 🚀");
});
app.use("/users", route_1.default);
app.use("/addresses", route_2.default);
app.use("/posts", route_3.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`);
});
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Shutting down gracefully...");
    try {
        yield prisma.$disconnect();
        console.log("Database connection closed.");
    }
    catch (err) {
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
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
exports.default = app;
