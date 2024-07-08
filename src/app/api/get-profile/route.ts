import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "session_id is required" }, { status: 400 });
    }

    const url = `https://api.themoviedb.org/3/account?api_key=${env.API_KEY}&session_id=${sessionId}`;
    const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
            Authorization: `Bearer ${env.API_KEY}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}