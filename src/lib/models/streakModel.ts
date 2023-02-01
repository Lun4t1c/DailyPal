import type { ObjectId } from "mongodb";

export interface StreakModel {
    _id?: ObjectId | undefined,
    _idUser: ObjectId,
    name: string,
    breaks: Date[]
}