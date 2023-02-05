import type { ObjectId } from "mongodb";

export interface TransactionModel {
    _id?: ObjectId | undefined,
    _idUser: ObjectId,
    _idFinanceSource: ObjectId,
    amountInPennies: number,
    description: string | null,
    date: Date | number,
    isMonthly: boolean
}