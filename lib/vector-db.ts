import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function createEmbedding(text: string): Promise<number[]> {
    try {
        // Gemini's dedicated text embedding model
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
        const result = await model.embedContent(text);

        return result.embedding.values;
    } catch (error) {
        console.error("Error creating embedding:", error);
        throw error;
    }
}