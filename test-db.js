import { MongoClient } from "mongodb";

async function test() {
    const client = new MongoClient("mongodb+srv://Bidhan:Bidhan667@bidhan012.tm75ta4.mongodb.net/loom?appName=Bidhan012");
    try {
        const connection = await client.connect();
        const collection = connection.db().collection("Bidhan012-ops-PasswordManager_code_chunks");
        
        console.log("Fetching distinct paths...");
        const allPaths = await collection.distinct("path");
        console.log("All paths count:", allPaths.length);

        console.log("Fetching readme...");
        const readmeChunk = await collection.findOne({ path: { $regex: /readme\.md$/i } });
        console.log("Readme length:", readmeChunk ? readmeChunk.text.length : 0);
        
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await client.close();
    }
}
test();
