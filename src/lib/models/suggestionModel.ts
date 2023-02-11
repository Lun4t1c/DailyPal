import type { SuggestionStatus } from "$lib/utils/enums";
import type { ObjectId } from "mongodb";

export interface SuggestionModel{
    _id?: ObjectId,
    _idUser: ObjectId,
    description: string,
    date: Date,
    usersWhoLikedIds: ObjectId[],
    status: SuggestionStatus,
    explanation: string | null

    isOwner?: boolean,
    isLikePossible?: boolean
}