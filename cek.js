import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

async function cekKoneksi() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    await client.connect();
    console.log("BERHASIL TEMBUS KE DOCKER!");
  } catch (err) {
    console.error("GAGAL TEMBUS. Error-nya adalah:", err.message);
  } finally {
    await client.end();
    process.exit(0);
  }
}

cekKoneksi();