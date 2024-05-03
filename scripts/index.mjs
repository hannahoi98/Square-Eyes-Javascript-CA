document.addEventListener('DOMContentLoaded', () => {
  // This code will run when the DOM content is fully loaded
  displayMovies();
  addGenreButtonListeners();
});


// Fetching API
const API_BASE_URL = "https://api.noroff.dev/api/v1/square-eyes";

async function getData() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data") 
    }
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Failed to fetch data")
  } 
}

async function displayMovies(genre = "all") {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  
  try {
    loader.style.display = "block";
    const data = await getData();

    mainContent.innerHTML = "";

    data.forEach(movie => {
      if (genre === "all" || movie.genre === genre) {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
    
        const img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;
        movieDiv.appendChild(img);
    
        const title = document.createElement("h2");
        title.textContent = movie.title;
        movieDiv.appendChild(title);
    
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${movie.genre}`;
        movieDiv.appendChild(genre);
    
        const price = document.createElement("p");
        price.textContent = `Price: ${movie.price}`;
        movieDiv.appendChild(price);
    
        const button = document.createElement("button");
        button.textContent = "More Info";
        button.classList.add("movie-button");
    
        button.addEventListener("click", () => {
          window.location.href = `product/index.html?id=${movie.id}`;
        });
        movieDiv.appendChild(button);
        
        mainContent.appendChild(movieDiv); 
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = "none";
  } 
}

function addGenreButtonListeners() {
  const genreButtons = document.querySelectorAll(".genre-button");
  genreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedGenre = button.getAttribute("data-genre");
      // Remove active class from all buttons
      genreButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");
      // Display movies of the selected genre
      displayMovies(selectedGenre);
    });
  });
}




