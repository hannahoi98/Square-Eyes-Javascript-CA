// Function to display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button"); 
    
    // Clear previous cart items
    cartContainer.innerHTML = "";

    // Display "Your cart is empty" message if cart is empty
    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        totalPriceElement.textContent = "Total: $0.00";
        checkoutButton.style.display = "none";
        return;
    } else {
        emptyCartMessage.style.display = "none";
        checkoutButton.style.display = "block";
    }

    // Display cart items
    let totalPrice = 0;
    cart.forEach(movie => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;
        cartItemDiv.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = movie.title;
        cartItemDiv.appendChild(title);

        const price = document.createElement("p");
        price.textContent = `$${movie.price}`;
        cartItemDiv.appendChild(price);

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.addEventListener("click", () => {
            removeFromCart(movie);
            displayCartItems();
        });
        cartItemDiv.appendChild(deleteBtn);

        cartContainer.appendChild(cartItemDiv);

        // Calculate total price
        totalPrice += parseFloat(movie.price);
    });


    // Display total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(movie) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== movie.id);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    
    // Add event listener to checkout button
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", () => {
        // Redirect to checkout confirmation page
        window.location.href = "./confirmation/index.html";
    });
});