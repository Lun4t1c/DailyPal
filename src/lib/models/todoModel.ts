import type { ObjectId } from "mongodb";

export interface TodoModel{
    id?: ObjectId | undefined,
    title: string,
    remind: Date | null,
    deadline: Date | null
}