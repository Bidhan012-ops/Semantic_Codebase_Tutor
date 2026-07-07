import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ApiResponse } from "@/types/Apiresponce";

export async function POST(request: NextRequest) {
    try {
        const dbconnect = await db();
        const usersCollection = dbconnect.collection("users");

        const { email, varifyCode } = await request.json();
        console.log("The email is ", email);
        console.log("The varifyCode is ", varifyCode);
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "User is already verified.",
                },
                { status: 400 }
            );
        }

        const checkVerifyCode = user.verifyCode === varifyCode;
        const isCodeValid = new Date(user.verifyCodeExpire) > new Date();

        if (checkVerifyCode && isCodeValid) {
            await usersCollection.updateOne(
                { _id: user._id },
                {
                    $set: {
                        isVerified: true,
                    },
                }
            );

            return NextResponse.json<ApiResponse>(
                {
                    success: true,
                    message: "User verified successfully.",
                },
                { status: 200 }
            );
        }

        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Invalid or expired verification code.",
            },
            { status: 400 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Internal server error.",
            },
            { status: 500 }
        );
    }
}