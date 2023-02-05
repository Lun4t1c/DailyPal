import type { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "./financeSourceModel";

export interface PlannedExpenseModel {
    _id?: ObjectId,
    _idUser: ObjectId,
    _idFinanceSource: ObjectId | 'general',    
    valueInPennies: number,
    description: string | null,
    isTakenIntoAccount: boolean
}