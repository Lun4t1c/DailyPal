import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { financeSourcesCollection } from "$db/financeSourcesCollection";
import { transactionsCollection } from "$db/transactionsCollection";
import { redirect } from "@sveltejs/kit";
import { plannedExpensesCollection } from "$db/plannedExpensesCollection";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const financeSources = await financeSourcesCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    const transactions = await transactionsCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    const plannedExpenses = await plannedExpensesCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        financeSources: JSON.parse(JSON.stringify(financeSources)),
        transactions: JSON.parse(JSON.stringify(transactions)),
        plannedExpenses: JSON.parse(JSON.stringify(plannedExpenses))
    }
}