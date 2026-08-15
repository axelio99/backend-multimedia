import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mahasiswaRoutes from "./routes/mahasiswaRoutes.js";
import cors from 'cors';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/anggota', mahasiswaRoutes);
app.use(errorHandler);

export default app;