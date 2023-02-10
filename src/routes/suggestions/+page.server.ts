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
    }
}
