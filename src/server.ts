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

app.get("/cycles", async (_req, res) => {
    try {
        const { rows } = await client.query("select * from cycle_tracker");
        const taskList: TaskCycleData[] = rows;
        const taskListWithCompletionData = taskList.forEach((obj) =>
            addProperties(obj)
        );
        res.status(200).json(taskListWithCompletionData);
    } catch (error) {
        console.log("Error GET tasks request", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

interface TaskCycleData {
    id: number;
    cycle_name: string;
    cycle_duration_days: number;
    cycle_start_date: Date;
    completion_percentage?: number;
    days_overdue?: number;
}

function caculateCompletionPercentageAndDaysOverdue(cycle: TaskCycleData) {
    const currentDate = new Date();
    const timeDifferenceInMilisec =
        currentDate.getTime() - cycle.cycle_start_date.getTime();
    const MilisecInDay = 1000 * 60 * 60 * 24;
    const timeDifferenceInDays = Math.floor(
        timeDifferenceInMilisec / MilisecInDay
    );
    const daysOverdue = timeDifferenceInDays - cycle.cycle_duration_days;
    const completionPercentage =
        (timeDifferenceInDays * 100) / cycle.cycle_duration_days;

    if (completionPercentage > 100) {
        return [completionPercentage, daysOverdue];
    }
    return [completionPercentage, 0];
}

function addProperties(obj: TaskCycleData) {
    const [completionPercentage, daysOverdue] =
        caculateCompletionPercentageAndDaysOverdue(obj);
    obj.completion_percentage = completionPercentage;
    obj.days_overdue = daysOverdue;
}
