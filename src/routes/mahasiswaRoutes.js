import { Router } from "express";
import { 
    getMahasiswa, 
    getMahasiswaByNim,
    getMahasiswaByProdi, 
    createMahasiswa,
    updateMahasiswaByNim,
    deleteMahasiswaByNim,
    deleteMahasiswaByProdi
} from "../controllers/mahasiswaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(verifyToken);

router.get('/', getMahasiswa);
router.get('/nim/:nim', getMahasiswaByNim);
router.get('/prodi/:prodi', getMahasiswaByProdi);
router.post('/', createMahasiswa);
router.put('/nim/:nim', updateMahasiswaByNim);
router.delete('/nim/:nim', deleteMahasiswaByNim);
router.delete('/prodi/:prodi', deleteMahasiswaByProdi);

export default router;