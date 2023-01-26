import db from '$db/mongo';

export const todosCollection = db.collection('todos');