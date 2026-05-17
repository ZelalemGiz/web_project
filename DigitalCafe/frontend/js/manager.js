// js/manager.js - Manager Dashboard Functionality

// Sample manager data
let orders = [
    { id: 'ORD001', customer: 'Zelalem Kebede', items: 'Espresso x2, Croissant x1', total: '$12.50', status: 'completed', time: '10:30 AM' },
    { id: 'ORD002', customer: 'Almaz Dejene', items: 'Cappuccino x1', total: '$4.49', status: 'pending', time: '11:15 AM' },
    { id: 'ORD003', customer: 'Hailu Tekle', items: 'Latte x2, Muffin x2', total: '$18.96', status: 'preparing', time: '11:45 AM' },
];

let menuItems = [
    { id: 1, name: 'Espresso', category: 'coffee', price: 3.99, stock: 45, status: 'available' },
    { id: 2, name: 'Cappuccino', category: 'coffee', price: 4.49, stock: 32, status: 'available' },
    { id: 3, name: 'Latte', category: 'coffee', price: 4.99, stock: 28, status: 'available' },
    { id: 4, name: 'Green Tea', category: 'tea', price: 3.29, stock: 5, status: 'low-stock' },
];

let staff = [
    { id: 1, name: 'Bekele Tewodros', position: 'Barista', email: 'bekele@example.com', phone: '0911111111', shift: 'Morning', status: 'on-duty' },
    { id: 2, name: 'Meskerem Abebe', position: 'Cashier', email: 'meskerem@example.com', phone: '0922222222', shift: 'Afternoon', status: 'off-duty' },
    { id: 3, name: 'Tigist Wondim', position: 'Server', email: 'tigist@example.com', phone: '0933333333', shift: 'Evening', status: 'on-duty' },
];

let inventory = [
    { id: 1, name: 'Coffee Beans', category: 'Raw Materials', quantity: 50, unit: 'kg', minStock: 20, lastUpdated: '2025-05-17' },
    { id: 2, name: 'Milk', category: 'Dairy', quantity: 30, unit: 'liters', minStock: 15, lastUpdated: '2025-05-17' },
    { id: 3, name: 'Sugar', category: 'Ingredients', quantity: 25, unit: 'kg', minStock: 10, lastUpdated: '2025-05-16' },
];

let feedback = [
    { id: 1, customer: 'Zelalem K.', rating: 5, comment: 'Great coffee and excellent service!', date: '2025-05-17' },
    { id: 2, customer: 'Almaz D.', rating: 4, comment: 'Good coffee but a bit slow today', date: '2025-05-17' },
    { id: 3, customer: 'Hailu T.', rating: 5, comment: 'Amazing atmosphere and delicious pastries!', date: '2025-05-16' },
];

// Initialize Manager Dashboard
window.addEventListener('DOMContentLoaded', function() {
    loadManagerDashboard();
});

function loadManagerDashboard() {
    updateDashboardStats();
    loadOrders();
    loadMenuManagement();
    loadStaffTable();
    loadInventoryTable();
    loadFeedback();
    console.log('Manager dashboard loaded');
}

function updateDashboardStats() {
    document.getElementById('today-order-count').textContent = orders.length;
    document.getElementById('today-revenue').textContent = '$42.95';
    document.getElementById('completed-orders').textContent = orders.filter(o => o.status === 'completed').length;
    document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'pending').length;
    document.getElementById('cafe-status').textContent = 'Open';
    document.getElementById('active-staff').textContent = staff.filter(s => s.status === 'on-duty').length;
    document.getElementById('tables-occupied').textContent = '8';
}

function showManagerTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked menu item
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Reload data based on tab
    if (tabName === 'menu') loadMenuManagement();
    if (tabName === 'staff') loadStaffTable();
    if (tabName === 'inventory') loadInventoryTable();
}

// Order Management Functions
function loadOrders() {
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';
    
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        const statusColor = {
            pending: '#f39c12',
            preparing: '#3498db',
            ready: '#2ecc71',
            completed: '#27ae60',
            cancelled: '#e74c3c'
        };
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td>${order.total}</td>
            <td><span class="status-badge" style="background:${statusColor[order.status]}">${order.status}</span></td>
            <td>${order.time}</td>
            <td>
                <button onclick="updateOrderStatus(${index})" class="action-icon" title="Update Status"><i class="fas fa-edit"></i></button>
                <button onclick="viewOrderDetails(${index})" class="action-icon" title="View"><i class="fas fa-eye"></i></button>
                ${order.status !== 'completed' ? `<button onclick="cancelOrder(${index})" class="action-icon delete" title="Cancel"><i class="fas fa-times"></i></button>` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterOrders() {
    const status = document.getElementById('order-status-filter').value;
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';
    
    const filteredOrders = status === 'all' ? orders : orders.filter(o => o.status === status);
    
    filteredOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        const statusColor = {
            pending: '#f39c12',
            preparing: '#3498db',
            ready: '#2ecc71',
            completed: '#27ae60',
            cancelled: '#e74c3c'
        };
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td>${order.total}</td>
            <td><span class="status-badge" style="background:${statusColor[order.status]}">${order.status}</span></td>
            <td>${order.time}</td>
            <td>
                <button onclick="updateOrderStatus(${index})" class="action-icon" title="Update Status"><i class="fas fa-edit"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateOrderStatus(index) {
    const order = orders[index];
    const statuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    const currentIndex = statuses.indexOf(order.status);
    order.status = statuses[(currentIndex + 1) % statuses.length];
    loadOrders();
    alert(`✅ Order ${order.id} status updated to: ${order.status}`);
}

function viewOrderDetails(index) {
    const order = orders[index];
    alert(`Order Details:\n\nID: ${order.id}\nCustomer: ${order.customer}\nItems: ${order.items}\nTotal: ${order.total}\nStatus: ${order.status}\nTime: ${order.time}`);
}

function cancelOrder(index) {
    if (confirm('Are you sure you want to cancel this order?')) {
        orders[index].status = 'cancelled';
        loadOrders();
        alert('Order cancelled successfully');
    }
}

// Menu Management Functions
function loadMenuManagement() {
    const grid = document.getElementById('menu-management-grid');
    grid.innerHTML = '';
    
    menuItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'menu-mgmt-card';
        card.innerHTML = `
            <div class="menu-mgmt-header">
                <h4>${item.name}</h4>
                <span class="menu-status" style="background:${item.status === 'available' ? '#27ae60' : '#f39c12'}">${item.status}</span>
            </div>
            <div class="menu-mgmt-body">
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <p><strong>Stock:</strong> ${item.stock} units</p>
            </div>
            <div class="menu-mgmt-actions">
                <button onclick="editMenuItem(${index})" class="action-icon"><i class="fas fa-edit"></i> Edit</button>
                <button onclick="deleteMenuItem(${index})" class="action-icon delete"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addMenuItem() {
    const name = prompt('Enter item name:');
    if (!name) return;
    
    const price = prompt('Enter price:');
    if (!price) return;
    
    const newItem = {
        id: menuItems.length + 1,
        name: name,
        category: 'Other',
        price: parseFloat(price),
        stock: 30,
        status: 'available'
    };
    
    menuItems.push(newItem);
    loadMenuManagement();
    alert(`✅ Menu item "${name}" added successfully!`);
}

function editMenuItem(index) {
    const item = menuItems[index];
    const newName = prompt('Edit item name:', item.name);
    if (newName) {
        menuItems[index].name = newName;
        loadMenuManagement();
        alert('✅ Menu item updated successfully!');
    }
}

function deleteMenuItem(index) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        const deletedItem = menuItems[index];
        menuItems.splice(index, 1);
        loadMenuManagement();
        alert(`✅ Menu item "${deletedItem.name}" deleted successfully!`);
    }
}

// Staff Management Functions
function loadStaffTable() {
    const tableBody = document.getElementById('staff-table-body');
    tableBody.innerHTML = '';
    
    staff.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.position}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.shift}</td>
            <td><span class="status-badge" style="background:${member.status === 'on-duty' ? '#27ae60' : '#95a5a6'}">${member.status}</span></td>
            <td>
                <button onclick="editStaff(${index})" class="action-icon"><i class="fas fa-edit"></i></button>
                <button onclick="toggleStaffStatus(${index})" class="action-icon"><i class="fas fa-clock"></i></button>
                <button onclick="deleteStaff(${index})" class="action-icon delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addStaff() {
    const name = prompt('Enter staff name:');
    if (!name) return;
    
    const position = prompt('Enter position:');
    if (!position) return;
    
    const newStaff = {
        id: staff.length + 1,
        name: name,
        position: position,
        email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
        phone: '0900000000',
        shift: 'Morning',
        status: 'on-duty'
    };
    
    staff.push(newStaff);
    loadStaffTable();
    alert(`✅ Staff member "${name}" added successfully!`);
}

function editStaff(index) {
    const member = staff[index];
    const newName = prompt('Edit name:', member.name);
    if (newName) {
        staff[index].name = newName;
        loadStaffTable();
        alert('✅ Staff member updated successfully!');
    }
}

function toggleStaffStatus(index) {
    staff[index].status = staff[index].status === 'on-duty' ? 'off-duty' : 'on-duty';
    loadStaffTable();
}

function deleteStaff(index) {
    if (confirm('Are you sure you want to remove this staff member?')) {
        const deletedStaff = staff[index];
        staff.splice(index, 1);
        loadStaffTable();
        alert(`✅ Staff member "${deletedStaff.name}" removed successfully!`);
    }
}

// Inventory Management Functions
function loadInventoryTable() {
    const tableBody = document.getElementById('inventory-table-body');
    tableBody.innerHTML = '';
    
    inventory.forEach((item, index) => {
        const status = item.quantity <= item.minStock ? 'low-stock' : 'in-stock';
        const statusColor = status === 'low-stock' ? '#e74c3c' : '#27ae60';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.minStock}</td>
            <td><span class="status-badge" style="background:${statusColor}">${status}</span></td>
            <td>${item.lastUpdated}</td>
            <td>
                <button onclick="updateInventory(${index})" class="action-icon"><i class="fas fa-edit"></i></button>
                <button onclick="deleteInventoryItem(${index})" class="action-icon delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addInventoryItem() {
    const name = prompt('Enter item name:');
    if (!name) return;
    
    const quantity = prompt('Enter quantity:');
    if (!quantity) return;
    
    const newItem = {
        id: inventory.length + 1,
        name: name,
        category: 'Supplies',
        quantity: parseInt(quantity),
        unit: 'units',
        minStock: 10,
        lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    inventory.push(newItem);
    loadInventoryTable();
    alert(`✅ Inventory item "${name}" added successfully!`);
}

function updateInventory(index) {
    const item = inventory[index];
    const newQuantity = prompt('Update quantity:', item.quantity);
    if (newQuantity) {
        inventory[index].quantity = parseInt(newQuantity);
        inventory[index].lastUpdated = new Date().toISOString().split('T')[0];
        loadInventoryTable();
        alert('✅ Inventory updated successfully!');
    }
}

function deleteInventoryItem(index) {
    if (confirm('Are you sure you want to delete this inventory item?')) {
        const deletedItem = inventory[index];
        inventory.splice(index, 1);
        loadInventoryTable();
        alert(`✅ Inventory item "${deletedItem.name}" deleted successfully!`);
    }
}

function lowStockAlert() {
    const lowStock = inventory.filter(item => item.quantity <= item.minStock);
    if (lowStock.length === 0) {
        alert('✅ All inventory items are well stocked!');
    } else {
        let message = '⚠️ Low Stock Alert:\n\n';
        lowStock.forEach(item => {
            message += `- ${item.name}: ${item.quantity}/${item.minStock} ${item.unit}\n`;
        });
        alert(message);
    }
}

// Customer Feedback Functions
function loadFeedback() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';
    
    feedback.forEach((item, index) => {
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-item';
        feedbackDiv.innerHTML = `
            <div class="feedback-header">
                <strong>${item.customer}</strong>
                <span class="feedback-rating">${stars}</span>
            </div>
            <p class="feedback-comment">${item.comment}</p>
            <span class="feedback-date">${item.date}</span>
        `;
        feedbackList.appendChild(feedbackDiv);
    });
}

function filterFeedback() {
    const filter = document.getElementById('feedback-filter').value;
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';
    
    let filteredFeedback = feedback;
    if (filter !== 'all') {
        const rating = parseInt(filter.split('-')[0]);
        filteredFeedback = feedback.filter(f => f.rating === rating);
    }
    
    filteredFeedback.forEach(item => {
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-item';
        feedbackDiv.innerHTML = `
            <div class="feedback-header">
                <strong>${item.customer}</strong>
                <span class="feedback-rating">${stars}</span>
            </div>
            <p class="feedback-comment">${item.comment}</p>
            <span class="feedback-date">${item.date}</span>
        `;
        feedbackList.appendChild(feedbackDiv);
    });
}

// Sales Reports Functions
function generateReport(period) {
    const reportNames = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' };
    alert(`📊 Generating ${reportNames[period]} Sales Report...\n\nReport will be created and can be exported.`);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
        window.location.href = 'login.html';
    }
}
