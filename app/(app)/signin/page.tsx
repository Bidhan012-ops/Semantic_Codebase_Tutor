"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { loginSchema } from "@/schema/loginSchema";

const LoginPage = () => {
    const router = useRouter();
    const [isChecking, setIsChecking] = React.useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            setIsChecking(true);
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (!response?.error) {
                toast.success("Signin successful", { position: "top-center" });
                router.replace("/landing");
            } else {
                toast.error("Signin failed. Check your credentials.", { position: "top-center" });
            }
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > -100 && x < rect.width + 100 && y > -100 && y < rect.height + 100) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 50;
                const rotateY = (centerX - x) / 50;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-[#e5e2e1] font-sans selection:bg-[#f08c00]/30 selection:text-white">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Source+Serif+4:opsz,wght@8..144,400;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

                .font-serif { font-family: 'Source Serif 4', serif; }
                .font-mono { font-family: 'JetBrains Mono', monospace; }
                
                .industrial-card {
                    background-color: #1A1A1A;
                    border: 1px solid #2A2A2A;
                    box-shadow: 0 4px 24px -2px rgba(0,0,0,0.5);
                    position: relative;
                }
                .industrial-card::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
                }
                .input-recessed {
                    background-color: #080808;
                    border: 1px solid #2A2A2A;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .input-recessed:focus {
                    border-color: #F08C00;
                    outline: none;
                    box-shadow: 0 0 0 1px rgba(240, 140, 0, 0.2);
                }
                .btn-machined {
                    background: linear-gradient(180deg, #F08C00 0%, #D47A00 100%);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    position: relative;
                }
                .btn-machined:active {
                    transform: translateY(1px);
                    background: linear-gradient(180deg, #D47A00 0%, #B86A00 100%);
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    vertical-align: middle;
                }
            `}} />
            
            <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f08c00]/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div ref={cardRef} className="industrial-card w-full max-w-[440px] p-10 rounded-lg z-10 transition-transform duration-200 ease-out" style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}>
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="bg-[#f08c00] w-12 h-12 flex items-center justify-center rounded-lg shadow-lg mb-6 btn-machined">
                            <span className="font-serif text-[#593000] text-2xl font-bold">/</span>
                        </div>
                        <h1 className="font-serif text-2xl text-[#e5e2e1] mb-2 font-bold">Login to your Workspace</h1>
                        <p className="font-mono text-xs text-[#b7b5b4] opacity-80 uppercase tracking-widest">Access your engineering environment</p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-mono text-xs text-[#b7b5b4] flex items-center gap-2 uppercase tracking-widest" htmlFor="email">
                                <span className="material-symbols-outlined text-[14px]">alternate_email</span>
                                SYSTEM.USER_EMAIL
                            </label>
                            <Controller
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="engineer@semantictutor.io"
                                            className="input-recessed w-full px-4 py-3 font-mono text-sm text-[#e5e2e1] rounded-lg"
                                        />
                                        {fieldState.invalid && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error?.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="font-mono text-xs text-[#b7b5b4] flex items-center gap-2 uppercase tracking-widest" htmlFor="password">
                                    <span className="material-symbols-outlined text-[14px]">lock</span>
                                    SYSTEM.AUTH_SECRET
                                </label>
                            </div>
                            <Controller
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="••••••••••••"
                                            className="input-recessed w-full px-4 py-3 font-mono text-sm text-[#e5e2e1] rounded-lg"
                                        />
                                        {fieldState.invalid && (
                                            <p className="text-red-500 text-xs mt-1">{fieldState.error?.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isChecking}
                            className="btn-machined w-full py-4 px-6 rounded-lg font-mono text-xs font-bold text-[#593000] mt-8 hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50"
                        >
                            {isChecking ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> AUTHENTICATING...</>
                            ) : (
                                <>Sign In <span className="material-symbols-outlined">arrow_forward</span></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#2A2A2A] text-center">
                        <p className="font-mono text-xs text-[#b7b5b4] uppercase tracking-widest">
                            Don't have an account? 
                            <Link href="/signup" className="text-[#F08C00] font-bold hover:underline ml-2">Request Access</Link>
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block absolute bottom-6 right-8 font-mono text-[10px] text-[#474746] space-y-1 opacity-40 select-none tracking-widest">
                    <div>COORD: 40.7128° N, 74.0060° W</div>
                    <div>STATUS: SECURE_CHANNEL_READY</div>
                    <div>ENC: AES-256-GCM</div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;