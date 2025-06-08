// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product Data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://via.placeholder.com/300x200?text=Headphones',
        description: 'Premium wireless headphones with noise cancellation'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
        description: 'Feature-rich smart watch with health tracking'
    },
    // Add more products as needed
];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartContainer = document.getElementById('cart-container');
const totalElement = document.getElementById('cart-total');

// Display Products
function displayProducts() {
    productContainer.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        alert('Product added to cart!');
    }
}

// Update Cart Display
function updateCart() {
    if (!cartContainer) return;
    
    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item d-flex justify-content-between align-items-center">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <div class="flex-grow-1 ms-3">
                <h6>${item.name}</h6>
                <p class="mb-0">$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="btn btn-danger btn-sm">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Initialize
if (productContainer) displayProducts();
if (cartContainer) updateCart();
