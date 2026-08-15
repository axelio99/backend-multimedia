import 'dotenv/config';
import app from "./src/app.js";

const port = 8080;

app.listen(port, () => {
    console.log(`Server saat ini berjalan di http://localhost:${port}`);
});