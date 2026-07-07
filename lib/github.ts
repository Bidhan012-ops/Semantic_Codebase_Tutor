// Don't forget to add this to your .env.local file!
// GITHUB_TOKEN=your_personal_access_token_here

// For Version 1, we are intentionally limiting this to JavaScript/TypeScript 
// and Markdown files to keep chunking simple and avoid token limits.
import { repomap } from "./repomap";
const ALLOWED_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".md"];
let currentgithubupdate: Date;
export async function fetchRepoFiles(owner: string, repo: string) {
    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
    };

    try {
        // 1. Get the default branch (it's not always 'main', sometimes it's 'master')
        const repoDataRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        if (!repoDataRes.ok) {
            throw new Error(`Failed to fetch repo: ${repoDataRes.statusText}`);
        }

        const repoData = await repoDataRes.json();
        const defaultBranch = repoData.default_branch;
        currentgithubupdate = new Date(repoData.pushed_at);
        // 2. Get the full file tree recursively
        // The "?recursive=1" parameter tells GitHub to open all folders inside folders
        const treeRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
            { headers }
        );
        const treeData = await treeRes.json();

        if (!treeData.tree) {
            throw new Error("Could not retrieve repository tree.");
        }

        // ==========================================
        // NEW REPO MAP LOGIC
        // ==========================================
        // Extract every single file (blob) to build the complete repository architecture map
        const allFilePaths = treeData.tree
            .filter((item: any) => item.type === "blob")
            .map((item: any) => `- ${item.path}`);

        const repoMapContent = allFilePaths.join("\n");


        await repomap(repoMapContent);

        const validFiles = treeData.tree.filter((item: any) => {
            // "blob" means it is a file. "tree" means it is a directory. We only want files.
            if (item.type !== "blob") return false;

            const extension = item.path.substring(item.path.lastIndexOf("."));
            return ALLOWED_EXTENSIONS.includes(extension);
        });

        // 4. Fetch the raw content for each file in chunks to avoid connection timeouts
        const fileContents = [];
        const CHUNK_SIZE = 50; // Process 50 files at a time

        for (let i = 0; i < validFiles.length; i += CHUNK_SIZE) {
            const chunk = validFiles.slice(i, i + CHUNK_SIZE);

            const chunkResults = await Promise.all(
                chunk.map(async (file: any) => {
                    const rawRes = await fetch(
                        `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${file.path}`,
                        { headers } // Adding headers here too just in case of rate limits
                    );

                    if (!rawRes.ok) return null; // Handle missing or large files gracefully

                    const content = await rawRes.text();
                    return {
                        path: file.path,
                        content: content,
                    };
                })
            );

            fileContents.push(...chunkResults.filter(Boolean));

            // Small 100ms delay to give the event loop and network sockets time to breathe
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log("The filecontets are:", fileContents);
        return fileContents;

    } catch (error) {
        console.error("Error in fetchRepoFiles:", error);
        throw error; // Re-throw the error so the API route can catch it and send a 500 status
    }
}
export async function findupdate() {
    console.log(`This repo is last updated at ${currentgithubupdate}`)
    return currentgithubupdate;
}