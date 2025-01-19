const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemon = require("nodemon");

const app = express();

// Configure Handlebars
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main", // this looks for a template called "main" in the /views/layouts folder
    extname: ".hbs", // We're specifying the file extension as '.hbs' for brevity
    helpers: {
      format_number: function (number) {
        return Number(number).toFixed(1);
      },
    },
  })
);

app.set("view engine", "hbs");

// Set the views directory explicitly
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static("public"));

// Sample data (in a real app, this would come from a database)
const movieData = {
  welcomeMessage: "Welcome to our Movies App",
  featuredHeader: "Featured Movies",
  popularMoviesHeader: "Popular Movies",
  featuredMovies: [
    {
      imageUrl: "/images/featuredmovie.jpg",
      title: "Featured Movie 1",
      description: "Brief description of Movie 1.",
    },
    {
      imageUrl: "/images/apeVS.jpg",
      title: "Featured Movie 2",
      description: "Brief description of Movie 2.",
    },
    {
      imageUrl: "/images/godzilla.jpg",
      title: "Featured Movie 3",
      description: "Brief description of Movie 3.",
    },
  ],
  popularMovies: [
    {
      imageUrl: "/images/kingdomofapes.jpg",
      title: "Kingdom of Apes",
      description: "Brief description of Movie 4",
      rating: "9.0",
    },
    {
      imageUrl: "/images/godzillaxkong.jpg",
      title: "Godzilla x Kong",
      description: "Brief description of Movie 4",
      rating: "9.0",
    },
    {
      imageUrl: "/images/apeVS.jpg",
      title: "Apes VS",
      description: "Brief description of Movie 4",
      rating: "9.0",
    },
    {
      imageUrl: "/images/godzilla.jpg",
      title: "Godzilla",
      description: "Brief description of Movie 5",
      rating: "9.0",
    },
  ],
};

const apiKey = "d90131dd4d856ea96960682bf2e660e0";

// Function to fetch movies from the API
async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

// Routes
app.get("/", (req, res) => {
  res.render("home", movieData);
});

// New route for the movies page
app.get("/movies", async (req, res) => {
  try {
    const movies = await fetchMovies();
    // Render the movies page with our fetched data
    res.render("movies", {
      pageTitle: "Popular Movies",
      movies: movies,
    });
  } catch (error) {
    console.error("Error rendering movies page:", error);
    res.status(500).send("Error loading movies");
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
