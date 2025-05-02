import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: Request) {
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Only POST requests allowed" },
            { status: 405 }
        );
    }

    const { token } = await req.json();

    if (!token) {
        return NextResponse.json(
            { success: false, error: "Missing token" },
            { status: 400 }
        );
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    try {
        const response = await axios.post(verificationUrl);

        if (response.data.success) {
            return NextResponse.json(
                { message: "Success" },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json(
                { message: "Failed to verify" },
                {
                    status: 405,
                }
            );
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data);
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            {
                status: 500,
            }
        );
    }
}
