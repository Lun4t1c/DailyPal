import type { ObjectId } from "mongodb";

export interface StreakModel {
    _id: ObjectId | undefined,
    name: string
}