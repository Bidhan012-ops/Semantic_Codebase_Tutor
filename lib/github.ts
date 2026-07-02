// Don't forget to add GITHUB_TOKEN to your .env.local file if you hit rate limits!
const ALLOWED_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx", ".md"]; 

export async function fetchRepoFiles(owner: string, repo: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Only add Authorization header if GITHUB_TOKEN is defined
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Get the default branch
    const repoDataRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    
    if (!repoDataRes.ok) {
        throw new Error(`Failed to fetch repo data: ${repoDataRes.statusText} (${repoDataRes.status})`);
    }
    
    const repoData = await repoDataRes.json();
    const defaultBranch = repoData.default_branch;

    // 2. Get the full file tree recursively
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      { headers }
    );
    
    if (!treeRes.ok) {
        throw new Error(`Failed to fetch tree: ${treeRes.statusText} (${treeRes.status})`);
    }
    
    const treeData = await treeRes.json();

    if (!treeData.tree) {
        throw new Error("Could not retrieve repository tree.");
    }

    // 3. Filter for valid code files
    const validFiles = treeData.tree.filter((item: any) => {
      if (item.type !== "blob") return false; 
      
      const lastDotIndex = item.path.lastIndexOf(".");
      if (lastDotIndex === -1) return false; // Skip files without extensions
      
      const extension = item.path.substring(lastDotIndex).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(extension);
    });

    // 4. Fetch the raw content for each file
    const fileContents = await Promise.all(
      validFiles.map(async (file: any) => {
        // We do NOT send our GITHUB_TOKEN to raw.githubusercontent.com as it can cause authentication rejection
        const rawRes = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${file.path}`
        );
        
        if (!rawRes.ok) {
          return {
            path: file.path,
            content: `// Error loading file contents: ${rawRes.statusText}`,
          };
        }
        
        const content = await rawRes.text();

        return {
          path: file.path,
          content: content,
        };
      })
    );

    return fileContents;

  } catch (error) {
    console.error("Error in fetchRepoFiles:", error);
    throw error;
  }
}
