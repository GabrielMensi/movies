import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(
        "https://api.themoviedb.org/3/authentication/token/new",
        {
            cache: "no-store",
            method: "GET",
            headers: {
                Authorization: `Bearer ${env.API_KEY}`,
                "Content-Type": "application/json",
            },
        },
    );

    const data = await response.json();
    return NextResponse.json(data);
}
