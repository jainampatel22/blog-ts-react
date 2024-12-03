"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const defaultRoutes_1 = require("./routes/defaultRoutes");
const client_1 = require("@prisma/client");
dotenv_1.default.config();
//app
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
// middleware
app.use((0, cors_1.default)(corsOptions));
// Enable CORS for all routes
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
const prisma = new client_1.PrismaClient();
//Root route
app.use('/', defaultRoutes_1.defaultRoute);
app.listen(3000);
