import type { PageServerLoad } from "./$types";
import { fitnessMeasurementsCollection } from "$db/fitnessMeasurementsCollection";

export const load: PageServerLoad = async function name() {
    const data = await fitnessMeasurementsCollection.find({}).toArray();
    return {
        fitnessMeasurements: JSON.parse(JSON.stringify(data))
    };
}