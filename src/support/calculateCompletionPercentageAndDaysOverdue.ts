import { TaskCycleData } from "../server";

export function caculateCompletionPercentageAndDaysOverdue(
    cycle: TaskCycleData
) {
    const currentDate = new Date();
    const timeDifferenceInMilisec =
        currentDate.getTime() - cycle.start_date.getTime();
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
