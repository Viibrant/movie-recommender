import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";

// Mock TMDB config before importing the API route to ensure controlled test conditions
mock.module("@/lib/tmdb", () => ({
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: "test_api_key", // Use a test key instead of reading from env
}));

import { GET } from "./route"; // Import AFTER mocking to apply the test config

beforeEach(() => {
    // Reapply API key mock in case a test modifies it
    mock.module("@/lib/tmdb", () => ({
        BASE_URL: "https://api.themoviedb.org/3",
        API_KEY: "test_api_key",
    }));

    // Default successful response when calling the TMDB API
    global.fetch = mock(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    results: [
                        { id: 1, title: "Movie 1", overview: "Overview 1", poster_path: "/path1.jpg" },
                        { id: 2, title: "Movie 2", overview: "Overview 2", poster_path: "/path2.jpg" },
                    ],
                }),
        })
    );
});

afterEach(() => {
    mock.restore(); // Reset all mocks to prevent test contamination
});

describe("GET /api/movies", () => {
    it("should return 400 if genre ID is missing", async () => {
        const req = new Request("http://localhost:3000/api/movies"); // No genre param
        const res = await GET(req);

        const json = await res.json();
        expect(res.status).toBe(400);
        expect(json.error).toBe("Missing genre ID");
    });

    it("should return 500 if API key is missing", async () => {
        // Simulate an environment where the API key is missing
        mock.module("@/lib/tmdb", () => ({
            BASE_URL: "https://api.themoviedb.org/3",
            API_KEY: "", // No API key
        }));

        const req = new Request("http://localhost:3000/api/movies?genre=28");
        const res = await GET(req);

        const json = await res.json();
        expect(res.status).toBe(500);
        expect(json.error).toBe("API key is missing");
    });

    it("should return 200 and a list of movies", async () => {
        // Normal API request should return a shuffled list of movies
        const req = new Request("http://localhost:3000/api/movies?genre=28");
        const res = await GET(req);

        const json = await res.json();
        expect(res.status).toBe(200);
        expect(Array.isArray(json)).toBe(true);
        expect(json.length).toBe(2);
        expect(json[0]).toHaveProperty("title");
    });

    it("should return 500 if the TMDB API request fails", async () => {
        // Force `fetch` to simulate a TMDB failure
        global.fetch = () => Promise.resolve({ ok: false, status: 500 }) as any;

        const req = new Request("http://localhost:3000/api/movies?genre=28");
        const res = await GET(req);

        const json = await res.json();
        expect(res.status).toBe(500);
        expect(json.error).toBe("Failed to fetch movies"); // Ensure the correct error is thrown
    });
});
