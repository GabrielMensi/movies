import { env } from "@/config/env";

type path = `/${string}`

export async function getData(path: path) {
    const url = `${env.API_BASE_URL}${path}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${env.API_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export async function generateDynamicSegment(path: path) {
    const data = await getData(path);

    const id = data.results.slice(0, 5).map((data: any) => {
        return { id: data.id.toString() }
    });

    return id
}
