import type { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "./financeSourceModel";

export interface PlannedExpense {
    _id?: ObjectId,
    _idUser: ObjectId,
    valueInPennies: number,
    financeSource: FinanceSourceModel | null
}