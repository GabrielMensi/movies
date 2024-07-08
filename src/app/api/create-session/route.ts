import { NextResponse } from "next/server";
import { env } from "@/config/env";

export async function POST(request: Request) {
    const { requestToken } = await request.json();

    const response = await fetch(
        "https://api.themoviedb.org/3/authentication/session/new",
        {
            cache: "no-store",
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${env.API_KEY}`,
            },
            body: JSON.stringify({ request_token: requestToken }),
        },
    );

    const data = await response.json();
    return NextResponse.json(data);
}
