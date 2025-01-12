'use client'
import { useState } from 'react'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
}

const genreMap: Record<string, number> = {
  action: 28,
  adventure: 12,
  comedy: 35,
  drama: 18,
  horror: 27,
  romance: 10749,
  thriller: 53,
}

async function fetchMoviesByGenre(genreId: number): Promise<Movie[]> {
  const apiKey = 'da67a1b04bffccc7b806017e6fd1127d'
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  const data = await response.json()
  return data.results.sort(() => 0.5 - Math.random()).slice(0, 5)
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]) // Define the type of movies as Movie[]
  const [genre, setGenre] = useState<string>('')

  const handleFetchMovies = async () => {
    const genreId = genreMap[genre.toLowerCase()]
    if (!genreId) {
      alert('Invalid genre. Try Action, Comedy, Drama, etc.')
      return
    }
    try {
      const movies = await fetchMoviesByGenre(genreId)
      setMovies(movies)
    }
    catch (error) {
      console.error(error)
      alert('Failed to fetch movies.')
    }
  }

  return (
    <div className="min-h-screen bg-customBg text-white">
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to WHIRLREEL</h1>
        <p className="text-lg text-center mb-10">Discover movies by genre!</p>

        {/* Genre Input Section */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter a genre (e.g., Comedy)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-2 rounded-md text-black"
          />
          <button
            type="button" // Add the type attribute
            onClick={handleFetchMovies}
            className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Search
          </button>
          {/* Genre Buttons */}
        </div>
        <div className="flex justify-center mb-8">
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(28).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Action
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(12).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Adventure
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(35).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Comedy
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(18).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Drama
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(27).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Horror
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(10749).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Romance
          </button>
          <button
            type="button" // Add the type attribute
            onClick={() => { fetchMoviesByGenre(53).then(setMovies) }}
            className="ml-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
          >
            Thriller
          </button>
        </div>

        {/* Movies Display Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.overview.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
