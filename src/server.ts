import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();
const client = new Client(process.env.DATABASE_URL);
const app = express();
app.use(express.json());
app.use(cors);

async function connectToDBAndStartListening() {
    console.log("Attempting connecting to DB");
    await client.connect();
    console.log("Connected to DB!");
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Listening on port ${port}`));
}
connectToDBAndStartListening();

app.get("/health-check", async (_req, res) => {
    try {
        //For this to be successful, must connect to db
        await client.query("select now()");
        res.status(200).send("system ok");
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});
