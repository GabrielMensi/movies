import { env } from "@/config/env";

type PathType = `/${string}`;

export async function getData(path: PathType) {
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

export async function generateDynamicSegment(path: PathType) {
    const data = await getData(path);

    const id = data.results.slice(0, 5).map((segment: any) => {
        return { id: segment.id.toString() };
    });

    return id;
}
