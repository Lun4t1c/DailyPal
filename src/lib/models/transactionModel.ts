import type { ObjectId } from "mongodb";

export interface TransactionModel {
    _id?: ObjectId | undefined,
    _idFinanceSource: ObjectId,
    amountInPennies: number,
    description: string | null,
    date: Date,
    isMonthly: boolean
}