import type { PageServerLoad } from "./$types";
import { financeSources } from "$db/financeSources";

export const load: PageServerLoad = async function name() {
    const data = await financeSources.find({}).toArray();
    return {
        financeSources: JSON.parse(JSON.stringify(data))
    }
}