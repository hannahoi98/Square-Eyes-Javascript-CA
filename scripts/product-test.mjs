document.addEventListener('DOMContentLoaded', () => {
  const API_BASE_URL = "https://api.noroff.dev/api/v1/square-eyes";

  // Function to parse URL and extract query parameters
  function parseUrlParams(url) {
      const params = {};
      const urlParts = url.split('?');
      if (urlParts.length > 1) {
          const queryString = urlParts[1];
          const keyValuePairs = queryString.split('&');
          keyValuePairs.forEach(pair => {
              const [key, value] = pair.split('=');
              params[key] = value;
          });
      }
      return params;
  }

  // Function to get product details by ID
  async function getProductDetails(productId) {
      try {
          const response = await fetch(`${API_BASE_URL}/${productId}`);
          const product = await response.json();
          return product;
      } catch (error) {
          console.error(error);
      }
  }

  // Function to display product details on the page
  async function displayProductDetails() {
      const urlParams = parseUrlParams(window.location.href);
      const productId = urlParams.id;

      if (productId) {
          const product = await getProductDetails(productId);
          if (product) {
              // Create elements to display product details
              const productDetailsContainer = document.getElementById('product-details-container');

              // Create main div for product details
              const productDiv = document.createElement('div');
              productDiv.classList.add('product-details');
              productDetailsContainer.appendChild(productDiv);

              // Create div for image
              const imgDiv = document.createElement('div');
              imgDiv.classList.add('img-single-movie');
              productDiv.appendChild(imgDiv);

              const img = document.createElement('img');
              img.src = product.image;
              img.alt = product.title;
              imgDiv.appendChild(img);

              // Create div for other details
              const detailsDiv = document.createElement('div');
              detailsDiv.classList.add('details-single-movie');
              productDiv.appendChild(detailsDiv);

              const title = document.createElement('h2');
              title.textContent = product.title;
              detailsDiv.appendChild(title);

              const genre = document.createElement('p');
              genre.textContent = `Genre: ${product.genre}`;
              detailsDiv.appendChild(genre);

              const rating = document.createElement('p');
              rating.textContent = `Rating: ${product.rating}`;
              detailsDiv.appendChild(rating);

              const released = document.createElement('p');
              released.textContent = `Released: ${product.released}`;
              detailsDiv.appendChild(released);

              const description = document.createElement('p');
              description.textContent = `Description: ${product.description}`;
              detailsDiv.appendChild(description);

              const price = document.createElement('p');
              price.textContent = `Price: ${product.price}`;
              detailsDiv.appendChild(price);

          } else {
              console.error('Product not found');
          }
      } else {
          console.error('Product ID not provided');
      }
  }

  displayProductDetails();

  // Function to handle adding a product to the cart
  function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Function to handle "Add to Cart" button click
  async function handleAddToCartClick() {
    const urlParams = parseUrlParams(window.location.href);
    const productId = urlParams.id;

    if (productId) {
        try {
            const product = await getProductDetails(productId);
            addToCart(product);
            alert('Product added to cart!');
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('Product ID not provided');
    }
}

  // Add event listener to "Add to Cart" button
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  addToCartBtn.addEventListener('click', handleAddToCartClick);
});