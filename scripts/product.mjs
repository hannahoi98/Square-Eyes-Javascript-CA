// product.mjs
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
      // Display product details on the page
      document.getElementById('product-image').src = product.image;
      document.getElementById('product-title').textContent = product.title;
      document.getElementById('product-genre').textContent = `Genre: ${product.genre}`;
      document.getElementById('product-rating').textContent = `Rating: ${product.rating}`;
      document.getElementById('product-released').textContent = `Released: ${product.released}`;
      document.getElementById('product-description').textContent = `Description: ${product.description}`;
      document.getElementById('product-price').textContent = `Price: ${product.price}`;
      document.getElementById('product-discounted-price').textContent = `Discounted Price: ${product.discountedPrice}`;
    } else {
      console.error('Product not found');
    }
  } else {
    console.error('Product ID not provided');
  }
}

displayProductDetails();