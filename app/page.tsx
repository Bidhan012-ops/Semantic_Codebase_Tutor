"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);

  // Subtle radial gradient background effect
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(240, 140, 0, 0.04) 0%, transparent 50%), #0D0D0D`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#e5e2e1] font-sans selection:bg-[#f08c00]/30 selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Source+Serif+4:opsz,wght@8..144,400;600;700;800&family=Geist:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        .font-serif { font-family: 'Source Serif 4', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-sans { font-family: 'Geist', sans-serif; }
        
        .amber-gradient { background: linear-gradient(180deg, #F08C00 0%, #C46A00 100%); box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2); }
        .copper-accent { color: #D47A00; }
        .industrial-border { border: 1px solid #2A2A2A; }
        .micro-shadow { box-shadow: 0 8px 32px -4px rgba(0,0,0,0.6); }
        .rim-light { border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
        
        .glow-effect { position: relative; }
        .glow-effect::before {
            content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px;
            background: linear-gradient(45deg, #F08C00, transparent, #C46A00);
            z-index: -1; border-radius: inherit; opacity: 0.15; transition: opacity 0.3s ease;
        }
        .glow-effect:hover::before { opacity: 0.4; }
      `}} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#2A2A2A]/40">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 py-4 max-w-[1440px] mx-auto h-20">
          <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer shrink-0">
            <div className="bg-[#f08c00] p-1 sm:p-1.5 rounded-md flex items-center justify-center amber-gradient transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[#3A1D00] text-[18px] sm:text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
            </div>
            <span className="font-serif text-lg sm:text-2xl font-bold text-[#e5e2e1] tracking-tight">SemanticTutor</span>
          </div>
          <div className="hidden md:flex items-center gap-10 shrink-0">
            <Link className="font-sans text-sm font-medium text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#features">Features</Link>
            <Link className="font-sans text-sm font-medium text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#architecture">Architecture</Link>
            <Link className="font-sans text-sm font-medium text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Pricing</Link>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link href="/signin" className="hidden sm:block font-sans text-sm font-medium text-[#b7b5b4] hover:text-[#e5e2e1] transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-2.5 bg-[#f08c00] text-[#3A1D00] font-sans font-semibold text-xs sm:text-sm amber-gradient rounded-md shadow-[0_0_15px_rgba(240,140,0,0.2)] transition-all hover:shadow-[0_0_20px_rgba(240,140,0,0.4)] hover:-translate-y-0.5 active:scale-95">
              GET STARTED
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col items-center pt-24 pb-16 px-6 overflow-hidden"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(240, 140, 0, 0.05) 0%, transparent 60%), #0D0D0D" }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#F08C00 1px, transparent 1px), linear-gradient(90deg, #F08C00 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

          <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">

            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#F08C00]/20 bg-[#F08C00]/5 rounded-full mb-8 backdrop-blur-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F08C00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F08C00]"></span>
              </div>
              <span className="font-mono text-xs font-semibold text-[#F08C00] tracking-wide">Gemini Semantic Engine</span>
            </div>

            <h1 className="font-serif text-5xl md:text-[72px] leading-[1.1] text-[#e5e2e1] mb-6 font-bold tracking-tight">
              Master any codebase with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F08C00] to-[#C46A00] italic pr-2">Semantic Intelligence.</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-[#a3a1a0] max-w-2xl mx-auto mb-12 leading-relaxed">
              Instantly chat with your architecture. We transform raw code into a highly optimized semantic vector space, engineered for senior development teams.
            </p>

            {/* High-Fidelity Code Editor Mockup */}
            <div className="w-full max-w-[1000px] border border-[#2A2A2A] rounded-xl overflow-hidden micro-shadow rim-light bg-[#121212] flex flex-col text-left glow-effect mt-4">
              {/* Editor Header */}
              <div className="h-12 border-b border-[#2A2A2A] flex items-center justify-between px-4 bg-[#0A0A0A]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4A4A4A]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#4A4A4A]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#4A4A4A]"></div>
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-1 rounded border border-[#2A2A2A]">
                  <span className="material-symbols-outlined text-[14px] text-[#F08C00]">lock</span>
                  <span className="font-mono text-[11px] text-[#8a8887]">src/engine/semantic_layer.py</span>
                </div>
                <div className="w-12"></div> {/* Spacer for balance */}
              </div>

              {/* Editor Body */}
              <div className="flex h-[380px]">
                {/* File Browser Sidebar */}
                <div className="w-48 border-r border-[#2A2A2A] bg-[#0A0A0A] p-4 hidden md:block">
                  <span className="font-sans text-[10px] font-bold text-[#666] uppercase tracking-widest mb-4 block">Explorer</span>
                  <div className="space-y-2 font-mono text-xs text-[#8a8887]">
                    <div className="flex items-center gap-2 text-[#e5e2e1]"><span className="material-symbols-outlined text-[14px] text-[#F08C00]">folder_open</span> src/</div>
                    <div className="flex items-center gap-2 pl-4"><span className="material-symbols-outlined text-[14px]">folder</span> api/</div>
                    <div className="flex items-center gap-2 pl-4 text-[#e5e2e1]"><span className="material-symbols-outlined text-[14px] text-[#F08C00]">folder_open</span> engine/</div>
                    <div className="flex items-center gap-2 pl-8 text-[#F08C00] bg-[#F08C00]/10 py-1 -mx-2 px-2 rounded"><span className="material-symbols-outlined text-[14px]">description</span> semantic_layer.py</div>
                    <div className="flex items-center gap-2 pl-8"><span className="material-symbols-outlined text-[14px]">description</span> vector_store.ts</div>
                    <div className="flex items-center gap-2 pl-4"><span className="material-symbols-outlined text-[14px]">folder</span> utils/</div>
                  </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 bg-[#121212] p-6 overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-0 w-10 border-r border-[#2A2A2A]/50 bg-[#0A0A0A]/50 text-right pr-2 pt-6 font-mono text-xs text-[#4A4A4A] select-none">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
                  </div>
                  <pre className="font-mono text-[13px] leading-[1.7] text-[#c8c6c5] pl-8">
                    <code>
                      <span className="text-[#8a8887]"># Core logic for architectural understanding</span><br />
                      <span className="text-[#D47A00]">import</span> asyncio<br />
                      <span className="text-[#D47A00]">from</span> core.vector <span className="text-[#D47A00]">import</span> SearchClient<br /><br />
                      <span className="text-[#F08C00] font-bold">class</span> <span className="text-[#e5e2e1]">SemanticEngine</span>:<br />
                      {"    "}<span className="text-[#8a8887]">@tracer.capture_metrics</span><br />
                      {"    "}<span className="text-[#F08C00] font-bold">async def</span> <span className="text-[#e5e2e1]">analyze_context</span>(self, query: str, repo_id: str):<br />
                      {"        "}embeddings = <span className="text-[#F08C00] font-bold">await</span> self.vector_store.search(query, filter=repo_id)<br />
                      {"        "}<span className="text-[#F08C00] font-bold">return</span> self.llm.synthesize(context=embeddings)
                    </code>
                  </pre>

                  {/* Floating Context Retrieval Overlay */}
                  <div className="absolute bottom-6 right-6 w-64 h-48 bg-[#0A0A0A]/80 backdrop-blur border border-[#2A2A2A] rounded-lg p-4 hidden lg:flex flex-col micro-shadow">
                    <span className="font-sans text-[10px] font-bold text-[#F08C00] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F08C00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F08C00]"></span>
                      </span>
                      Live Vector Search
                    </span>
                    <div className="flex flex-col gap-2 flex-1 mt-2">
                      <div className="w-full h-8 bg-[#1A1A1A] border border-[#F08C00]/30 rounded flex items-center px-2 shadow-[0_0_10px_rgba(240,140,0,0.1)]">
                        <span className="font-mono text-[9px] text-[#e5e2e1]">similarity: 0.942</span>
                        <span className="ml-auto font-mono text-[9px] text-[#8a8887]">src/auth.ts</span>
                      </div>
                      <div className="w-full h-8 bg-[#121212] border border-[#2A2A2A] rounded flex items-center px-2">
                        <span className="font-mono text-[9px] text-[#a3a1a0]">similarity: 0.891</span>
                        <span className="ml-auto font-mono text-[9px] text-[#8a8887]">api/route.ts</span>
                      </div>
                      <div className="w-full h-8 bg-[#121212] border border-[#2A2A2A] rounded flex items-center px-2 opacity-70">
                        <span className="font-mono text-[9px] text-[#a3a1a0]">similarity: 0.753</span>
                        <span className="ml-auto font-mono text-[9px] text-[#8a8887]">utils/jwt.ts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engineered for Precision Section */}
        <section id="features" className="py-32 px-6 max-w-[1440px] mx-auto border-t border-[#2A2A2A]/20">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl font-bold mb-4 text-[#e5e2e1]">Engineered for Precision</h2>
            <p className="font-sans text-lg text-[#8a8887] max-w-2xl mx-auto">
              We don't just search text. Our engine parses the mathematical and architectural context of your code.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Deep Structural Analysis Card */}
            <div className="lg:col-span-8 bg-[#121212] border border-[#2A2A2A] rounded-2xl p-10 flex flex-col justify-between micro-shadow rim-light group hover:border-[#4A4A4A] transition-colors">
              <div>
                <div className="bg-[#1A1A1A] w-14 h-14 rounded-xl flex items-center justify-center border border-[#2A2A2A] mb-8 shadow-inner">
                  <span className="material-symbols-outlined text-[#F08C00] text-3xl">hub</span>
                </div>
                <h3 className="font-sans text-3xl font-semibold mb-4 text-[#e5e2e1]">Semantic Context Retrieval</h3>
                <p className="font-sans text-base text-[#a3a1a0] max-w-xl leading-relaxed mb-10">
                  By indexing your entire repository into high-dimensional vector embeddings, the engine instantly understands context and retrieves the most relevant snippets to answer architectural questions.
                </p>
              </div>

              {/* Performance Metrics Chips */}
              <div className="flex flex-wrap gap-4 mt-auto">
                <div className="flex items-center gap-2 bg-[#F08C00]/10 text-[#F08C00] border border-[#F08C00]/20 rounded-full px-4 py-1.5 font-mono text-[13px] font-medium shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">done_all</span> 99.2% Accuracy
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] text-[#e5e2e1] border border-[#2A2A2A] rounded-full px-4 py-1.5 font-mono text-[13px] font-medium shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#D47A00]">bolt</span> &lt;200ms Latency
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] text-[#e5e2e1] border border-[#2A2A2A] rounded-full px-4 py-1.5 font-mono text-[13px] font-medium shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-[#D47A00]">database</span> 331+ LOC Scanned
                </div>
              </div>
            </div>

            {/* Industrial Security Card */}
            <div className="lg:col-span-4 bg-[#121212] border border-[#2A2A2A] rounded-2xl p-10 flex flex-col micro-shadow rim-light group hover:border-[#4A4A4A] transition-colors overflow-hidden relative">
              <div className="relative z-10">
                <div className="bg-[#1A1A1A] w-14 h-14 rounded-xl flex items-center justify-center border border-[#2A2A2A] mb-8 shadow-inner">
                  <span className="material-symbols-outlined text-[#F08C00] text-3xl">gpp_good</span>
                </div>
                <h3 className="font-sans text-2xl font-semibold mb-4 text-[#e5e2e1]">Industrial Security</h3>
                <p className="font-sans text-sm text-[#a3a1a0] leading-relaxed mb-8">
                  Your intellectual property is sacred. AES-256-GCM encryption at rest and in transit.
                </p>
              </div>

              {/* Security Visualization Mockup */}
              <div className="mt-auto relative h-32 w-full border border-[#2A2A2A]/50 bg-[#0A0A0A] rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,140,0,0.1)_0%,transparent_70%)]"></div>
                <div className="relative w-16 h-16 border-2 border-[#F08C00] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(240,140,0,0.2)]">
                  <div className="absolute inset-0 rounded-full border-2 border-[#F08C00] animate-ping opacity-20"></div>
                  <span className="material-symbols-outlined text-[#F08C00] text-3xl">lock</span>
                </div>
                {/* Simulated encrypted data stream */}
                <div className="absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-[#F08C00]/30 to-transparent"></div>
                <div className="absolute left-0 right-0 bottom-4 h-px bg-gradient-to-r from-transparent via-[#F08C00]/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-8 micro-shadow rim-light hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-[#F08C00] mb-5 text-3xl">group_work</span>
              <h4 className="font-sans text-lg font-semibold text-[#e5e2e1] mb-2">Collaborative Intelligence</h4>
              <p className="font-sans text-sm text-[#8a8887] leading-relaxed">Share context across your team. Accelerate onboarding and eliminate institutional knowledge silos instantly.</p>
            </div>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-8 micro-shadow rim-light hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-[#F08C00] mb-5 text-3xl">commit</span>
              <h4 className="font-sans text-lg font-semibold text-[#e5e2e1] mb-2">Git-Native Insights</h4>
              <p className="font-sans text-sm text-[#8a8887] leading-relaxed">Direct integration with your GitHub repositories. The vector index tracks your codebase accurately across files.</p>
            </div>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-8 micro-shadow rim-light hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-[#F08C00] mb-5 text-3xl">terminal</span>
              <h4 className="font-sans text-lg font-semibold text-[#e5e2e1] mb-2">Terminal & IDE Ready</h4>
              <p className="font-sans text-sm text-[#8a8887] leading-relaxed">Access the intelligence engine directly from your CLI or through our upcoming native VS Code extension.</p>
            </div>
          </div>
        </section>

        {/* The Architectural Brain Section */}
        <section id="architecture" className="py-32 relative border-t border-[#2A2A2A]/20 bg-[#0A0A0A]">
          <div className="max-w-[1440px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl font-bold mb-10 text-[#e5e2e1]">The Architectural Brain of Your Workflow</h2>

              <div className="space-y-12">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#2A2A2A] bg-[#121212] flex items-center justify-center font-mono text-sm text-[#F08C00] group-hover:border-[#F08C00]/50 transition-colors">01</div>
                  <div>
                    <h5 className="font-sans text-xl font-semibold text-[#e5e2e1] mb-3">Semantic Code Chat</h5>
                    <p className="font-sans text-base text-[#8a8887] leading-relaxed">
                      Stop manually grepping through thousands of files. Ask complex architectural questions in plain English. The engine synthesizes precise answers backed by exact, hyper-linked code snippets from your repository.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-[#2A2A2A] bg-[#121212] flex items-center justify-center font-mono text-sm text-[#F08C00] group-hover:border-[#F08C00]/50 transition-colors">02</div>
                  <div>
                    <h5 className="font-sans text-xl font-semibold text-[#e5e2e1] mb-3">Dynamic Intent Routing</h5>
                    <p className="font-sans text-base text-[#8a8887] leading-relaxed">
                      The engine intelligently adapts to your scope. Ask about the "whole project" for a high-level summary, or drill down into a specific function for hyper-localized, ultra-fast vector retrieval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: High-Detail Product Visualization Mockup */}
            <div className="order-1 lg:order-2 relative w-full h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F08C00]/10 to-transparent rounded-2xl blur-2xl"></div>

              {/* Complex Terminal/Chat Mockup */}
              <div className="absolute inset-0 bg-[#131313] border border-[#2A2A2A] rounded-xl micro-shadow rim-light overflow-hidden flex flex-col glow-effect">

                {/* Header */}
                <div className="h-10 bg-[#080808] border-b border-[#2A2A2A] flex justify-between items-center px-4 shrink-0">
                  <span className="font-mono text-[10px] text-[#666] tracking-widest">SYS_ID: SEM_TUTOR</span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Left Context Panel */}
                  <div className="w-1/3 border-r border-[#2A2A2A] bg-[#0A0A0A] p-4 hidden sm:flex flex-col gap-4">
                    <div className="h-24 border border-[#2A2A2A] rounded bg-[#121212] p-3">
                      <span className="font-mono text-[9px] text-[#F08C00] uppercase block mb-2">Active Context</span>
                      <div className="font-mono text-[10px] text-[#8a8887] line-clamp-3">
                        Found 14 references to <span className="text-[#e5e2e1]">AuthMiddleware</span> across 3 core modules. High confidence in vector space.
                      </div>
                    </div>
                    {/* Mini Context Embeddings */}
                    <div className="flex-1 border border-[#2A2A2A] rounded bg-[#121212] relative overflow-hidden flex flex-col p-3 gap-2">
                      <span className="font-mono text-[9px] text-[#666] mb-1">Vector Similarities</span>
                      <div className="w-full h-2 bg-[#2A2A2A] rounded overflow-hidden">
                        <div className="h-full bg-[#F08C00] w-[92%]"></div>
                      </div>
                      <div className="w-full h-2 bg-[#2A2A2A] rounded overflow-hidden">
                        <div className="h-full bg-[#F08C00]/70 w-[78%]"></div>
                      </div>
                      <div className="w-full h-2 bg-[#2A2A2A] rounded overflow-hidden">
                        <div className="h-full bg-[#F08C00]/40 w-[45%]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="flex-1 flex flex-col bg-[#121212]">
                    <div className="flex-1 p-4 space-y-4 overflow-hidden">
                      {/* User Bubble */}
                      <div className="flex justify-end">
                        <div className="bg-[#2A2A2A] text-[#e5e2e1] font-sans text-xs p-3 rounded-lg max-w-[80%] border border-[#333]">
                          How does the authentication flow handle expired tokens?
                        </div>
                      </div>
                      {/* AI Bubble */}
                      <div className="flex justify-start">
                        <div className="bg-[#1A1A1A] text-[#c8c6c5] font-sans text-xs p-3 rounded-lg max-w-[90%] border border-[#F08C00]/30 shadow-[0_0_10px_rgba(240,140,0,0.05)]">
                          <p className="mb-2">The token verification intercepts requests in <span className="font-mono text-[#F08C00]">middleware.ts</span>.</p>
                          <div className="bg-[#0A0A0A] border border-[#2A2A2A] p-2 rounded font-mono text-[10px] text-[#8a8887]">
                            <span className="text-[#D47A00]">if</span> (token.isExpired()) {"{"}<br />
                            &nbsp;&nbsp;<span className="text-[#D47A00]">return</span> reauthenticate(req);<br />
                            {"}"}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Input box */}
                    <div className="h-12 border-t border-[#2A2A2A] bg-[#0A0A0A] flex items-center px-4 gap-3 shrink-0">
                      <span className="material-symbols-outlined text-[#F08C00] text-[16px]">chevron_right</span>
                      <div className="flex-1 h-1 bg-[#2A2A2A] rounded overflow-hidden">
                        <div className="w-1/3 h-full bg-[#F08C00] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Clean, Well-Spaced Footer */}
      <footer className="bg-[#080808] border-t border-[#2A2A2A]/40 pt-20 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#f08c00] p-1.5 rounded-md amber-gradient">
                  <span className="material-symbols-outlined text-[16px] text-[#3A1D00]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
                </div>
                <span className="font-serif text-xl font-bold text-[#e5e2e1]">SemanticTutor</span>
              </div>
              <p className="font-sans text-sm text-[#8a8887] leading-relaxed max-w-xs">
                The master workshop for high-output engineering teams. Understand any architecture instantly.
              </p>
            </div>

            <div className="grid grid-cols-2 md:col-span-3 gap-8 md:ml-auto md:w-2/3">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[11px] text-[#e5e2e1] font-semibold uppercase tracking-widest mb-2">Product</span>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">Documentation</Link>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">Integrations</Link>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">Enterprise</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[11px] text-[#e5e2e1] font-semibold uppercase tracking-widest mb-2">Company</span>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">Privacy Policy</Link>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">Terms of Service</Link>
                <Link className="font-sans text-sm text-[#8a8887] hover:text-[#F08C00] transition-colors" href="#">System Status</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full pt-8 gap-6 border-t border-[#2A2A2A]">
            <span className="font-mono text-[10px] text-[#666] tracking-widest uppercase">
              © 2024 SemanticTutor. Engineered for Precision.
            </span>
            <div className="flex gap-6">
              <Link className="text-[#666] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined text-[20px]">public</span></Link>
              <Link className="text-[#666] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined text-[20px]">code</span></Link>
              <Link className="text-[#666] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined text-[20px]">alternate_email</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}