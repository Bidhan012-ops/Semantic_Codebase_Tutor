import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCzhrYxCvG1H3GhCK2JDM0HJsyC3Ok4XmU"); // using the key from .env.local

async function test() {
    try {
        const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
        const embeddingResult = await embeddingModel.embedContent("Hello world");
        console.log("Success:", embeddingResult.embedding.values.length);
    } catch (e) {
        console.error("Embedding Error:", e.message);
    }
}

test();
