import db from '$db/mongo';

export const transactionsCollection = db.collection('transactions');