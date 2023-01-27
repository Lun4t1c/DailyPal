import { fitnessMeasurementsCollection } from "$db/fitnessMeasurementsCollection";
import type { fitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request}) => {
        const data = await request.formData();

        try{      
            const fitnessMeasurement: fitnessMeasurementModel = {
                date: new Date(data.get('date') as string),
                weight: parseFloat(data.get('weight') as string),
                bmi: parseFloat(data.get('bmi') as string),
                bodyFat: parseFloat(data.get('bodyFat') as string),
                bodyWater: parseFloat(data.get('bodyWater') as string),
                muscleMass: parseFloat(data.get('muscleMass') as string),
                boneMass: parseFloat(data.get('boneMass') as string),
                dci: parseFloat(data.get('dci') as string),
                metabolicAge: parseFloat(data.get('metabolicAge') as string),
            };

            console.log('obj: ', fitnessMeasurement)
            fitnessMeasurementsCollection.insertOne(fitnessMeasurement);
    
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

