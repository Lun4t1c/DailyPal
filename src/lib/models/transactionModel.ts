import type { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "./financeSourceModel";

export interface TransactionModel {
    id: ObjectId,
    financeSource: FinanceSourceModel,
    amountInPennies: number,
    isNegative: boolean
    date: Date
}