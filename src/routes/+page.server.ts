import type { PageServerLoad } from "./$types";
import { financeSourcesCollection } from "$db/financeSourcesCollection";

export const load: PageServerLoad = async function name() {
    const data = await financeSourcesCollection.find({}).toArray();
    return {
        financeSources: JSON.parse(JSON.stringify(data))
    }
}