import { app } from "./server.js";
import { initializeDatabase } from "./db/index.js";

const port = '9001';

app.listen(port, async () => {
    console.log(`Auth service listening at http://localhost:${port}`);
    initializeDatabase();
});