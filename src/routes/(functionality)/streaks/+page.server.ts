import { streaksCollection } from "$db/streaksCollection";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name({locals}) {
    const data = await streaksCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();
        
    return {
        streaks: JSON.parse(JSON.stringify(data))
    }
}