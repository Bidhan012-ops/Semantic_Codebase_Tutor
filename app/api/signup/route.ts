import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendVarificationEmail } from "@/helper/sendvarificationemail";
import { ApiResponse } from "@/types/Apiresponce";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const dbconnect = await db();
        const usersCollection = dbconnect.collection("users");

        const { username, email, password } = await request.json();

        console.log("Signup data:", {
            username,
            email,
            password,
        });

        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const verifyCodeExpire = new Date(
            Date.now() + 10 * 60 * 1000
        );

        const existingUser = await usersCollection.findOne({
            $or: [
                { email },
                { username },
            ],
        });

        if (existingUser?.isVerified) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message:
                        "User with this email or username already exists.",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let savedUser;

        if (existingUser) {
            await usersCollection.updateOne(
                { _id: existingUser._id },
                {
                    $set: {
                        username,
                        email,
                        password: hashedPassword,
                        verifyCode,
                        verifyCodeExpire,
                        isVerified: false,
                    },
                }
            );

            savedUser = await usersCollection.findOne({
                _id: existingUser._id,
            });
        } else {
            const result = await usersCollection.insertOne({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpire,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            savedUser = await usersCollection.findOne({
                _id: result.insertedId,
            });
        }

        const emailResponse = await sendVarificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return NextResponse.json<ApiResponse>(
                {
                    success: false,
                    message: "Failed to send verification email.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json<ApiResponse>(
            {
                success: true,
                message: "User created successfully.",
                data: savedUser,
            },
            { status: 201 }
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