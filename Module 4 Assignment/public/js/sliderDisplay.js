import MovieAPI from "./movieAPI.js";

class SliderDisplay {
  constructor() {
    // Initialize core properties
    this.initializeElements();
    this.loadFeaturedMovies();
    this.currentSlideIndex = 0;
    this.autoSlideInterval = null; // Tracks auto-sliding interval
    this.isAutoPlaying = true; // Controls auto-sliding state

    // Set up description visibility listeners after initialization
    this.setupDescriptionListeners();
  }

  initializeElements() {
    // Get main slider elements from DOM
    this.slider = document.querySelector(".slider");
    this.sliderNav = document.querySelector(".slider-nav");
  }

  async loadFeaturedMovies() {
    try {
      // Fetch movies and select first three for the slider
      const movies = await MovieAPI.getPopularMovies();
      const featuredMovies = movies.slice(0, 3);
      this.displaySliderMovies(featuredMovies);
    } catch (error) {
      console.error("Error loading featured movies:", error);
    }
  }

  displaySliderMovies(movies) {
    if (!this.slider || !this.sliderNav) return;

    // Clear existing content
    this.slider.innerHTML = "";
    this.sliderNav.innerHTML = "";
    this.totalSlides = movies.length;

    movies.forEach((movie, index) => {
      // Create the slide with movie information
      const slide = `
        <div class="slide-item" data-slide="${index}">
          <img
            src="${movie.imageUrl}"
            alt="${movie.title}"
            onerror="this.src='./images/placeholder.jpg'"
          />
          <div class="slide-description">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
          </div>
        </div>
      `;

      // Create navigation dot for the slide
      const navDot = `<button class="slider-dot" data-slide="${index}"></button>`;

      // Add elements to the DOM
      this.slider.insertAdjacentHTML("beforeend", slide);
      this.sliderNav.insertAdjacentHTML("beforeend", navDot);
    });

    // Activate first slide
    const firstDot = this.sliderNav.querySelector(".slider-dot");
    if (firstDot) {
      firstDot.classList.add("active");
    }

    // Initialize navigation and auto-sliding
    this.setupNavigation();
    this.startAutoSlide();
    // Set up description visibility handling
    this.setupDescriptionListeners();
  }

  setupDescriptionListeners() {
    // Get all slides and navigation
    const slideItems = document.querySelectorAll(".slide-item");
    const sliderNav = document.querySelector(".slider-nav");

    if (!slideItems.length || !sliderNav) return;

    // Add hover listeners to each slide
    slideItems.forEach((slide) => {
      // Handle mouse enter - show description, hide nav
      slide.addEventListener("mouseenter", () => {
        sliderNav.classList.add("fade-out");
        this.pauseAutoSlide();
      });

      // Handle mouse leave - hide description, show nav
      slide.addEventListener("mouseleave", () => {
        sliderNav.classList.remove("fade-out");
        this.resumeAutoSlide();
      });
    });
  }

  goToSlide(slideIndex) {
    const navDots = this.sliderNav.querySelectorAll(".slider-dot");

    // Update navigation dots
    navDots.forEach((d) => d.classList.remove("active"));
    navDots[slideIndex].classList.add("active");

    // Scroll to the selected slide
    const scrollPosition = this.slider.clientWidth * slideIndex;
    this.slider.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  setupNavigation() {
    const navDots = this.sliderNav.querySelectorAll(".slider-dot");

    // Add click handlers to navigation dots
    navDots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        this.resetAutoSlide();

        // Update current slide index and navigate
        const slideIndex = parseInt(dot.dataset.slide);
        this.currentSlideIndex = slideIndex;
        this.goToSlide(slideIndex);
      });
    });

    // Add hover pause functionality
    this.slider.addEventListener("mouseenter", () => {
      this.pauseAutoSlide();
    });

    this.slider.addEventListener("mouseleave", () => {
      this.resumeAutoSlide();
    });
  }

  startAutoSlide() {
    // Clear any existing interval
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }

    // Start new auto-sliding interval
    this.autoSlideInterval = setInterval(() => {
      if (this.isAutoPlaying) {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.totalSlides;
        this.goToSlide(this.currentSlideIndex);
      }
    }, 5000); // Slide changes every 5 seconds
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }

  pauseAutoSlide() {
    this.isAutoPlaying = false;
  }

  resumeAutoSlide() {
    this.isAutoPlaying = true;
  }
}

// Initialize the slider when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SliderDisplay();
});
