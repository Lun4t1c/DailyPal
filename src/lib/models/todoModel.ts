import type { ObjectId } from "mongodb";

export interface TodoModel{
    id: ObjectId,
    title: string,
    remind: Date | null,
    deadline: Date | null
}