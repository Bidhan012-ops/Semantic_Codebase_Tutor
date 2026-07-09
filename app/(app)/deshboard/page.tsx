"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRepoMap } from "@/lib/repomap";

type Message = {
  role: "user" | "ai";
  content: string;
};

const DashboardStyles = React.memo(() => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
    
    body {
        background-color: #131313;
        color: #e5e2e1;
        font-family: 'Geist', sans-serif;
        overflow: hidden;
    }
    .industrial-border {
        border: 1px solid #2A2A2A;
    }
    .amber-glow:focus {
        outline: none;
        border-color: #f08c00;
        box-shadow: 0 0 8px rgba(240, 140, 0, 0.2);
    }
    .btn-primary-gradient {
        background: linear-gradient(to bottom, #F08C00, #D47A00);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    .logo-mark {
        width: 32px;
        height: 32px;
        background: #f08c00;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        color: #0D0D0D;
        font-size: 20px;
    }
    .code-block {
        background-color: #080808;
        border-left: 2px solid #f08c00;
    }
    .scanlines {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 4px, 3px 100%;
        pointer-events: none;
        z-index: 50;
        opacity: 0.1;
    }
    .message-stream::-webkit-scrollbar {
        width: 6px;
    }
    .message-stream::-webkit-scrollbar-track {
        background: transparent;
    }
    .message-stream::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 4px;
    }
    .font-label-sm { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; line-height: 1; }
    .font-body-md { font-family: 'Geist', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; }
    .font-headline-md { font-family: 'Source Serif 4', serif; font-size: 24px; font-weight: 600; line-height: 1.3; }
  `}} />
));

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I am your Semantic Codebase Tutor. I have successfully completed the indexing of the current repository branch main.\n\nI am prepared to provide deep-contextual analysis on architectural patterns, performance bottlenecks, or specific implementation details. What would you like to investigate?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repoFiles, setRepoFiles] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch the repo map when dashboard loads
  useEffect(() => {
    getRepoMap().then(map => {
        if (map && map.length > 0) {
            setRepoFiles(map);
        }
    }).catch(console.error);
  }, []);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I encountered an error while searching the codebase." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DashboardStyles />

      <div className="flex flex-col h-screen overflow-hidden bg-[#131313]">
        <div className="scanlines"></div>
        
        {/* Top Navigation Bar */}
        <header className="bg-[#131313] border-b border-[#554334]/30 flex justify-between items-center w-full px-4 py-2 sticky top-0 z-40 shrink-0 min-h-[56px]">
          <div className="flex items-center gap-4">
            <div className="logo-mark font-label-sm">/</div>
            <h1 className="font-headline-md text-[#e5e2e1] hidden sm:block">Semantic Codebase Tutor</h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <span className="font-label-sm text-[#a38d7a] uppercase">SYS_ID: SEM_TUTOR_V4.2</span>
            <div className="h-4 w-px bg-[#554334]/30"></div>
            <span className="font-label-sm text-[#ffb874]">ENCRYPTION: AES-256-GCM</span>
          </div>
          <div className="flex items-center gap-4 z-50">
            <button onClick={() => router.push("/landing")} className="font-label-sm text-[#dbc2ae] hover:text-[#ffb874] px-2 py-2 transition-colors duration-200 uppercase">
              <span className="hidden sm:inline">Back to Landing</span>
              <span className="material-symbols-outlined sm:hidden">arrow_back</span>
            </button>
            <div className="w-8 h-8 industrial-border bg-[#201f1f] flex items-center justify-center font-label-sm text-[#ffb874]">
                OP
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden relative">
          
          {/* Left Side Diagnostics */}
          <aside className="hidden lg:flex flex-col w-64 border-r border-[#554334]/20 p-4 gap-10 overflow-hidden bg-[#0e0e0e]">
            <div className="space-y-4">
              <p className="font-label-sm text-[#554334] uppercase">Core Diagnostics</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#dbc2ae]">CPU_LOAD</span>
                  <span className="text-[#ffb874]">14.2%</span>
                </div>
                <div className="w-full h-1 bg-[#201f1f]">
                  <div className="h-full bg-[#ffb874] w-[14%]"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono mt-2">
                  <span className="text-[#dbc2ae]">MEM_RESERVE</span>
                  <span className="text-[#ffb874]">4.1GB</span>
                </div>
                <div className="w-full h-1 bg-[#201f1f]">
                  <div className="h-full bg-[#ffb874] w-[40%]"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-label-sm text-[#554334] uppercase">Operational Coordinates</p>
              <div className="font-label-sm text-[#dbc2ae] leading-relaxed">
                  LAT: 40.7128° N<br/>
                  LONG: 74.0060° W<br/>
                  ALT: 12.4m MSL<br/>
                  NODE: US-EAST-B
              </div>
            </div>
            <div className="mt-auto opacity-30">
              <div className="border-t border-[#554334]/20 pt-4">
                <p className="font-label-sm text-[#554334]">REPOS_ANALYZED: 42</p>
                <p className="font-label-sm text-[#554334]">UPTIME: 1,248H</p>
              </div>
            </div>
          </aside>

          {/* Chat Canvas */}
          <section className="flex-1 flex flex-col bg-[#131313] relative overflow-hidden">
            {/* Central Message Area */}
            <div className="flex-1 overflow-y-auto message-stream p-4 md:p-16 space-y-10 max-w-4xl mx-auto w-full">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-4 group ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "ai" ? (
                    <>
                      <div className="flex-shrink-0 w-10 h-10 logo-mark font-label-sm text-xl">/</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-[#ffb874] uppercase">System</span>
                        </div>
                        <div className="industrial-border bg-[#201f1f] p-4 md:p-6 text-[#e5e2e1] font-body-md leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-10 h-10 bg-[#2a2a2a] border border-[#a38d7a] text-[#e5e2e1] flex items-center justify-center font-bold">O</div>
                      <div className="flex-1 text-right space-y-2">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="font-label-sm text-[#e5e2e1] uppercase">Operator</span>
                        </div>
                        <div className="industrial-border bg-[#2a2a2a] p-4 md:p-6 text-[#e5e2e1] font-body-md inline-block text-left max-w-lg whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {isLoading && (
                 <div className="flex gap-4 group">
                   <div className="flex-shrink-0 w-10 h-10 logo-mark font-label-sm text-xl animate-pulse">/</div>
                   <div className="flex-1 space-y-2 flex items-center">
                     <div className="industrial-border bg-[#201f1f] p-4 text-[#e5e2e1] font-body-md flex items-center gap-2 h-[48px]">
                        <div className="w-1.5 h-1.5 bg-[#ffb874] rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-[#ffb874] rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                        <div className="w-1.5 h-1.5 bg-[#ffb874] rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                     </div>
                   </div>
                 </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="px-4 md:px-16 pb-4 md:pb-6 pt-4 bg-[#131313] border-t border-[#554334]/10">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full relative">
                <div className="absolute -top-6 left-0 flex gap-4 opacity-60">
                  <span className="font-label-sm text-[#554334]">INPUT_MODE: SEMANTIC_ANALYSIS</span>
                  <span className="font-label-sm text-[#554334]">TOKEN_LIMIT: 4096</span>
                </div>
                <div className="flex gap-2 items-stretch">
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                      className="w-full h-14 bg-[#0e0e0e] industrial-border px-6 font-body-md amber-glow placeholder:text-[#554334] text-[#e5e2e1]" 
                      placeholder="Ask a question about your code..." 
                    />
                  </div>
                  <button type="submit" disabled={isLoading} className="btn-primary-gradient w-14 flex items-center justify-center industrial-border active:scale-95 transition-transform duration-150 disabled:opacity-50">
                    <span className="material-symbols-outlined text-[#4b2800] font-bold">arrow_forward</span>
                  </button>
                </div>
                <div className="mt-1 flex justify-between">
                  <p className="font-label-sm text-[#554334]">Press <kbd className="px-1 border border-[#554334]/30 bg-[#201f1f] rounded-sm">Enter</kbd> to execute</p>
                  <p className="font-label-sm text-[#554334]">LLM: PRO-TURBO-4.0</p>
                </div>
              </form>
            </div>
          </section>

          {/* Right Side Terminal View */}
          <aside className="hidden xl:flex flex-col w-72 border-l border-[#554334]/20 p-4 bg-[#0e0e0e]">
            <div className="flex items-center justify-between mb-4">
              <p className="font-label-sm text-[#554334]">Repository Map</p>
              <span className="material-symbols-outlined text-[#554334] text-sm">filter_alt</span>
            </div>
            
            <div className="space-y-2 overflow-y-auto font-label-sm flex-1">
               {repoFiles.length > 0 ? (
                 repoFiles.map((file, idx) => (
                   <div key={idx} className="flex items-center gap-2 text-[#dbc2ae] hover:text-[#ffb874] cursor-pointer transition-colors p-1" title={file}>
                     <span className="material-symbols-outlined text-sm shrink-0">description</span> 
                     <span className="truncate">{file.replace(/^- /, '')}</span>
                   </div>
                 ))
               ) : (
                 <div className="flex items-center gap-2 text-[#554334] p-1 italic">
                     Awaiting sync...
                 </div>
               )}
            </div>

            <div className="mt-10 border-t border-[#554334]/20 pt-4 space-y-4">
              <p className="font-label-sm text-[#554334] uppercase">Current Stack</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#201f1f] text-[#dbc2ae] font-label-sm px-2 py-[2px] border border-[#554334]/20">TypeScript</span>
                <span className="bg-[#201f1f] text-[#dbc2ae] font-label-sm px-2 py-[2px] border border-[#554334]/20">Next.js</span>
                <span className="bg-[#201f1f] text-[#dbc2ae] font-label-sm px-2 py-[2px] border border-[#554334]/20">MongoDB</span>
              </div>
            </div>
            <div className="mt-auto h-32 relative overflow-hidden border border-[#554334]/10">
              <div className="absolute inset-0 p-2 font-label-sm text-[#ffb874]/40 leading-tight">
                  DEBUG_LOG: TRACE: REDIS_CONN_ESTABLISHED<br/>
                  DEBUG_LOG: INFO: CACHE_MISS_FALLBACK<br/>
                  DEBUG_LOG: WARN: SLOW_QUERY_DETECTED_302MS<br/>
                  DEBUG_LOG: TRACE: JWT_VERIFY_SUCCESS<br/>
                  DEBUG_LOG: TRACE: REDIS_CONN_ESTABLISHED<br/>
                  DEBUG_LOG: INFO: CACHE_HIT_UID_891
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0e0e0e] to-transparent"></div>
            </div>
          </aside>
        </main>

        {/* Footer */}
        <footer className="bg-[#0e0e0e] border-t border-[#554334]/20 py-2 px-4 flex justify-between items-center h-8 shrink-0 min-h-[32px]">
          <div className="flex items-center gap-6">
            <span className="font-label-sm text-[#dbc2ae]">© 2024 SemanticTutor</span>
            <span className="font-label-sm text-[#554334] hidden md:inline">PRECISION ENGINEERING FOR AI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-label-sm text-[#dbc2ae] uppercase">Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}