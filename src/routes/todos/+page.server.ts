import { todosCollection } from "$db/todosCollection";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name() {
    const data = await todosCollection.find({}).toArray();
    return {
        todos: JSON.parse(JSON.stringify(data))
    }
}