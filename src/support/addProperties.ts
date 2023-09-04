import { TaskCycleData } from "../server";
import { caculateCompletionPercentageAndDaysOverdue } from "./calculateCompletionPercentageAndDaysOverdue";

export function addProperties(obj: TaskCycleData) {
    const [completionPercentage, daysOverdue] =
        caculateCompletionPercentageAndDaysOverdue(obj);
    obj.completion_percentage = completionPercentage;
    obj.days_overdue = daysOverdue;
    return obj;
}
