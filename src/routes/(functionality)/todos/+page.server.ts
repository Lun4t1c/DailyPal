import { todosCollection } from "$db/todosCollection";
import type { TodoModel } from "$lib/models/todoModel";
import { dateOrNull } from "$lib/utils/helpers";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name() {
    const data = await todosCollection.find({}).toArray();
    return {
        todos: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    default: async ({request}) => {
        const data = await request.formData();

        try{
            const todo: TodoModel = {
                title: data.get('title') as string,
                remind: dateOrNull(data.get('remind') as string),
                deadline: dateOrNull(data.get('deadline') as string)
            };

            console.log('obj: ', todo)

            todosCollection.insertOne(todo);
    
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