"use client";

import React, { useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { varifySchema } from "@/schema/varifySchema";
import { ApiResponse } from "@/types/Apiresponce";

const Page = () => {
    const params = useParams<{ email: string }>();
    const email = decodeURIComponent(params.email || "");
    const router = useRouter();

    const [errorMessage, setErrorMessage] = React.useState("");
    const [verifying, setVerifying] = React.useState(false);

    const form = useForm<z.infer<typeof varifySchema>>({
        resolver: zodResolver(varifySchema),
        defaultValues: {
            varifyCode: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof varifySchema>) => {
        try {
            setVerifying(true);
            setErrorMessage("");
            
            const response = await axios.post("/api/varifycode", {
                email,
                varifyCode: data.varifyCode,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                router.replace("/signin");
            }
        } catch (error) {
            const err = error as AxiosError<ApiResponse>;
            const message = err.response?.data?.message ?? "Verification failed";
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setVerifying(false);
        }
    };

    const cardRef = useRef<HTMLDivElement>(null);

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
                const rotateX = (y - centerY) / 60;
                const rotateY = (centerX - x) / 60;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=JetBrains+Mono:wght@500&family=Geist:wght@400;600&display=swap');

                .verification-page {
                    background-color: #131313;
                    color: #e5e2e1;
                    -webkit-font-smoothing: antialiased;
                    overflow-x: hidden;
                    font-family: 'Geist', sans-serif;
                }
                
                .industrial-card {
                    background-color: #1A1A1A;
                    border: 1px solid #2A2A2A;
                    box-shadow: 0 4px 24px -2px rgba(0,0,0,0.5);
                    position: relative;
                    transition: transform 0.1s ease-out;
                }

                .industrial-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
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
                
                .btn-machined:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    vertical-align: middle;
                }
                
                .font-jetbrains {
                    font-family: 'JetBrains Mono', monospace;
                }
                .font-source {
                    font-family: 'Source Serif 4', serif;
                }
            `}</style>

            <div className="verification-page flex flex-col min-h-screen">
                <main className="flex-grow flex items-center justify-center px-[24px] py-[64px] relative">
                    
                    {/* Metadata (System Diagnostics) */}
                    <div className="fixed top-[32px] left-[32px] z-50 font-jetbrains text-[10px] leading-[1] tracking-[0.05em] font-medium text-[#dbc2ae]/40 space-y-1 opacity-60 pointer-events-none hidden md:block">
                        <div className="flex items-center gap-[8px]">
                            <span className="w-1.5 h-1.5 bg-[#ffb874] rounded-full animate-pulse"></span>
                            <span>SYSTEM.ACTIVE_SESSION: 0x8F22</span>
                        </div>
                        <div>COORD: 40.7128° N, 74.0060° W</div>
                        <div>LOAD_SEQ: SEMANTIC_CORE_V4.2</div>
                    </div>
                    
                    <div className="fixed top-[32px] right-[32px] z-50 font-jetbrains text-[10px] leading-[1] tracking-[0.05em] font-medium text-[#dbc2ae]/40 text-right space-y-1 opacity-60 pointer-events-none hidden md:block">
                        <div>ENCR_STDL: AES-256-GCM</div>
                        <div className="text-[#ffb874]/60">NODE_STAT: VERIFICATION_PENDING</div>
                        <div>LATENCY: 14ms</div>
                    </div>

                    {/* Verification Card */}
                    <div ref={cardRef} className="industrial-card w-full max-w-[440px] p-[40px] md:p-[64px] rounded-lg z-10" style={{ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}>
                        
                        {/* Branding Header */}
                        <div className="flex flex-col items-center text-center mb-[64px]">
                            <div className="bg-[#f08c00] w-12 h-12 flex items-center justify-center rounded-lg shadow-lg mb-[24px]">
                                <span className="material-symbols-outlined text-[#593000] text-2xl">shield_lock</span>
                            </div>
                            <h1 className="font-source text-[24px] leading-[1.3] font-semibold text-[#e5e2e1] mb-[8px]">Verify Your Account</h1>
                            <p className="text-[16px] leading-[1.5] font-normal text-[#474746] opacity-80">Please enter the verification code sent to your email.</p>
                        </div>

                        {/* Verification Form */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
                            
                            {/* Code Field */}
                            <div className="space-y-[8px]">
                                <div className="flex justify-between items-end">
                                    <label htmlFor="auth_code" className="font-jetbrains text-[12px] leading-[1] tracking-[0.05em] font-medium text-[#dbc2ae] flex items-center gap-[8px]">
                                        <span className="material-symbols-outlined text-[14px]">key</span>
                                        @ SYSTEM.AUTH_CODE
                                    </label>
                                    <span className="font-jetbrains text-[10px] text-[#dbc2ae]/40">6-DIGIT_SHA</span>
                                </div>
                                <input 
                                    id="auth_code"
                                    type="text"
                                    maxLength={6}
                                    placeholder="000000"
                                    className="input-recessed w-full px-[24px] py-[16px] font-jetbrains text-[12px] leading-[1] text-[#e5e2e1] rounded-lg text-center tracking-[0.75rem] text-xl placeholder:opacity-20"
                                    {...form.register("varifyCode")}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        form.setValue("varifyCode", e.target.value);
                                        // Clear error when typing
                                        if (errorMessage) setErrorMessage("");
                                    }}
                                />
                                {errorMessage && (
                                    <p className="text-sm text-[#ffb4ab] mt-2 text-center font-jetbrains">
                                        {errorMessage}
                                    </p>
                                )}
                                {form.formState.errors.varifyCode && (
                                    <p className="text-sm text-[#ffb4ab] mt-2 text-center font-jetbrains">
                                        {form.formState.errors.varifyCode.message}
                                    </p>
                                )}
                            </div>

                            {/* Action Button */}
                            <button 
                                type="submit"
                                disabled={verifying}
                                className="btn-machined w-full py-[16px] px-[24px] rounded-lg text-[16px] leading-[1.5] font-bold text-[#593000] mt-[16px] hover:brightness-110 transition-all flex items-center justify-center gap-[8px] uppercase tracking-widest"
                            >
                                {verifying ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        VERIFYING...
                                    </>
                                ) : (
                                    <>
                                        VERIFY
                                        <span className="material-symbols-outlined">bolt</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-[64px] pt-[40px] border-t border-[#554334] text-center space-y-[24px]">
                            <button className="font-jetbrains text-[12px] leading-[1] tracking-[0.05em] font-medium text-[#dbc2ae] hover:text-[#ffb874] transition-colors block w-full">
                                RESEND_REQUEST (60s)
                            </button>
                            <p className="text-[16px] leading-[1.5] font-normal text-[#dbc2ae]">
                                <Link href="/signin" className="hover:text-[#e5e2e1] transition-colors flex items-center justify-center gap-[8px]">
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    BACK_TO_LOGIN
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Decorative Engineering Elements */}
                    <div className="hidden lg:block absolute bottom-[24px] left-[24px] font-jetbrains text-[10px] leading-[1] tracking-[0.05em] font-medium text-[#474746] space-y-1 opacity-20 select-none">
                        <div>ST_AUTH_V2 // BLK_CHAIN_ENABLED</div>
                        <div>(c) 2024 SEMANTICTUTOR_CORE</div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;