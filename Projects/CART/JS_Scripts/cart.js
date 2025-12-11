document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    
    // 1. Get Cart from Storage
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    // 2. Handle Empty Cart
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-cart-x" style="font-size: 50px; color: #ccc;"></i>
                <p>Your cart is empty.</p>
                <a href="index.html" class="add-btn" style="text-decoration:none; display:inline-block; margin-top:10px;">Shop Now</a>
            </div>
        `;
        subtotalEl.innerText = "$0.00";
        totalEl.innerText = "$0.00";
        return;
    }

    // 3. Render Items
    cartItemsContainer.innerHTML = ""; // Clear existing
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-details">
                <h4>${item.title}</h4>
                <p class="item-price">$${item.price}</p>
                <div class="qty-controls">
                    <button onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="item-actions">
                <p class="item-total">$${itemTotal.toFixed(2)}</p>
                <i class="bi bi-trash" onclick="removeItem(${index})"></i>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // 4. Update Totals
    subtotalEl.innerText = `$${totalPrice.toFixed(2)}`;
    totalEl.innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to Remove Item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1); // Remove item at index
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart(); // Reload UI
}

// Function to Update Quantity
function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const item = cart.find(i => i.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1; // Prevent negative
    }
    
    localStorage.setItem('myCart', JSON.stringify(cart));
    loadCart();
}

// Function to Clear Cart
function clearCart() {
    if(confirm("Are you sure you want to remove all items?")) {
        localStorage.removeItem('myCart');
        loadCart();
    }
}