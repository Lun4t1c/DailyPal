import { streaksCollection } from "$db/streaksCollection";
import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const data = await streaksCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();
        
    return {
        streaks: JSON.parse(JSON.stringify(data))
    }
}