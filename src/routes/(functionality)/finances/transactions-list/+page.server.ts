import type { Actions, PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { financeSourcesCollection } from "$db/financeSourcesCollection";
import type { TransactionModel } from "$lib/models/transactionModel";
import { transactionsCollection } from "$db/transactionsCollection";
import { stringToBoolean } from "$lib/utils/helpers";
import { redirect } from "@sveltejs/kit";
import type { PlannedExpenseModel } from "$lib/models/plannedExpenseModel";
import { plannedExpensesCollection } from "$db/plannedExpensesCollection";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const transactions = await transactionsCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        transactions: JSON.parse(JSON.stringify(transactions))
    }
}