import type { ObjectId } from "mongodb";

export interface FinanceSourceModel {
    id: ObjectId,
    name: string,
    valueInPennies: number
}