import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
import { addProperties } from "./support/addProperties";

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
    console.log("Listening");
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
app.get("/", async (_req, res) => {
    try {
        const prompt = "Nothing here";
        res.json(prompt);
        console.log(prompt);
    } catch (error) {
        console.log("Error /Get", error);
    }
});

app.get("/cycles", async (_req, res) => {
    try {
        const { rows } = await client.query("select * from cycle_tracker");
        const taskList: TaskCycleData[] = rows;
        const taskListWithCompletionData = taskList.map((obj) =>
            addProperties(obj)
        );
        res.status(200).json(taskListWithCompletionData);
    } catch (error) {
        console.log("Error GET tasks request", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export interface TaskCycleData {
    id: number;
    cycle_name: string;
    cycle_duration_days: number;
    cycle_start_date: Date;
    completion_percentage?: number;
    days_overdue?: number;
}
