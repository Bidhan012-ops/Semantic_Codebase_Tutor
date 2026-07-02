"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting repo URL:", repoUrl);

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: repoUrl }),
      });

      if (!response.ok) throw new Error("Failed to ingest repository");

      const result = await response.json();
      console.log("Ingestion result:", result);

      // Once successful, you can redirect to the chat interface here:
      // e.g., router.push(`/repo/${result.data.id}`);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Semantic Codebase Tutor
          </h1>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Paste a public GitHub URL to start chatting with the code.
          </p>
        </div>

        <form onSubmit={handleIngest} className="mt-8 space-y-4">
          <input
            type="url"
            required
            placeholder="https://github.com/facebook/react"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent p-3 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
            suppressHydrationWarning
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 p-3 text-white font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            suppressHydrationWarning
          >
            {isLoading ? "Analyzing Repository..." : "Start Onboarding"}
          </button>
        </form>
      </div>
    </main>
  );
}
