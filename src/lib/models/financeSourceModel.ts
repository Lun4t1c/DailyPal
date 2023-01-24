import type { ObjectId } from "mongodb";

export interface FinanceSourceModel {
    id: ObjectId | null,
    name: string,
    valueInPennies: number
}