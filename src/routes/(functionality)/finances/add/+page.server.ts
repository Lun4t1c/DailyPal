import { financeSourcesCollection } from "$db/financeSourcesCollection";
import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
import { ObjectId } from "mongodb";
import type { Actions, RequestEvent } from "./$types";

export const actions: Actions = {
    default: async ({request, locals}) => {
        const data = await request.formData();
        
        try{      
            const financeSource: FinanceSourceModel = {
                _idUser: new ObjectId(locals.user._id),
                name: data.get('name') as string,
                valueInPennies: parseFloat(data.get('startingAmount') as string)  * 100
            };

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
