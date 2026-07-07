"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Landing() {
  const { data: session, update } = useSession();
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
      await update({ repoId: result.repoId });
      router.push("/deshboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131313] text-white font-serif overflow-hidden selection:bg-[#f08c00]/30 selection:text-white relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        .font-serif { font-family: 'Source Serif 4', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        
        .industrial-border {
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .input-glow:focus {
            outline: none;
            border-color: #f08c00;
            box-shadow: 0 0 0 1px #f08c00;
        }
        .scanlines {
            background: linear-gradient(
                to bottom,
                transparent 50%,
                rgba(0, 0, 0, 0.1) 51%
            );
            background-size: 100% 4px;
            pointer-events: none;
        }
        
        @keyframes profile-shimmer {
            100% {
                transform: translateX(200%);
            }
        }
      `}} />

      {/* Background Decorations */}
      <div className="fixed inset-0 scanlines opacity-20 z-0"></div>

      {/* System Metadata: Top Left */}
      <div className="fixed top-8 left-8 font-mono text-[10px] text-[#666666] uppercase tracking-[0.2em] select-none z-10 hidden sm:block">
        SYS_ID: SEM_TUTOR_v4.2<br />
        STATUS: AUTHENTICATED_SESSION
      </div>

      {/* System Metadata: Bottom Right */}
      <div className="fixed bottom-8 right-8 font-mono text-[10px] text-[#666666] text-right tracking-widest select-none z-10 hidden sm:block">
        COORD: 40.7128° N, 74.0060° W<br />
        BUILD_HASH: 0x8F42A_SECURE
      </div>

      {/* User Profile / Sign Out */}
      <div className="fixed top-8 right-8 z-40">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="group relative font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#f08c00] transition-all duration-300 border border-[#333333] hover:border-[#f08c00]/50 bg-[#131313] px-4 py-2 flex items-center gap-3 overflow-hidden shadow-[0_0_15px_rgba(240,140,0,0.05)] hover:shadow-[0_0_20px_rgba(240,140,0,0.15)]"
        >
          {/* Subtle scanning line effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f08c00]/10 to-transparent -translate-x-[200%] group-hover:animate-[profile-shimmer_2s_infinite] pointer-events-none"></div>
          
          {/* Glowing Status Dot */}
          <div className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f08c00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f08c00]"></span>
          </div>

          <span className="relative z-10 truncate max-w-[120px]">{session?.user?.username || session?.user?.name || session?.user?.email || "USER_PROFILE"}</span>
          
          <span className="material-symbols-outlined text-[14px] relative z-10 transition-transform duration-300 flex-shrink-0">
            {isProfileOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
        
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#131313] industrial-border shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
             <div className="mb-4 pb-4 border-b border-[#333333]">
                <div className="font-serif font-bold text-[#e5e2e1] truncate text-sm">{session?.user?.username || session?.user?.name || "Username"}</div>
                <div className="font-mono text-[10px] text-[#888888] tracking-widest mt-1 truncate">{session?.user?.email}</div>
             </div>
             <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left font-mono text-[10px] uppercase tracking-widest text-[#f08c00] hover:text-[#ff9d14] hover:bg-[#1a1a1a] transition-colors px-3 py-2 flex items-center gap-2 border border-transparent hover:border-[#f08c00]/30"
             >
                <span className="material-symbols-outlined text-[14px]">logout</span>
                TERMINATE_SESSION
             </button>
          </div>
        )}
      </div>

      {/* Onboarding Portal */}
      <main className="relative z-20 flex-grow flex items-center justify-center px-6">
        <div className="industrial-border w-full max-w-xl bg-[#131313] p-10 md:p-14 shadow-2xl relative">
          {/* Top Decorative Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#f08c00]"></div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#f08c00] w-12 h-12 mb-8 flex items-center justify-center">
              <span className="text-[#131313] font-bold text-2xl">/</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-white mb-4">
              Semantic Codebase Tutor
            </h1>
            <p className="text-[#666666] font-mono text-xs md:text-sm tracking-wide uppercase">
              INPUT PUBLIC GITHUB REPOSITORY URL TO INITIALIZE
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleIngest} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="repo-url" className="font-mono text-[10px] text-[#666666] uppercase tracking-widest flex items-center gap-2">
                <span className="text-[#f08c00]">@</span> SYSTEM.REPO_URI
              </label>
              <input
                id="repo-url"
                name="repo-url"
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/facebook/react"
                className="w-full bg-white text-[#131313] font-mono px-4 py-4 rounded-none border-none focus:ring-0 input-glow transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f08c00] text-[#131313] font-mono font-bold py-5 px-6 uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> ANALYZING...</>
                ) : (
                  <>
                    Start Onboarding
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Bottom Decorative Divider */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="font-mono text-[10px] text-[#666666] uppercase tracking-[0.3em]">
              Ready for Indexing — Verifying Handshake...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
