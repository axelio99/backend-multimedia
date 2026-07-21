import express from 'express';
import { db } from './src/db/index.js';
import { mahasiswa } from './src/db/schema.js';
import { eq } from 'drizzle-orm';

const server = express();
server.use(express.json());
const port = 8080;

server.get('/mahasiswa', async (req, res) => {
    try {
        const data = await db.select().from(mahasiswa);
        res.json({
            message: 'Data mahasiswa berhasil diambil!',
            status: 'sukses',
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server'});
    }
});

server.get('/mahasiswa/:nim', async (req, res) => {
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
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server'
        });
    }
});

server.post('/mahasiswa', async (req, res) => {
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
        res.status(500).json({
            message: 'Gagal menambahkan data, pastikan format benar dan NIM belum terdaftar.'
        });
    }
});

server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});