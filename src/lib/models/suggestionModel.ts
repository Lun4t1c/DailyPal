import type { ObjectId } from "mongodb";

export interface SuggestionModel{
    _id?: ObjectId,
    _idUser: ObjectId,
    description: string,
    date: Date,
    usersWhoLikedIds: ObjectId[],

    isOwner?: boolean,
    isLikePossible?: boolean
}