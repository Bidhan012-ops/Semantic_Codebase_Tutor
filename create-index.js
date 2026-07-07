import { MongoClient } from "mongodb";

async function createIndex() {
    const client = new MongoClient("mongodb+srv://Bidhan:Bidhan667@bidhan012.tm75ta4.mongodb.net/loom?appName=Bidhan012");
    try {
        const connection = await client.connect();
        const collection = connection.db().collection("Bidhan012-ops-PasswordManager_code_chunks");
        
        console.log("Creating vector search index...");
        const result = await collection.createSearchIndex({
            name: "default",
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                        "type": "vector",
                        "path": "embedding",
                        "numDimensions": 3072,
                        "similarity": "cosine"
                    }
                ]
            }
        });
        
        console.log("Index created:", result);

    } catch (e) {
        console.error("Index creation error:", e.message);
    } finally {
        await client.close();
    }
}
createIndex();
