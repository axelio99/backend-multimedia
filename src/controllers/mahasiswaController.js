import { db } from '../config/index.js';
import { mahasiswa } from '../models/schema.js';
import { eq, ilike } from 'drizzle-orm';


export const getMahasiswa = async(req, res) => {
    try {
        const data = await db.select().from(mahasiswa);
        res.json({
            message: 'Data mahasiswa berhasil diambil!',
            status: 'sukses',
            data: data
        })
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server'});
    }
};

export const getMahasiswaByNim = async(req, res) => {
    try {
        const mahasiswaNim = req.params.nim;
        const dataKetemu = await db.select().from(mahasiswa).where(eq(mahasiswa.nim, mahasiswaNim));

        if (dataKetemu.length > 0) {
            res.json({
                message: 'Data mahasiswa berhasil ditemukan!',
                data: dataKetemu[0]
            });
        } else {
            res.status(404).json({
                message: `Data mahasiswa dengan NIM ${mahasiswaNim} tidak ditemukan!`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
};

export const getMahasiswaByProdi = async(req, res) => {
    try {
        const mahasiswaProdi = req.params.prodi;
        const dataKetemu = await db.select().from(mahasiswa)
        .where(ilike(mahasiswa.prodi, mahasiswaProdi))

        if (dataKetemu.length > 0) {
            res.json({
                message: 'Data mahasiswa berhasil ditemukan!',
                data: dataKetemu
            })
        } else {
            res.status(404).json({
                message: `Data mahasiswa dengan prodi ${mahasiswaProdi} tidak ditemukan!`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
};

export const createMahasiswa = async (req, res) => {
    const { nama, nim, prodi, umur } = req.body;

    if (!nama || nama.length < 3) {
        return res.status(400).json({
            message: 'Nama tidak boleh kurang dari 3 karakter!'
        });
    }

    if (!nim || typeof nim !== 'string' || !/^\d+$/.test(nim)) {
        return res.status(400).json({
            message: 'NIM harus diisi dan wajib berupa string angka.'
        });
    }

    if (umur === undefined || typeof umur !== 'number' || umur < 15) {
        return res.status(400).json({
            message: 'Umur harus diisi, berupa angka, dan tidak kurang dari 15 tahun.'
        });
    }

    try {
        const dataBaru = await db.insert(mahasiswa).values({
            nama,
            nim,
            prodi,
            umur
        }).returning();

        res.json({ 
            message: `Berhasil menambahkan mahasiswa baru bernama ${nama} dengan nim ${nim}`,
            dataDiterima: dataBaru[0]
        })
    } catch (error) {
        console.error("Detail Error:", error);
        res.status(500).json({
            message: 'Gagal menambahkan data',
            detail: error.message
        });
    }
};

export const updateMahasiswaByNim = async(req, res) => {
    const mahasiswaNim = req.params.nim;
    const { nama, prodi, umur } = req.body;

    if (!nama && !prodi && !umur) { 
        return res.status(400).json({
            message: 'Data harus diisi untuk diupdate'
        });
    }

    try {
        const dataUpdated = await db.update(mahasiswa)
            .set({
                nama,
                prodi,
                umur
            })
            .where(eq(mahasiswa.nim, mahasiswaNim))
            .returning();

        if (dataUpdated.length > 0) {
            res.json({
                message: 'Data mahasiswa berhasil diperbarui!',
                data: dataUpdated[0]
            });
        } else {
            res.status(404).json({
                message: 'Data mahasiswa tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            detail: error.message
        });
    }
};

export const deleteMahasiswaByNim = async (req, res) => {
    const mahasiswaNim = req.params.nim;

    try {
        const dataDeleted = await db.delete(mahasiswa)
            .where(eq(mahasiswa.nim, mahasiswaNim))
            .returning();
        
        if (dataDeleted.length > 0) {
            res.json({
                message: 'Data mahasiswa berhasil dihapus',
                data: dataDeleted[0]
            });
        } else {
            res.status(404).json({
                message: 'Data mahasiswa tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            detail: error.message
        });
    }
};

export const deleteMahasiswaByProdi = async (req, res) => {
    const mahasiswaProdi = req.params.prodi;

    try {
        const dataDeleted = await db.delete(mahasiswa)
        .where(ilike(mahasiswa.prodi, mahasiswaProdi))
        .returning();
        
        if (dataDeleted.length > 0) {
            res.json({
                message: `Data mahasiswa dengan prodi ${mahasiswaProdi} berhasil dihapus`,
                data: dataDeleted
            });
        } else {
            res.status(404).json({
                message: 'Data prodi mahasiswa tidak ditemukan'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            detail: error.message
        });
    }
};