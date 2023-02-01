import { testConnection } from "$db/mongo";
import { redirect, type Handle } from "@sveltejs/kit";
import db from '$db/mongo';

testConnection();

export const handle: Handle = async ({event, resolve}) => {
    const session = event.cookies.get('session');

    if (!session) {
        return await resolve(event);        
    }

    const user = await db.collection('users').findOne(
        {userAuthToken: session},
        {projection: {
            _id: 1,
            username: 1
        }}
    );

    if (user) {
        event.locals.user = {
            _id: user._id.toString(),
            name: user.username            
        }
    }

    return await resolve(event);
}