import { MongoClient } from "mongodb";

async function test() {
    const client = new MongoClient("mongodb+srv://Bidhan:Bidhan667@bidhan012.tm75ta4.mongodb.net/loom?appName=Bidhan012");
    try {
        const connection = await client.connect();
        const collection = connection.db().collection("Bidhan012-ops-PasswordManager_code_chunks");
        
        console.log("Fetching vector search...");
        const searchResults = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "default",
                    path: "embedding",
                    queryVector: new Array(3072).fill(0.1),
                    numCandidates: 100,
                    limit: 5
                }
            }
        ]).toArray();
        console.log("Search Results:", searchResults.length);

    } catch (e) {
        console.error("DB Vector Search Error:", e.message);
    } finally {
        await client.close();
    }
}
test();
