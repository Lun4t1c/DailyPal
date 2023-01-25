import type { ObjectId } from "mongodb";

export interface FinanceSourceModel {
    _id?: ObjectId | undefined,
    name: string,
    valueInPennies: number
}