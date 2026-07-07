import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "../auth/[...nextauth]/option";
// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const { question } = await req.json();
        console.log("Question:", question);
        if (!question) {
            return NextResponse.json({ error: "Question is required" }, { status: 400 });
        }

        // --- Intent Routing (Global vs Local Query) ---
        const globalKeywords = ["whole project", "entire project", "explain the codebase", "summarize", "architecture", "what does this repo do", "structure", "tell me about the project", "explain project"];
        const isGlobalQuery = globalKeywords.some(keyword => question.toLowerCase().includes(keyword));
        const session = await auth();
        const repoId = session?.user.repoId;
        if (!repoId) {
            return NextResponse.json({ error: "Repo ID not found" }, { status: 404 });
        }
        // Connect to MongoDB
        const connection = await db();
        const collection = await connection.collection(`code_chunks`);

        let contextStr = "";

        if (isGlobalQuery) {
            // THE GLOBAL BYPASS: Fetch the README + All File Paths
            console.log("Global query detected. Fetching README and File Tree.");

            // 1. Look for the README.md file
            const readmeChunk = await collection.findOne({ path: { $regex: /readme\.md$/i } });
            const readmeText = readmeChunk ? readmeChunk.text : "No README.md found in the repository.";

            // 2. Fetch a list of ALL unique file paths in the database
            // .distinct() is a super-fast native MongoDB command
            const allPaths = await collection.distinct("path");
            const fileTree = allPaths.join("\n- ");

            // 3. Combine them for the AI
            contextStr = `
REPOSITORY OVERVIEW:

--- README.MD ---
${readmeText}

--- REPOSITORY FILE TREE ---
- ${fileTree}
      `;

        } else {
            // THE LOCAL SEARCH: Standard Vector Search
            const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
            const embeddingResult = await embeddingModel.embedContent(question);
            const queryVector = embeddingResult.embedding.values;

            const searchResults = await collection.aggregate([
                {
                    $vectorSearch: {
                        index: "vector_index",
                        path: "embedding",
                        queryVector: queryVector,
                        numCandidates: 100,
                        limit: 5,
                        filter: { repoId: repoId }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        text: 1,
                        path: 1,
                        score: { $meta: "vectorSearchScore" }
                    }
                }
            ]).toArray();

            if (searchResults.length === 0) {
                return NextResponse.json({ answer: "I couldn't find any relevant code in the repository to answer that." });
            }

            contextStr = searchResults
                .map((chunk) => `File: ${chunk.path}\n\nCode:\n${chunk.text}\n`)
                .join("\n---\n");
        }

        // Send the context and the question to the Smart LLM (Gemini 1.5 Flash)
        const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are an expert Senior Software Engineer assisting a junior developer with their codebase.
      Read the following context from the project carefully (it may contain exact code snippets, or a high-level README and File Tree). 
      Use ONLY this context to answer the user's question. If the answer cannot be found in the provided context, explicitly say that you do not know based on the current context and return the answer.
      
      CONTEXT:
      ${contextStr}
      
      USER QUESTION:
      ${question}
      
      ANSWER:
    `;

        const result = await chatModel.generateContent(prompt);
        const finalAnswer = result.response.text();

        return NextResponse.json({ answer: finalAnswer });

    } catch (error) {
        console.error("Error in chat route:", error);
        return NextResponse.json({ error: "Failed to process question." }, { status: 500 });
    }
}