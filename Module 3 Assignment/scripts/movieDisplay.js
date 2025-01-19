import MovieAPI from "./movieAPI.js";

class MovieDisplay {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.loadMovies();
  }

  initializeElements() {
    this.movieContainer = document.querySelector(".movie-container");
    this.searchInput = document.querySelector('input[type="text"]');
  }

  setupEventListeners() {
    // Add debounce to prevent too many API calls while typing
    let timeout;
    this.searchInput?.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 500);
    });
  }

  async loadMovies() {
    const movies = await MovieAPI.getPopularMovies();
    this.displayMovies(movies);
  }

  async handleSearch(query) {
    if (query.trim() === "") {
      this.loadMovies();
      return;
    }

    const movies = await MovieAPI.searchMovies(query);
    this.displayMovies(movies);
  }

  displayMovies(movies) {
    if (!this.movieContainer) return;

    this.movieContainer.innerHTML = movies
      .map(
        (movie) => `
            <div class="movie-card" data-movie-id="${movie.id}">
                <img src="${movie.imageUrl || "./images/placeholder.jpg"}" 
                     alt="${movie.title}" 
                     onerror="this.src='./images/placeholder.jpg'">
                <div class="slide-description">
                    <h3>Overview</h3>
                    <p>${movie.description || "No description available."}</p>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="rating">${movie.rating.toFixed(1)}</span>
                </div>
            </div>
        `
      )
      .join("");

    // Add click event listeners for movie details
    this.movieContainer.querySelectorAll(".movie-card").forEach((card) => {
      card.addEventListener("click", () => {
        this.showMovieDetails(card.dataset.movieId);
      });
    });
  }

  async showMovieDetails(movieId) {
    const movie = await MovieAPI.getMovieDetails(movieId);
    if (!movie) return;
  }
}

// Initialize the display when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MovieDisplay();
});
