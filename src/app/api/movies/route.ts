import { NextResponse } from "next/server";
import { BASE_URL, API_KEY } from "@/lib/tmdb";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const genreId = searchParams.get("genre");

    if (!genreId) {
        return NextResponse.json({ error: "Missing genre ID" }, { status: 400 });
    }

    if (!API_KEY) {
        return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    try {
        const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch movies" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data.results.sort(() => 0.5 - Math.random()).slice(0, 5));
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
