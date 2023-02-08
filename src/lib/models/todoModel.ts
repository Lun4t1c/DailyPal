import type { ObjectId } from "mongodb";

export interface TodoModel{
    _id?: ObjectId | undefined,
    _idUser: ObjectId,
    title: string,
    isDone: boolean,
    remind: Date | null,
    deadline: Date | null
}