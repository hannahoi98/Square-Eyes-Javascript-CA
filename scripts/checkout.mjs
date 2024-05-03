// Function to display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear previous cart items
    cartContainer.innerHTML = '';

    // Display "Your cart is empty" message if cart is empty
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        totalPriceElement.textContent = 'Total: $0.00';
        return;
    } else {
        emptyCartMessage.style.display = 'none';
    }

    // Display cart items
    let totalPrice = 0;
    cart.forEach(product => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        cartItemDiv.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = product.title;
        cartItemDiv.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `$${product.discountedPrice}`;
        cartItemDiv.appendChild(price);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.addEventListener('click', () => {
            removeFromCart(product.id);
            displayCartItems();
        });
        cartItemDiv.appendChild(deleteBtn);

        cartContainer.appendChild(cartItemDiv);

        // Calculate total price
        totalPrice += parseFloat(product.discountedPrice);
    });

    // Display total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display cart items when the page loads
document.addEventListener('DOMContentLoaded', displayCartItems);