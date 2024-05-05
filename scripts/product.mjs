// Javascript file for product/index.html page
// Adding the DOMContent Loaded event listener so the HTML can load first
document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://api.noroff.dev/api/v1/square-eyes";
  
  // Function to parse URL and extract query parameters to display movie info from the API
  function parseUrlParams(url) {
    const params = {};
    const urlParts = url.split("?");
    if (urlParts.length > 1) {
      const queryString = urlParts[1];
      const keyValuePairs = queryString.split("&");
      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[key] = value;
      });
    }
    return params;
  }
  
  // Function to get movie details by the ID from the API
  async function getMovieDetails(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/${movieId}`);
      const movie = await response.json();
      return movie;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to display movie details on the page
  async function displayMovieDetails() {
    const urlParams = parseUrlParams(window.location.href);
    const movieId = urlParams.id;
  
    if (movieId) {
      const loader = document.getElementById("loader");
      loader.style.display = "block"; 

      const movie = await getMovieDetails(movieId);
        if (movie) {
          // Create elements to display the movie details
          const movieDetailsContainer = document.getElementById("movie-details-container");
  
          // Creating a main div for the movie details
          const movieDiv = document.createElement("div");
          movieDiv.classList.add("movie-details");
          movieDetailsContainer.appendChild(movieDiv);
  
          // Create div for image so it can be placed to the left with CSS
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("img-single-movie");
          movieDiv.appendChild(imgDiv);
  
          const img = document.createElement("img");
          img.src = movie.image;
          img.alt = movie.title;
          imgDiv.appendChild(img);
  
          // Create div for other details so it can be placed to the right with CSS 
          const detailsDiv = document.createElement("div");
          detailsDiv.classList.add("details-single-movie");
          movieDiv.appendChild(detailsDiv);
  
          const title = document.createElement("h2");
          title.textContent = movie.title;
          detailsDiv.appendChild(title);
  
          const genre = document.createElement("p");
          genre.textContent = `Genre: ${movie.genre}`;
          detailsDiv.appendChild(genre);
  
          const rating = document.createElement("p");
          rating.textContent = `Rating: ${movie.rating}`;
          detailsDiv.appendChild(rating);
  
          const released = document.createElement("p");
          released.textContent = `Released: ${movie.released}`;
          detailsDiv.appendChild(released);
  
          const description = document.createElement("p");
          description.textContent = `Description: ${movie.description}`;
          detailsDiv.appendChild(description);
  
          const price = document.createElement("p");
          price.textContent = `Price: $${movie.price}`;
          detailsDiv.appendChild(price);
                
          const addToCartBtn = document.createElement("button");
          addToCartBtn.textContent = "Add to Cart";
          addToCartBtn.id = "add-to-cart-button";
          addToCartBtn.addEventListener("click", handleAddToCartClick);
          detailsDiv.appendChild(addToCartBtn);
  
        } else {
          alert("Movie not found");
          console.error("Movie not found");
        }
        loader.style.display = "none";
      } else {
        alert("Movie ID not provided");
        console.error("Movie ID not provided");
      }
  }
  
  displayMovieDetails();
  
  // Function to handle adding a movie to the cart
  function addToCart(movie) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(movie);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Function to handle the "add to cart"
  function handleAddToCartClick() {
    const urlParams = parseUrlParams(window.location.href);
    const movieId = urlParams.id;
  
    if (movieId) {
      getMovieDetails(movieId).then(movie => {
        addToCart(movie);
        alert("Movie added to cart!");
      }).catch(error => {
          console.error(error);
        });
      } else {
        alert("Movie ID not provided");
        console.error("Movie ID not provided");
      }
  }
});