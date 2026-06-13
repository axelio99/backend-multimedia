const express = require('express');
const server = express();
server.use(express.json());
const port = 8080;
const dataMahasiswa = [
    {nama: 'gabriel ganteng', nim: '2515012064', prodi: 'S1 Sistem Informasi'},
    {nama: 'Wahyu', nim: '69696969', prodi:'S1 Kesehatan Masyarakat'},
    {nama: 'Irfan', nim: '99999991', prodi: 'S1 Teknik Energi Terbarukan'}
];

// route sederhana
server.get('/mahasiswa', (req, res) => {
    res.json({
        message: 'Data mahasiswa berhasil diambil!',
        status: 'sukses',
        data: dataMahasiswa
    });
});

server.get('/mahasiswa/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    const dataKetemu = dataMahasiswa.find((mhs) => mhs.nim == mahasiswaNim);
    if(dataKetemu){
        res.json({
            message: 'Data mahasiswa berhasil ditemukan!',
            data: dataKetemu
        });
    } else {
        res.json({
            message: 'Data mahasiswa tidak ditemukan!'
        });
    }
});

server.post('/mahasiswa', (req, res) => {
    const namaMahasiswa = req.body.nama;
    const nimMahasiswa = req.body.nim;
    const prodiMahasiswa = req.body.prodi
    
    const mahasiswaBaru = {
        nama : namaMahasiswa,
        nim : nimMahasiswa,
        prodi : prodiMahasiswa
    };

    dataMahasiswa.push(mahasiswaBaru);

    res.json({
        message: `Berhasil menambahkan mahasiswa baru bernama ${namaMahasiswa} dengan nim ${nimMahasiswa}`,
        dataDiterima: req.body
    });
});

// menyalakan server

server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});