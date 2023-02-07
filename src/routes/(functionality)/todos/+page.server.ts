import { todosCollection } from "$db/todosCollection";
import type { TodoModel } from "$lib/models/todoModel";
import { dateOrNull } from "$lib/utils/helpers";
import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async function name({locals}) {
    if (!locals.user) throw redirect(302, '/login');

    const data = await todosCollection
        .find({_idUser: new ObjectId(locals.user._id)})
        .toArray();

    return {
        todos: JSON.parse(JSON.stringify(data))
    }
}

export const actions: Actions = {
    addTodo: async ({request, locals}) => {        
        try{
            const data = await request.formData();

            const todo: TodoModel = {
                _idUser: new ObjectId(locals.user._id),
                title: data.get('title') as string,
                remind: dateOrNull(data.get('remind') as string),
                deadline: dateOrNull(data.get('deadline') as string)
            };

            todosCollection.insertOne(todo);
    
            return {
                status: 200,
                body: { status: 'Success' }
            }
        }
        catch (error) {
            return {
                status: 500, 
                body: { status: 'Error' }
            }
        }
    },

    updateTodo: async ({request, locals}) => {
        try{
            const data = await request.formData();

            const todo: TodoModel = {
                _id: new ObjectId(data.get('_id') as string),
                _idUser: new ObjectId(locals.user._id),
                title: data.get('title') as string,
                remind: dateOrNull(data.get('remind') as string),
                deadline: dateOrNull(data.get('deadline') as string)
            };

            todosCollection.updateOne(
                { _id: new ObjectId(todo._id) },
                { $set: { 
                    title: todo.title,
                    remind: todo.remind,
                    deadline: todo.deadline
                 } }
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

    deleteTodo: async ({request}) => {
        try{
            const data = await request.formData();
            todosCollection.deleteOne({_id: new ObjectId(data.get('_id') as string)});

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
};