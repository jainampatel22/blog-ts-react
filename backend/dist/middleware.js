"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMiddleware = initMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function initMiddleware(app) {
    // This middleware will be used for routes that match /api/v1/blog/*
    app.use('/api/v1/blog/*', async (req, res, next) => {
        // Extract the token from the Authorization header
        const header = req.header('authorization') || '';
        // Extract token from Bearer token ("Bearer <token>")
        const token = header.split(' ')[1];
        if (!token) {
            // If no token is provided, return a 403 Unauthorized error
            return res.status(403).json({ error: 'Unauthorized' });
        }
        try {
            // Verify the JWT token (assuming the secret is available in process.env.JWT_SECRET)
            const response = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // If the token contains an 'id', allow the request to proceed
            if (response.id) {
                return next(); // Proceed to the next middleware or route handler
            }
            else {
                // If the token doesn't have an 'id', reject the request
                return res.status(403).json({ error: 'Unauthorized' });
            }
        }
        catch (error) {
            // Handle errors in JWT verification (invalid token, expired, etc.)
            console.error('JWT verification failed:', error);
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
}
