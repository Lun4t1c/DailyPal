import { testConnection } from "$db/mongo";
import type { Handle } from "@sveltejs/kit";
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
            username: 1
        }}
    );

    if (user) {
        event.locals.user = {
            name: user.username
        }
    }

    return await resolve(event);
}