import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGO_URI!);

export async function db() {
    const connection = await client.connect();
    console.log("Successfully connected to MongoDB!");
    return connection.db();
}
db().catch(console.dir);
