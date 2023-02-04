import bcrypt from 'bcryptjs';
import type { PageServerLoad } from './$types';
import type { Action, Actions } from './$types';
import db from '$db/mongo';
import { redirect } from '@sveltejs/kit';

enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export const load: PageServerLoad = async ({locals}) => {
    if (locals.user) {
        throw redirect(302, '/');
    }
}

const register: Action = async ({request}) => {
    const data = await request.formData();
    const username: string = data.get('username') as string;
    const password: string = data.get('password') as string;

    console.log(username, ' : ', password);


    db.collection('users').insertOne({
        username: username,
        password: await bcrypt.hash(password, 10),
        userAuthToken: crypto.randomUUID()
    });

    throw redirect(303, '/login');
}

export const actions: Actions = { register }