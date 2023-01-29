import type { Actions, PageServerLoad } from "./$types";
import { fitnessMeasurementsCollection } from "$db/fitnessMeasurementsCollection";
import type { FitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";

export const load: PageServerLoad = async function name() {
    const data = await fitnessMeasurementsCollection
        .find({})
        .sort({ date: -1 })
        .toArray();

    return {
        fitnessMeasurements: JSON.parse(JSON.stringify(data))
    };
}

export const actions: Actions = {
    default: async ({request}) => {
        const data = await request.formData();

        try{      
            const fitnessMeasurement: FitnessMeasurementModel = {
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
