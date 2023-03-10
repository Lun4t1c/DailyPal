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

export const actions: Actions = {
    addTransaction: async ({request, locals}) => {        
        try{
            const data = await request.formData();
            const descriptionTemp: string = data.get('description') as string;
            const isMonthly: boolean = stringToBoolean(data.get('isMonthly') as string);

            let transaction: TransactionModel = {
                _idUser: new ObjectId(locals.user._id),
                _idFinanceSource: new ObjectId(data.get('_idFinanceSource') as string),
                amountInPennies: Math.floor(parseFloat(data.get('amount') as string) * 100),
                description: descriptionTemp !== '' ? descriptionTemp : null,
                date: isMonthly ? parseInt(data.get('date') as string) : new Date(data.get('date') as string),
                isMonthly: isMonthly
            };

            transactionsCollection.insertOne(transaction);

            if (!isMonthly){
                financeSourcesCollection.updateOne(
                    { _id: transaction._idFinanceSource },
                    { $inc: { valueInPennies: transaction.amountInPennies } }
                );
            }

            return {
                status: 200,
                body: {
                    status: 'Success'
                }
            }
        }
        catch (error) {
            console.error(error);
            
            return {
                status: 500,
                body: {
                    status: 'Error'
                }
            }
        }
    },

    deleteFinanceSource: async ({request}) => {
        const data = await request.formData();

        try{
            financeSourcesCollection.deleteOne({
                _id: new ObjectId(data.get('_id') as string)
            })

            return {
                status: 200,
                body: {
                    status: 'Success'
                }
            }
        }
        catch (error) {
            return {
                status: 500,
                body: {
                    status: 'Error'
                }
            }
        }
    },

    hardSetFinanceSourceAmount: async ({request, locals}) => {
        const data = await request.formData();

        let _idFinanceSourceString: string = data.get('_id') as string;
        let amountInPennies: number = Math.floor(parseFloat(data.get('amount') as string) * 100);

        try{
            financeSourcesCollection.updateOne(
                { _id: new ObjectId(_idFinanceSourceString) },
                { $set: { 
                    valueInPennies: amountInPennies
                 } }
            );
        }
        catch (error) {
            return {
                status: 500,
                body: {
                    status: 'Error'
                }
            }
        }
    },

    addPlannedExpense: async ({request, locals}) => {
        try {
            const data = await request.formData();
            const descriptionTemp: string = data.get('description') as string;

            const plannedExpense: PlannedExpenseModel = {
                _idUser: new ObjectId(locals.user._id),
                _idFinanceSource: data.get('_idFinanceSource') === 'general' ? 'general' : new ObjectId(data.get('_idFinanceSource') as string),
                valueInPennies: Math.floor(parseFloat(data.get('valueInPennies') as string) * 100),
                description: descriptionTemp !== '' ? descriptionTemp : null,
                isTakenIntoAccount: true
            }

            plannedExpensesCollection.insertOne(plannedExpense);

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

    deletePlannedExpense: async ({request, locals}) => {
        try {
            const data = await request.formData();
            plannedExpensesCollection.deleteOne({_id: new ObjectId(data.get('_id') as string)});

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

    updatePlannedExpense: async ({request, locals}) => {
        try {
            const data = await request.formData();
            const descriptionTemp: string = data.get('description') as string;

            const plannedExpense: PlannedExpenseModel = {
                _id: new ObjectId(data.get('_id') as string),
                _idUser: new ObjectId(locals.user._id),
                _idFinanceSource: data.get('_idFinanceSource') === 'general' ? 'general' : new ObjectId(data.get('_idFinanceSource') as string),
                valueInPennies: Math.floor(parseFloat(data.get('valueInPennies') as string) * 100),
                description: descriptionTemp !== '' ? descriptionTemp : null,
                isTakenIntoAccount: stringToBoolean(data.get('isTakenIntoAccount') as string)
            };

            plannedExpensesCollection.updateOne(
                { _id: new ObjectId(plannedExpense._id) },
                { $set: { 
                    _idFinanceSource: plannedExpense._idFinanceSource,
                    valueInPennies: plannedExpense.valueInPennies,
                    description: plannedExpense.description,
                    isTakenIntoAccount: plannedExpense.isTakenIntoAccount
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
};