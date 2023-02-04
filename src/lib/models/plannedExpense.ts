import type { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "./financeSourceModel";

export interface PlannedExpense {
    _id?: ObjectId,
    _idUser: ObjectId,
    _idFinanceSource: ObjectId | 'general' | null,
    valueInPennies: number    
}