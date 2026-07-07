"use server";

import { db } from "@/lib/db";
import { auth } from "@/app/api/auth/[...nextauth]/option";

// We keep this function so it doesn't break lib/github.ts, 
// but we no longer need to store it in memory.
export async function repomap(repoMap: string) {
    return; 
}

export async function getRepoMap(): Promise<string[]> {
    try {
        const session = await auth();
        // @ts-ignore - The user's types extend session.user to include repoId
        const repoId = session?.user?.repoId;
        
        if (!repoId) {
            console.log("No repoId found in session for getRepoMap");
            return [];
        }

        const connection = await db();
        const collection = await connection.collection("code_chunks");

        // Fetch all distinct paths in MongoDB that belong to this specific repoId
        const paths = await collection.distinct("path", { repoId });
        
        // Add a dash prefix so it matches the UI styling you originally had, 
        // and sort them alphabetically for the UI
        return paths.map(p => `- ${p}`).sort();
    } catch (error) {
        console.error("Error fetching repomap from DB:", error);
        return [];
    }
}