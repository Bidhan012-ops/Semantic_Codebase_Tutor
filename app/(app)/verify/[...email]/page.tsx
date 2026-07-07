"use client";

import React from "react";
import axios, { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { varifySchema } from "@/schema/varifySchema";
import { ApiResponse } from "@/types/Apiresponce";

const Page = () => {
    const params = useParams<{ email: string }>();

    const email = decodeURIComponent(params.email);

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

            const message =
                err.response?.data?.message ?? "Verification failed";

            setErrorMessage(message);

            toast.error(message);
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-red-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">

                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold">
                        Verify Your Account
                    </h1>

                    <p>
                        Please enter the verification code sent to your email.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FieldGroup>

                        <Controller
                            control={form.control}
                            name="varifyCode"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>

                                    <FieldLabel>
                                        Verification Code
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        placeholder="Enter your verification code"
                                    />

                                    {errorMessage && (
                                        <p className="text-sm text-red-500">
                                            {errorMessage}
                                        </p>
                                    )}

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}

                                </Field>
                            )}
                        />

                    </FieldGroup>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={verifying}
                    >
                        {verifying ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify"
                        )}
                    </Button>

                </form>

            </div>
        </div>
    );
};

export default Page;