import { financeSourcesCollection } from "$db/financeSourcesCollection";
import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
import type { Actions, RequestEvent } from "./$types";

export const actions: Actions = {
    default: async ({request}) => {
        const financeSources = financeSourcesCollection;
        const data = await request.formData();

        console.log('data: ', data);

        try{      
            const financeSource: FinanceSourceModel = {
                name: data.get('name') as string,
                valueInPennies: parseInt(data.get('startingAmount') as string)  * 100
            };

            console.log('obj: ', financeSource)

            financeSourcesCollection.insertOne(financeSource);
    
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

