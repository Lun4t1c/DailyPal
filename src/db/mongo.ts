import { VITE_MONGODB_CONNECTION_STRING } from "$env/static/private";
import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
import { MongoClient } from "mongodb";

const client = new MongoClient(VITE_MONGODB_CONNECTION_STRING);

export function testConnection(): boolean{
    try{
        console.log(' >> Testing database connection...')

        const cn = import.meta.env.VITE_MONGODB_CONNECTION_STRING;
        const client: MongoClient = new MongoClient(cn);
        client.connect();
        client.close();

        console.log(' >> ok')
        return true;
    }
    catch(err) {
        console.error(' >> Could not connect to database');
        return false;
    }
}

export default client.db('dailypal');