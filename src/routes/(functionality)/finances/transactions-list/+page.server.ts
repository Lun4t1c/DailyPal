import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { transactionsCollection } from "$db/transactionsCollection";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const transactions = await transactionsCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        transactions: JSON.parse(JSON.stringify(transactions))
    }
}