import { MongoClient } from "mongodb";

export function testConnection(): void{
    try{
        console.log(' >> Testing database connection...')

        const cn = import.meta.env.VITE_MONGODB_CONNECTION_STRING;
        const client: MongoClient = new MongoClient(cn);
        client.connect();
        client.close();

        console.log(' >> ok');
    }
    catch(err) {
        console.error(' >> Could not connect to database');
    }
}