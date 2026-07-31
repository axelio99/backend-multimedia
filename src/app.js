import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mahasiswaRoutes from "./routes/mahasiswaRoutes.js";

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/anggota', mahasiswaRoutes);

export default app;