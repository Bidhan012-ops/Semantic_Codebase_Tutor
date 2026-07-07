import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCzhrYxCvG1H3GhCK2JDM0HJsyC3Ok4XmU");

async function test() {
    try {
        const chatModel = genAI.getGenerativeModel({ model: "gemini-3.0-flash" });
        const result = await chatModel.generateContent("hello");
        console.log("Success with gemini-3.0-flash:", result.response.text());
    } catch (e) {
        try {
            const chatModel2 = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result2 = await chatModel2.generateContent("hello");
            console.log("Success with gemini-2.5-flash:", result2.response.text());
        } catch(e2) {
            console.error("Chat Error 2.5:", e2.message);
        }
    }
}
test();
