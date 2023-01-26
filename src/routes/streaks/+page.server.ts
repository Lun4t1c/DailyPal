import { streaksCollection } from "$db/streaksCollection";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name() {
    const data = await streaksCollection.find({}).toArray();
    return {
        streaks: JSON.parse(JSON.stringify(data))
    }
}