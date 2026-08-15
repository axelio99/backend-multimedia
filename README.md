# API Manajemen Mahasiswa

RESTful API untuk manajemen data mahasiswa beserta fitur autentikasi pengguna menggunakan JSON Web Token (JWT). Proyek ini dibangun dengan Node.js, Express.js, Drizzle ORM, PostgreSQL, dan telah dikonfigurasi untuk berjalan di dalam Docker.

## Prasyarat

Sebelum menjalankan proyek ini, pastikan kamu sudah menginstal:
* Docker & Docker Compose
* Node.js
* Postman (untuk pengujian)

## Cara Menjalankan Aplikasi

1. Buka terminal dan arahkan ke direktori proyek ini.
2. Pastikan file `.env` sudah dibuat dan dikonfigurasi dengan benar (kamu bisa merujuk pada file `.env.example`).
3. Jalankan perintah berikut untuk membangun dan menyalakan *container* Docker (Server Express dan Database Postgres):
```bash
  docker compose up -d --build
```
4. Tunggu beberapa saat hingga aplikasi berjalan sepenuhnya di | http://localhost:3000 | (atau port yang kamu atur di | .env |).
5. Buka aplikasi Postman.
6. Lakukan _request_ ke _endpoint_ autentikasi untuk melakukan _login_ atau _register_ agar mendapatkan token JWT.
7. Salin token JWT yang didapat, lalu tempelkan pada tab **Authorization** dengan memilih tipe **Bearer Token** di Postman untuk mengakses _endpoint_ manajemen data mahasiswa.
