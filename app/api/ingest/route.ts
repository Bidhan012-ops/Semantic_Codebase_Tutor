import { NextResponse } from "next/server";
import { fetchRepoFiles } from "@/lib/github";
import { chunkCodeFile } from "@/lib/text-chunker";
import { createEmbedding } from "@/lib/vector-db";
import { db } from "@/lib/db";
import { findupdate } from "@/lib/github";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;
    console.log("The ingest url:", body)
    // 1. Basic Validation
    if (!url || !url.startsWith("https://github.com/")) {
      return NextResponse.json(
        { error: "Please provide a valid public GitHub URL." },
        { status: 400 }
      );
    }

    // 2. Extract Owner and Repo from URL
    // e.g., https://github.com/facebook/react -> owner: "facebook", repo: "react"
    const urlParts = url.replace(/\/$/, "").split("/");
    const repo = urlParts.pop();
    const owner = urlParts.pop();

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "Could not parse repository owner and name." },
        { status: 400 }
      );
    }

    // 3. Fetch the raw code (Phase 1 Logic)
    // Note: In Phase 4, you will replace this synchronous call with a background job queue
    // to prevent serverless timeouts on large repositories.
    const files = await fetchRepoFiles(owner, repo);
    const connection = await db();
    const collection = await connection.collection(`code_chunks`);
    // 4. Create a unique ID for the dynamic route
    const repoId = `${owner}-${repo}`;
    const currentgithubupdate = await findupdate()
    const existingrepo = await collection.findOne({ repoId })
    if (existingrepo) {
      if (existingrepo.updatedAt >= currentgithubupdate) {
        return NextResponse.json({
          success: true,
          repoId,
          message: `repo is allready in the database (go to the deshboard to start chatting with the code)`
        });
      }
      else {
        await collection.deleteMany({ repoId });
      }
    }
    const allChunks = files.flatMap((file) => {
      return chunkCodeFile(file.content, file.path);
    });
    console.log(`Successfully split the repository into ${allChunks.length} chunks! and the chunks is ${allChunks}`);
    //creating the embeddings for the chunks and storing them in the database
    const documentsToSave = [];

    // Loop through the array one by one
    for (const chunk of allChunks) {
      try {
        // 1. Extract the string and send it to the AI
        const vectorMath = await createEmbedding(chunk.text);

        // 2. Combine everything into a single database-ready object
        documentsToSave.push({
          repoId: repoId,
          text: chunk.text,                 // The original code snippet
          path: chunk.metadata.path,        // The file it came from
          startPoint: chunk.metadata.startPoint, // Where it started
          endPoint: chunk.metadata.endPoint,     // Where it ended
          embedding: vectorMath,
          updatedAt: currentgithubupdate,          // The [0.02, 0.54, ...] number array
          createdAt: new Date()
        });

        // Optional: Add a tiny delay here if you hit API rate limits
        // await new Promise(resolve => setTimeout(resolve, 200)); 

      } catch (error) {
        console.error(`Failed to vectorize chunk from ${chunk.metadata.path}`, error);
        // You can choose to throw the error or just skip this chunk and keep going
      }
    }

    console.log(`Successfully prepared ${documentsToSave.length} documents for the database!`);
    
    if (documentsToSave.length > 0) {
      await collection.insertMany(documentsToSave);

      // Automatically create the Vector Search Index for this new collection
      try {
        await collection.createSearchIndex({
          name: "vector_index",
          type: "vectorSearch",
          definition: {
            "fields": [
              {
                "type": "vector",
                "path": "embedding",
                "numDimensions": 3072, // Matches gemini-embedding-2 output
                "similarity": "cosine"
              },
              {
                "type": "filter",
                "path": "repoId"
              }
            ]
          }
        });
      } catch (e) {
        console.log("Vector search index creation error (it may already exist):", e);
      }
    } else {
      throw new Error("No documents were vectorized. You may have hit the Gemini API rate limit.");
    }
    
    return NextResponse.json({
      success: true,
      repoId,
      message: `Successfully ingested ${files.length} files.`
    });

  } catch (error) {
    console.error("Ingestion Error:", error);
    return NextResponse.json(
      { error: "Failed to process the repository." },
      { status: 500 }
    );
  }
}