import { financeSourcesCollection } from "$db/financeSources";
import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
import type { Actions, RequestEvent } from "./$types";


// export async function get(request) {
//     let financeSources = financeSourcesCollection.find({});

//     return {
//         status: 200,
//         body: {

//         }
//     }
// }

export const actions: Actions = {
    default: async ({request}) => {
        const financeSources = financeSourcesCollection;
        const data = await request.formData();

        console.log('data: ', data);

        try{

            let name: string | undefined;
            let valueInPennies: string | undefined;

            if (!data.has('name')) throw Error('finances/add: Name is null')
            name = data.get('name')?.toString();

            if (!data.has('startingAmount')) throw Error('finances/add: startingAmount is null')
            valueInPennies = data.get('startingAmount')?.toString();
            
            const financeSource: FinanceSourceModel = {
                id: null,
                name: name as string,
                valueInPennies: parseInt(valueInPennies as string)
            };

            console.log('obj: ', financeSource)
    
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

