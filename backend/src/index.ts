import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { defaultRoute } from './routes/defaultRoutes';
import { PrismaClient } from '@prisma/client';

dotenv.config();

//app
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://blog-ts-react-tjxp.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  // middleware
  app.use(cors(corsOptions));
// Enable CORS for all routes
app.use(express.json());
app.get("/",(req,res)=>{
  res.send("Hello World")
  
})
const prisma = new PrismaClient()

//Root route
app.use('/', defaultRoute);

app.listen(port)
