import type { ObjectId } from "mongodb";

export interface TransactionModel {
    id: ObjectId | undefined,
    idFinanceSource: ObjectId,
    amountInPennies: number,
    isNegative: boolean
    date: Date
}