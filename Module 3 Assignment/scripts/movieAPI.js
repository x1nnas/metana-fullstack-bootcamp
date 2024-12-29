const API_KEY = "d90131dd4d856ea96960682bf2e660e0";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

class MovieAPI {
  // Fetch popular movies
  static async getPopularMovies() {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();

      // Transform the data to match our app's structure
      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average,
        imageUrl: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : null,
      }));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      return [];
    }
  }

  // Search for movies
  static async searchMovies(query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1`
      );
      const data = await response.json();

      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average,
        imageUrl: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : null,
      }));
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  }

  // Get movie details by ID
  static async getMovieDetails(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const movie = await response.json();

      return {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average,
        imageUrl: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : null,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        genres: movie.genres.map((genre) => genre.name),
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  }
}

export default MovieAPI;
