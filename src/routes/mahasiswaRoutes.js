import { Router } from "express";
import { getMahasiswa, getMahasiswaByNim, createMahasiswa } from "../controllers/mahasiswaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', verifyToken, getMahasiswa);
router.get('/:nim', verifyToken, getMahasiswaByNim);
router.post('/', verifyToken, createMahasiswa);

export default router;