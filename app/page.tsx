"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);

  // Replaces the vanilla JS mousemove effect for the subtle radial gradient background
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(240, 140, 0, 0.03) 0%, transparent 50%), #0D0D0D`;
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#e5e2e1] font-sans selection:bg-[#f08c00]/30 selection:text-white">
      {/* Required Fonts & Custom Micro-Classes from your HTML */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Source+Serif+4:opsz,wght@8..144,400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

        .font-serif { font-family: 'Source Serif 4', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .amber-gradient { background: linear-gradient(180deg, #F08C00 0%, #D47A00 100%); box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2); }
        .industrial-border { border: 1px solid #2A2A2A; }
        .micro-shadow { box-shadow: 0 4px 20px -2px rgba(0,0,0,0.5); }
        .rim-light { border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
      `}} />

      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2A2A2A]/30">
        <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-[1440px] mx-auto h-20">
          <div className="flex items-center gap-4">
            <div className="bg-[#f08c00] p-2 rounded-lg flex items-center justify-center amber-gradient">
              <span className="material-symbols-outlined text-[#593000]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
            <span className="font-serif text-2xl font-bold text-[#e5e2e1]">SemanticTutor</span>
          </div>
          <div className="hidden md:flex items-center gap-16">
            <Link className="text-[#b7b5b4] hover:text-[#e5e2e1] transition-colors text-base" href="#features">Features</Link>
            <Link className="text-[#b7b5b4] hover:text-[#e5e2e1] transition-colors text-base" href="#architecture">Architecture</Link>
            <Link className="text-[#b7b5b4] hover:text-[#e5e2e1] transition-colors text-base" href="#">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#b7b5b4] hover:text-[#e5e2e1] transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-6 py-3 bg-[#f08c00] text-[#593000] font-mono text-xs uppercase tracking-widest amber-gradient rounded-lg transition-transform hover:-translate-y-[2px] active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(240, 140, 0, 0.03) 0%, transparent 50%), #0D0D0D" }}
        >
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#2A2A2A 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#f08c00]/20 bg-[#f08c00]/5 rounded-full mb-10">
              <span className="w-2 h-2 rounded-full bg-[#F08C00] animate-pulse"></span>
              <span className="font-mono text-xs font-medium text-[#F08C00] uppercase tracking-widest">Now powered by Gemini 1.5 Flash</span>
            </div>

            <h1 className="font-serif text-[64px] leading-tight md:text-[84px] text-[#e5e2e1] mb-6 font-bold">
              Master any codebase with<br />
              <span className="text-[#F08C00] font-extrabold italic">Semantic Intelligence.</span>
            </h1>

            <p className="text-lg text-[#b7b5b4] max-w-2xl mx-auto mb-16 leading-relaxed">
              Connect your repository and instantly chat with your architecture. Powered by advanced Vector Search, designed for senior engineers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="amber-gradient flex items-center justify-center gap-2 px-10 py-5 rounded-lg text-[#593000] font-mono text-xs uppercase tracking-widest transition-transform hover:-translate-y-[2px] active:scale-95 micro-shadow">
                <span>Connect Repository</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="#architecture" className="bg-[#1A1A1A] industrial-border flex items-center justify-center gap-2 px-10 py-5 rounded-lg text-[#e5e2e1] font-mono text-xs uppercase tracking-widest hover:bg-[#222222] transition-all hover:-translate-y-[2px] rim-light">
                <span className="material-symbols-outlined">account_tree</span>
                <span>View Architecture</span>
              </Link>
            </div>
          </div>

          {/* Dashboard Mockup/Visual */}
          <div className="mt-16 w-full max-w-[1200px] border border-[#2A2A2A]/30 rounded-xl overflow-hidden micro-shadow rim-light bg-[#1c1b1b] relative z-10 text-left">
            <div className="h-10 border-b border-[#2A2A2A]/30 flex items-center px-4 gap-2 bg-[#1A1A1A]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb874]/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#c7c6c6]/60"></div>
              <div className="ml-4 font-mono text-xs text-[#b7b5b4] opacity-50">src/engine/semantic_layer.py</div>
            </div>
            <div className="p-10 bg-[#080808]">
              <pre className="font-mono text-sm leading-relaxed text-[#b7b5b4]/80 overflow-x-auto">
                <code>
                  <span className="text-[#F08C00]">class</span> <span className="text-[#c8c6c5]">SemanticEngine</span>:<br />
                  {"    "}<span className="text-[#F08C00]">async def</span> <span className="text-[#c8c6c5]">analyze_context</span>(self, query: str):<br />
                  {"        "}<span className="text-[#c7c6c6]"># Initializing vector search on architecture</span><br />
                  {"        "}embeddings = <span className="text-[#F08C00]">await</span> self.vector_store.similarity_search(query)<br />
                  {"        "}<span className="text-[#F08C00]">return</span> self.llm.generate(context=embeddings)
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Precision Engineering Section (Bento Grid) */}
        <section id="features" className="py-24 px-6 max-w-[1440px] mx-auto border-t border-[#2A2A2A]/20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold mb-3">Engineered for Precision</h2>
            <p className="text-base text-[#b7b5b4] max-w-xl mx-auto">We don't just search text. We understand the mathematical context of your code.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Feature Card */}
            <div className="md:col-span-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-10 flex flex-col justify-between micro-shadow rim-light">
              <div>
                <div className="bg-[#222222] w-12 h-12 rounded-lg flex items-center justify-center border border-[#2A2A2A]/50 mb-6">
                  <span className="material-symbols-outlined text-[#F08C00]">analytics</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Deep Structural Analysis</h3>
                <p className="text-base text-[#b7b5b4] max-w-md leading-relaxed">Our engine parses abstract syntax trees (AST) to build a relational map of your entire codebase, ensuring high-fidelity reasoning across complex module dependencies.</p>
              </div>
              <div className="mt-10 pt-10 border-t border-[#2A2A2A]/20 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-mono text-[#F08C00] text-xl font-bold mb-2">99.2%</div>
                  <div className="font-mono text-[#b7b5b4] text-[10px] uppercase tracking-widest">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[#F08C00] text-xl font-bold mb-2">&lt;200ms</div>
                  <div className="font-mono text-[#b7b5b4] text-[10px] uppercase tracking-widest">Latency</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[#F08C00] text-xl font-bold mb-2">5M+</div>
                  <div className="font-mono text-[#b7b5b4] text-[10px] uppercase tracking-widest">LoC Scanned</div>
                </div>
              </div>
            </div>

            {/* Side Feature Card */}
            <div className="md:col-span-4 bg-[#1c1b1b] border border-[#2A2A2A] rounded-xl p-10 flex flex-col micro-shadow rim-light">
              <div className="bg-[#222222] w-12 h-12 rounded-lg flex items-center justify-center border border-[#2A2A2A]/50 mb-6">
                <span className="material-symbols-outlined text-[#c8c6c5]">shield</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Industrial Security</h3>
              <p className="text-base text-[#b7b5b4] mb-6 leading-relaxed">Your code stays yours. SOC2 Type II compliant with end-to-end encryption for every query and data point.</p>
              <div className="mt-auto">
                <img
                  className="w-full h-32 object-cover rounded border border-[#2A2A2A]/30"
                  alt="A professional, high-tech security badge or encrypted data shield icon rendered in a sleek, dark industrial style with metallic textures and glowing amber accents."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG8gWlRA6dMytC-hO7DuV1VifXWe-8rRmc8NVlyzH2R9y-BIiBCKwuqwBwetl_UoNTgvNnOTQPwQIQDJW2baj1Y2DGiTj77TgYSDWhNzsR8Tel50O07WA7SuxQden5n9aZw_F5x-81FcPdsDr1pVyfFpVDvcuyPH4gGUL6evhut39DsiXHGegiJ4tkyZPjFVrHZyt18vQl2njizN3PkTan2xfvqIPJ7XoeHBnLQWfAmu4w9smaj8Q9"
                />
              </div>
            </div>

            {/* Bottom Row Cards */}
            <div className="md:col-span-4 bg-[#1c1b1b] border border-[#2A2A2A] rounded-xl p-10 micro-shadow rim-light">
              <span className="material-symbols-outlined text-[#F08C00] mb-4 text-3xl">cloud_sync</span>
              <h4 className="font-mono text-xs font-medium text-[#e5e2e1] mb-3 uppercase tracking-widest">Live Sync</h4>
              <p className="font-mono text-xs text-[#b7b5b4] leading-relaxed">Continuous updates as you push code. The knowledge base evolves with your repository in real-time.</p>
            </div>

            <div className="md:col-span-4 bg-[#1c1b1b] border border-[#2A2A2A] rounded-xl p-10 micro-shadow rim-light">
              <span className="material-symbols-outlined text-[#F08C00] mb-4 text-3xl">groups</span>
              <h4 className="font-mono text-xs font-medium text-[#e5e2e1] mb-3 uppercase tracking-widest">Team Context</h4>
              <p className="font-mono text-xs text-[#b7b5b4] leading-relaxed">Shared insights allow new hires to onboard 4x faster by querying the existing knowledge graph.</p>
            </div>

            <div className="md:col-span-4 bg-[#1c1b1b] border border-[#2A2A2A] rounded-xl p-10 micro-shadow rim-light">
              <span className="material-symbols-outlined text-[#F08C00] mb-4 text-3xl">terminal</span>
              <h4 className="font-mono text-xs font-medium text-[#e5e2e1] mb-3 uppercase tracking-widest">CLI Ready</h4>
              <p className="font-mono text-xs text-[#b7b5b4] leading-relaxed">Integrated with your favorite terminals. Query your code without ever leaving the dev environment.</p>
            </div>
          </div>
        </section>

        {/* Contextual Visual Section */}
        <section id="architecture" className="py-24 relative border-t border-[#2A2A2A]/20">
          <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">The Architectural Brain of Your Workflow</h2>
              <div className="space-y-8">

                {/* Updated Item 01 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#ffb874]/40 flex items-center justify-center font-mono text-xs text-[#F08C00]">01</div>
                  <div>
                    <h5 className="text-base font-bold text-[#e5e2e1] mb-2">Semantic Code Chat</h5>
                    <p className="text-base text-[#b7b5b4] leading-relaxed">Stop manually grepping through thousands of files. Ask complex questions in plain English and get precise explanations backed by exact code snippets.</p>
                  </div>
                </div>

                {/* Updated Item 02 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#ffb874]/40 flex items-center justify-center font-mono text-xs text-[#F08C00]">02</div>
                  <div>
                    <h5 className="text-base font-bold text-[#e5e2e1] mb-2">Dynamic Intent Routing</h5>
                    <p className="text-base text-[#b7b5b4] leading-relaxed">The engine intelligently adapts to your scope. Ask about the "whole project" for a high-level summary, or query a specific function for localized vector retrieval.</p>
                  </div>
                </div>

              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F08C00]/20 to-[#c8c6c5]/20 rounded-xl blur opacity-25 transition duration-1000 group-hover:opacity-50"></div>
              <div className="relative bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-1 micro-shadow">
                <img
                  className="rounded-lg w-full"
                  alt="A sophisticated digital visualization of a complex neural network merging with a 3D architectural blueprint of software code, rendered in deep charcoals and glowing amber lines."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmhTj3zEzAbFbVYhhUfTaK0U9rAGpPn1MAXQ6S3L_JP4bFiZyMQu8fWUeA_BsguAnWZQYmohVZezv6FCwW5RALIFEhLJa8nJa_aszz10CbvZaVjtZgbUqBxsnT59L-1I20q729RFLNkintKObGy5b5eTzq1fLGCHzi-aqW0iuhp4BjhernATPcD-LgcvUm-DPPv2-r6jVVjd6U1USiLYDhyiyLt_GgH0LQWMFiZDYCpdOm9SOBE4O2"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-[#2A2A2A]/20 pt-16 pb-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#f08c00] p-1.5 rounded-sm amber-gradient">
                  <span className="material-symbols-outlined text-[16px] text-[#593000]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                </div>
                <span className="font-serif text-lg font-bold text-[#e5e2e1]">SemanticTutor</span>
              </div>
              <p className="font-mono text-xs text-[#b7b5b4] leading-relaxed">The master workshop for high-output engineering teams.</p>
            </div>

            <div className="grid grid-cols-2 md:col-span-3 gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#e5e2e1] font-bold uppercase tracking-widest">Product</span>
                <Link className="font-mono text-xs text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Documentation</Link>
                <Link className="font-mono text-xs text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Integrations</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-[#e5e2e1] font-bold uppercase tracking-widest">Company</span>
                <Link className="font-mono text-xs text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Privacy Policy</Link>
                <Link className="font-mono text-xs text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Terms of Service</Link>
                <Link className="font-mono text-xs text-[#b7b5b4] hover:text-[#F08C00] transition-colors" href="#">Status</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full pt-6 gap-6 border-t border-[#2A2A2A]/10">
            <span className="font-mono text-[10px] text-[#393a3a] tracking-widest uppercase">© 2024 SemanticTutor. Precision Engineering for the AI Age.</span>
            <div className="flex gap-6">
              <Link className="text-[#393a3a] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
              <Link className="text-[#393a3a] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined">code</span></Link>
              <Link className="text-[#393a3a] hover:text-[#F08C00] transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}