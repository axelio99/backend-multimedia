import { db } from '../config/index.js';
import { mahasiswa } from '../models/schema.js';
import { eq } from 'drizzle-orm';


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
                message: 'Data mahasiswa tidak ditemukan.'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
}

export const createMahasiswa = async (req, res) => {
    const { id, nama, nim, prodi, umur } = req.body;

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