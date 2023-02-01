import type { ObjectId } from "mongodb";

export interface TransactionModel {
    _id?: ObjectId | undefined,
    _idFinanceSource: ObjectId,
    amountInPennies: number,
    isNegative: boolean
    date: Date,
    isMonthly: boolean
}