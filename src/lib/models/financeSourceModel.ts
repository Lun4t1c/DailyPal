import type { ObjectId } from "mongodb";

export interface FinanceSourceModel {
    _id?: ObjectId | undefined,
    _idUser: ObjectId,
    name: string,
    valueInPennies: number
}