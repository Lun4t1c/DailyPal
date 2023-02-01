import type { Actions, PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { financeSourcesCollection } from "$db/financeSourcesCollection";
import type { TransactionModel } from "$lib/models/transactionModel";
import { transactionsCollection } from "$db/transactionsCollection";
import { stringToBoolean } from "$lib/utils/helpers";

export const load: PageServerLoad = async function name({locals}) {
    const data = await financeSourcesCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        financeSources: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    addTransaction: async ({request}) => {
        const data = await request.formData();

        try{
            let transaction: TransactionModel = {
                _idFinanceSource: new ObjectId(data.get('idFinanceSource') as string),
                amountInPennies: parseFloat(data.get('amountInPennies') as string) * 100,
                description: null,
                isNegative: stringToBoolean(data.get('isNegative') as string),
                date: new Date(data.get('date') as string),
                isMonthly: stringToBoolean(data.get('isMonthly') as string)
            };

            transactionsCollection.insertOne(transaction);

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

    delete: async ({request}) => {
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
};