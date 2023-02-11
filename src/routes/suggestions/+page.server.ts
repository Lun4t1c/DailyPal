import { suggestionsCollection } from "$db/SuggestionsCollection";
import type { SuggestionModel } from "$lib/models/suggestionModel";
import { redirect, type Actions } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const suggestions = await suggestionsCollection
        .find({})
        .toArray();

    for (let i in suggestions){
        suggestions[i].isLikePossible = true;
        suggestions[i].isOwner = false;

        if (suggestions[i]._idUser.equals(new ObjectId(locals.user._id)))
            suggestions[i].isOwner = true;

        for (let j in suggestions[i].usersWhoLikedIds){
            if (suggestions[i].usersWhoLikedIds[j].equals(new ObjectId(locals.user._id))){
                suggestions[i].isLikePossible = false;
                break;
            }
        }
    }

    return {
        suggestions: JSON.parse(JSON.stringify(suggestions))
    }
}

export const actions: Actions = {
    addSuggestion: async ({request, locals}) => {
        try {
            const data = await request.formData();

            const suggestion: SuggestionModel = {
                _idUser: new ObjectId(locals.user._id),
                description: data.get('description') as string,
                date: new Date(),
                usersWhoLikedIds: []
            };

            suggestionsCollection.insertOne(suggestion);

            return {
                status: 200,
                body: { status: 'Success' }
            }
        }
        catch (error) {
            console.error(error);
            return {
                status: 500, 
                body: { status: 'Error' }
            }
        }
    },

    deleteSuggestion: async ({request, locals}) => {
        try {
            const data = await request.formData();
            const suggestion = await suggestionsCollection.findOne(
                { _id: new ObjectId(data.get('_id') as string) },
                { projection: { _idUser: 1 } }
            );

            if (!suggestion?._idUser.equals(new ObjectId(locals.user._id)))
                return {
                    status: 401, 
                    body: { status: 'Unauthorized' }
                }

            suggestionsCollection.deleteOne(
                { _id: new ObjectId(data.get('_id') as string) }
            );

            return {
                status: 200,
                body: { status: 'Success' }
            }
        }
        catch (error) {
            console.error(error);
            return {
                status: 500, 
                body: { status: 'Error' }
            }
        }
    },

    likeSuggestion: async ({request, locals}) => {
        try {
            const data = await request.formData();
            
            suggestionsCollection.updateOne(
                { _id: new ObjectId(data.get('_id') as string) },
                { $addToSet: {usersWhoLikedIds: new ObjectId(locals.user._id)} }
            );

            return {
                status: 200,
                body: { status: 'Success' }
            }
        }
        catch (error) {
            console.error(error);
            return {
                status: 500, 
                body: { status: 'Error' }
            }
        }
    }
}
