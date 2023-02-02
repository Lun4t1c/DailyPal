import { redirect, type Actions } from "@sveltejs/kit";
import type { Action, PageServerLoad } from "./$types";
import db from '$db/mongo';

export const load: PageServerLoad = async ({locals}) => {
    if (locals.user) {
        throw redirect(302, '/');
    }
}

export const actions: Actions = { 
    login: async ({ cookies, request }) => {
        console.log('logging in...');
        // const data = await request.formData();
        // const username: string = data.get('username') as string;
        // const password: string = data.get('password') as string;
        
        // console.log('getting user from db...');
        // const user = await db.collection('users').findOne({ username: username });
    
        // if (!user){
        //     return {
        //         status: 400,
        //         body: {
        //             credentials: true,
        //         },
        //     };
        // }
    
        // console.log('authenticating user...');
        // const authToken: string = crypto.randomUUID();
        // const authenticatedUser = await db.collection('users').updateOne(
        //     { username: user.username },
        //     { $set: {userAuthToken: authToken} }
        // );
    
        // console.log('setting cookies...');
        // cookies.set('session', authToken, {
        //     path: '/',
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 60 * 60 * 24 * 30
        // });
    
        console.log('all done');
        throw redirect(302, '/');
    }
}