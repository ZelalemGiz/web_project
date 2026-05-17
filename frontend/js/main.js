// js/main.js

let menuItems = [];
let cart = [];

const fallbackMenu = [
    { id: 1, name: "Espresso", category: "coffee", price: 3.99, desc: "Strong & bold single shot", img: "images/hhh.png" },
    { id: 2, name: "Cappuccino", category: "coffee", price: 4.49, desc: "Rich foam & perfect balance", img: "https://picsum.photos/id/133/300/200" },
    { id: 3, name: "Latte", category: "coffee", price: 4.99, desc: "Smooth & creamy", img: "https://picsum.photos/id/201/300/200" },
    { id: 4, name: "Ethiopian Pour Over", category: "coffee", price: 5.49, desc: "Single origin Yirgacheffe", img: "https://picsum.photos/id/1005/300/200" },
    { id: 5, name: "Green Tea", category: "tea", price: 3.29, desc: "Fresh & antioxidant rich", img: "https://picsum.photos/id/292/300/200" },
    { id: 6, name: "Chai Latte", category: "tea", price: 4.29, desc: "Spiced Indian favorite", img: "https://picsum.photos/id/870/300/200" },
    { id: 7, name: "Butter Croissant", category: "pastries", price: 2.99, desc: "Flaky & golden", img: "https://picsum.photos/id/312/300/200" },
    { id: 8, name: "Chocolate Muffin", category: "pastries", price: 3.49, desc: "Warm & gooey", img: "https://picsum.photos/id/431/300/200" },
    { id: 9, name: "Avocado Toast", category: "food", price: 6.99, desc: "Fresh & healthy", img: "https://picsum.photos/id/870/300/200" },
    { id: 10, name: "Bagel & Cream Cheese", category: "food", price: 4.99, desc: "Classic breakfast", img: "https://picsum.photos/id/1005/300/200" },
    { id: 11, name: "Sofi", category: "Soft Drinks", price: 4.99, desc: "Healthy Drinks", img: "images/photo.png" },
    { id: 12, name: "Sprite", category: "Soft Drinks", price: 4.99, desc: "for satisfaction", img: "images/phhot.png" }
];

async function loadMenuItems() {
    try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Menu API request failed');
        menuItems = await response.json();
    } catch (error) {
        console.warn('Unable to load backend menu, using fallback data.', error);
        menuItems = fallbackMenu;
    }
    renderMenu(menuItems);
}

// Render menu cards
function renderMenu(filteredItems) {
    const container = document.getElementById('menu-grid');
    container.innerHTML = '';

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="card-body">
                <h5>${item.name}</h5>
                <p>${item.desc}</p>
                <div class="card-footer">
                    <h5>$${item.price}</h5>
                    <button onclick="addToCart(${item.id})" class="add-btn">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter menu
function filterMenu() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';

    const filtered = menuItems.filter(item => {
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm) || 
            item.desc.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    renderMenu(filtered);
}

// Create category buttons
function createCategoryButtons() {
    const categories = [
        { name: "All", value: "all" },
        { name: "Coffee", value: "coffee" },
        { name: "Tea", value: "tea" },
        { name: "Pastries", value: "pastries" },
        { name: "Food", value: "food" },
        { name: "Soft Drinks", value: "Soft Drinks" }
    ];

    const container = document.getElementById('category-buttons');
    container.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${cat.value === 'all' ? 'active' : ''}`;
        btn.dataset.category = cat.value;
        btn.textContent = cat.name;
        btn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterMenu();
        };
        container.appendChild(btn);
    });
}

// ==================== ADD TO CART (FIXED) ====================
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const existing = cart.find(cartItem => cartItem.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();

    // Toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; bottom:30px; right:30px; 
        background:#8B4513; color:white; padding:16px 24px; 
        border-radius:12px; box-shadow:0 5px 20px rgba(0,0,0,0.3);
        z-index:3000; font-weight:600;
    `;
    toast.textContent = `${item.name} added!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

// Update entire cart UI
function updateCartUI() {
    const countBadge = document.getElementById('cart-count-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countBadge.textContent = totalItems;

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="">
            <div style="flex:1">
                <h6 style="margin-bottom:4px">${item.name}</h6>
                <small>$${item.price} × ${item.quantity}</small>
            </div>
            <div style="text-align:right">
                <strong>$${itemTotal.toFixed(2)}</strong>
                <div style="margin-top:12px">
                    <button onclick="changeQuantity(${index}, -1)" style="width:28px;height:28px;border:none;background:#eee;border-radius:50%;cursor:pointer">-</button>
                    <span style="margin:0 12px;font-weight:600">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)" style="width:28px;height:28px;border:none;background:#eee;border-radius:50%;cursor:pointer">+</button>
                    <button onclick="removeFromCart(${index})" style="margin-left:15px;color:#e74c3c;background:none;border:none;font-size:18px;cursor:pointer">🗑</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p style="text-align:center;color:#888;padding:60px 20px">Your cart is empty ☕<br><small>Start adding delicious items!</small></p>`;
    }

    const orderType = document.querySelector('input[name="order-type"]:checked')?.value || 'in-cafe';
    const deliveryFee = orderType === 'delivery' ? 2.50 : 0;
    const grandTotal = totalPrice + deliveryFee;

    document.getElementById('cart-total').textContent = `$${totalPrice.toFixed(2)}`;
    document.getElementById('delivery-cost').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('order-total').textContent = `$${grandTotal.toFixed(2)}`;
}

// Change quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    updateCartUI();
}

// Remove item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Show cart
function showCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('show');
    updateCartUI();
}

// Hide cart
function hideCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('show');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle admin dropdown menu
function toggleAdminMenu() {
    const dropdown = document.getElementById('admin-menu-dropdown');
    dropdown.classList.toggle('active');
}

// Close admin menu when clicking outside
document.addEventListener('click', function(event) {
    const adminDropdown = document.querySelector('.admin-dropdown');
    if (adminDropdown && !adminDropdown.contains(event.target)) {
        const dropdown = document.getElementById('admin-menu-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }
});

// Fake place order
async function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        const alreadyHaveAccount = confirm('You need an account to place an order.\n\nPress OK to login, or Cancel to register.');
        if (alreadyHaveAccount) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'register.html';
        }
        return;
    }

    const orderType = document.querySelector('input[name="order-type"]:checked')?.value || 'in-cafe';
    const deliveryFee = orderType === 'delivery' ? 2.50 : 0;
    const baseTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const grandTotal = baseTotal + deliveryFee;
    const orderPayload = {
        email: loggedInUser,
        orderType,
        items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: grandTotal
    };

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        });
        const result = await response.json();

        if (!response.ok) {
            alert(result.message || 'Unable to place your order. Please try again.');
            return;
        }

        alert(`🎉 Order placed successfully!\n\nOrder ID: ${result.orderId}\nOrder type: ${orderType === 'delivery' ? 'Delivery' : 'In Café'}\nDelivery fee: $${deliveryFee.toFixed(2)}\nTotal: $${grandTotal.toFixed(2)}\n\nThank you for choosing Kebede Yimer.`);

        cart = [];
        hideCart();
        updateCartUI();
    } catch (error) {
        alert('Unable to connect to the server. Please try again later.');
    }
}

// ==================== ROASTING PROCESS INTERACTIVITY ====================
function toggleRoastDetail(card) {
    card.classList.toggle('expanded');
}

// Initialize everything when page loads (ONE onload only - this fixes the Add button)
window.onload = function() {
    loadMenuItems();
    createCategoryButtons();
    
    console.log('%c✅ Kebede Yimer frontend is ready! Add buttons now working', 'color:#8B4513;font-size:18px;font-weight:bold');
};