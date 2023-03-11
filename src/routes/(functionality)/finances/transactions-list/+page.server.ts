import type { Actions, PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { financeSourcesCollection } from "$db/financeSourcesCollection";
import type { TransactionModel } from "$lib/models/transactionModel";
import { transactionsCollection } from "$db/transactionsCollection";
import { stringToBoolean } from "$lib/utils/helpers";
import { redirect } from "@sveltejs/kit";
import type { PlannedExpenseModel } from "$lib/models/plannedExpenseModel";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const financeSources = await financeSourcesCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    const transactions = await transactionsCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        financeSources: JSON.parse(JSON.stringify(financeSources)),
        transactions: JSON.parse(JSON.stringify(transactions))
    }
}

export const actions: Actions = {
    updateTransaction: async ({request, locals}) => {
        try {
            const data = await request.formData();
            const descriptionTemp: string = data.get('description') as string;

            const transaction: TransactionModel = {
                _id: new ObjectId(data.get('_id') as string),
                _idUser: new ObjectId(locals.user._id),
                _idFinanceSource: new ObjectId(data.get('_idFinanceSource') as string),
                amountInPennies: Math.floor(parseFloat(data.get('valueInPennies') as string) * 100),
                description: descriptionTemp !== '' ? descriptionTemp : null,
                date: 0,
                isMonthly: false
            };

            transactionsCollection.updateOne(
                { _id: new ObjectId(transaction._id) },
                { $set: { 
                    _idFinanceSource: transaction._idFinanceSource,
                    amountInPennies: transaction.amountInPennies,
                    description: transaction.description,
                 } }
            );

            return {
                status: 200,
                body: {
                    status: 'Success'
                }
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                body: {
                    status: 'Error'
                }
            }
        }
    },
}