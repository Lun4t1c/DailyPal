import type { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "./financeSourceModel";

export interface plannedExpense {
    id: ObjectId,
    valueInPennies: number,
    financeSource: FinanceSourceModel | null
}