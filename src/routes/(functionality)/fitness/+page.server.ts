import type { Actions, PageServerLoad } from "./$types";
import { fitnessMeasurementsCollection } from "$db/fitnessMeasurementsCollection";
import type { FitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";
import { ObjectId } from "mongodb";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user) throw redirect(302, '/login');

    const data = await fitnessMeasurementsCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .sort({ date: -1 })
        .toArray();

    return {
        fitnessMeasurements: JSON.parse(JSON.stringify(data))
    };
}

export const actions: Actions = {
    default: async ({request, locals}) => {
        const data = await request.formData();

        try {
            const fitnessMeasurement: FitnessMeasurementModel = {
                _idUser: new ObjectId(locals.user._id),
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
