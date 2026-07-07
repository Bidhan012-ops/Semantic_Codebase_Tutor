import { MongoClient } from "mongodb";

async function test() {
    const client = new MongoClient("mongodb+srv://Bidhan:Bidhan667@bidhan012.tm75ta4.mongodb.net/loom?appName=Bidhan012");
    try {
        const connection = await client.connect();
        const collection = connection.db().collection("Bidhan012-ops-PasswordManager_code_chunks");
        
        console.log("Fetching search indexes...");
        const indexes = await collection.listSearchIndexes().toArray();
        console.log("Search Indexes:", JSON.stringify(indexes, null, 2));

    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await client.close();
    }
}
test();
