import type { Actions, PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";
import { financeSourcesCollection } from "$db/financeSourcesCollection";

export const load: PageServerLoad = async function name() {
    const data = await financeSourcesCollection.find({}).toArray();
    return {
        financeSources: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        console.log('deleting...: ', data.get('_id'));

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