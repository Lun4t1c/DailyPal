import type { Actions, PageServerLoad } from "./$types";
import { financeSourcesCollection } from "$db/financeSources";
import { ObjectId } from "mongodb";
import type { FinanceSourceModel } from "$lib/models/financeSourceModel";

export const load: PageServerLoad = async function name() {
    const data = await financeSourcesCollection.find({}).toArray();
    return {
        financeSources: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    delete: async ({request}) => {
        const financeSources = financeSourcesCollection;
        const data = await request.formData();

        console.log('deleting by id: ', data.get('_id') as string);

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
    }
};