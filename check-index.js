import { MongoClient } from "mongodb";

async function checkIndex() {
    const client = new MongoClient("mongodb+srv://Bidhan:Bidhan667@bidhan012.tm75ta4.mongodb.net/loom?appName=Bidhan012");
    try {
        const connection = await client.connect();
        const collection = connection.db().collection("Bidhan012-ops-PasswordManager_code_chunks");
        
        console.log("Checking vector search index status...");
        const indexes = await collection.listSearchIndexes().toArray();
        console.log("Indexes:", JSON.stringify(indexes, null, 2));

    } catch (e) {
        console.error("Check Error:", e.message);
    } finally {
        await client.close();
    }
}
checkIndex();
