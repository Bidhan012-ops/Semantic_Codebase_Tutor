export interface Chunk {
  text: string;
  metadata: {
    path: string;
    startPoint: number;
    endPoint: number;
  };
}

/**
 * Splits a large text string into smaller overlapping chunks.
 * * @param text The raw code from the file
 * @param path The file path (e.g., "src/components/Button.tsx")
 * @param chunkSize Maximum characters per chunk (default: 1000)
 * @param overlap How many characters should overlap between chunks (default: 200)
 */
export function chunkCodeFile(
  text: string,
  path: string,
  chunkSize: number = 1000,
  overlap: number = 200
): Chunk[] {
  const chunks: Chunk[] = [];
  let i = 0;

  while (i < text.length) {
    // Determine where this chunk ends
    let end = i + chunkSize;

    // Grab the text for this chunk
    const chunkText = text.substring(i, end);

    // Save the chunk with its metadata so the AI knows where it came from
    chunks.push({
      text: chunkText,
      metadata: {
        path,
        startPoint: i,
        endPoint: Math.min(end, text.length),
      },
    });

    // Move forward, but step back slightly based on the overlap
    i += chunkSize - overlap;
  }
  return chunks;
}