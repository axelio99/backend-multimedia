import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/index.js";
import { users } from "../models/schema.js"
import { eq } from "drizzle-orm";

export const register = async (req, res) => {
    try {
        const { nama, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            nama,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, message: "Registrasi Berhasil" });
    } catch (error) {
        console.error("Detail Error Postgres:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message,
            details: error.detail,
            hint: error.hint 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userResult = await db.select().from(users).where(eq(users.email, email));

        if (userResult.length === 0) {
            return res.status(401).json({ success: false, message: "Email atau password salah" });
        }

        const user = userResult[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Email atau password salah"});
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.status(200).json({ success: true, token});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
};