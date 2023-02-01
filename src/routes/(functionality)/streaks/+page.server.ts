import { streaksCollection } from "$db/streaksCollection";
import type { StreakModel } from "$lib/models/streakModel";
import { redirect, type Actions } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const data = await streaksCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();
        
    return {
        streaks: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    addStreak: async ({request, locals}) => {
        const data = await request.formData();

        try {
            const streak: StreakModel = {
                _idUser: new ObjectId(locals.user._id),
                name: data.get('name') as string,
                breaks: [
                    new Date(data.get('initialBreak') as string)
                ]
            };

            streaksCollection.insertOne(streak);
    
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

    deleteStreak: async ({request}) => {
        const data = await request.formData();

        try{
            streaksCollection.deleteOne({
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

    breakStreak: async ({request}) => {
        const data = await request.formData();
        
        try {
            await streaksCollection.updateOne(
                { _id: new ObjectId(data.get('_id') as string) },
                { $push: { breaks: new Date(data.get('breakDate') as string) } }
            );

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
}