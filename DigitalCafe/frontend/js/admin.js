// js/admin.js - Admin Dashboard Functionality

// Sample admin data
let adminUsers = [
    { id: 1, name: 'Zelalem Kebede', email: 'zelalem@example.com', phone: '0911234567', location: 'Addis Ababa', role: 'Customer', joined: '2025-01-15' },
    { id: 2, name: 'Almaz Dejene', email: 'almaz@example.com', phone: '0922345678', location: 'Dire Dawa', role: 'Customer', joined: '2025-02-10' },
    { id: 3, name: 'Hailu Tekle', email: 'hailu@example.com', phone: '0933456789', location: 'Adama', role: 'Premium', joined: '2025-03-05' },
];

let systemLogs = [
    { id: 1, type: 'info', message: 'System started successfully', timestamp: '2025-05-17 06:00:00' },
    { id: 2, type: 'info', message: 'User Zelalem logged in', timestamp: '2025-05-17 06:30:15' },
    { id: 3, type: 'warning', message: 'High memory usage detected', timestamp: '2025-05-17 07:45:32' },
    { id: 4, type: 'info', message: 'Backup completed successfully', timestamp: '2025-05-17 08:00:00' },
];

let recentActivities = [
    { action: 'User Registration', user: 'Almaz Dejene', time: '2 minutes ago' },
    { action: 'Order Placed', user: 'Zelalem Kebede', time: '15 minutes ago' },
    { action: 'System Update', user: 'System Admin', time: '1 hour ago' },
    { action: 'New Menu Item', user: 'Manager', time: '3 hours ago' },
];

// Initialize Admin Dashboard
window.addEventListener('DOMContentLoaded', function() {
    loadAdminDashboard();
});

function loadAdminDashboard() {
    updateDashboardStats();
    loadUsers();
    loadSystemLogs();
    console.log('Admin dashboard loaded');
}

function updateDashboardStats() {
    document.getElementById('total-users').textContent = adminUsers.length;
    document.getElementById('total-orders').textContent = '1,234';
    document.getElementById('total-revenue').textContent = '$15,678.90';
    document.getElementById('system-health').textContent = 'Good';
    
    // Load recent activities
    const activitiesContainer = document.getElementById('recent-activities');
    activitiesContainer.innerHTML = '';
    recentActivities.forEach(activity => {
        const actDiv = document.createElement('div');
        actDiv.className = 'activity-item';
        actDiv.innerHTML = `
            <div class="activity-action">${activity.action}</div>
            <div class="activity-details">${activity.user} - ${activity.time}</div>
        `;
        activitiesContainer.appendChild(actDiv);
    });
}

function showAdminTab(tabName) {
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
}

// User Management Functions
function loadUsers() {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';
    
    adminUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.location}</td>
            <td><span class="role-badge">${user.role}</span></td>
            <td>${user.joined}</td>
            <td>
                <button onclick="editUser(${index})" class="action-icon" title="Edit"><i class="fas fa-edit"></i></button>
                <button onclick="viewUserDetails(${index})" class="action-icon" title="View"><i class="fas fa-eye"></i></button>
                <button onclick="deleteUser(${index})" class="action-icon delete" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addNewUser() {
    const name = prompt('Enter user name:');
    if (!name) return;
    
    const email = prompt('Enter user email:');
    if (!email) return;
    
    const newUser = {
        id: adminUsers.length + 1,
        name: name,
        email: email,
        phone: '0900000000',
        location: 'New Location',
        role: 'Customer',
        joined: new Date().toISOString().split('T')[0]
    };
    
    adminUsers.push(newUser);
    loadUsers();
    logActivity(`New user ${name} added`, 'info');
}

function editUser(index) {
    const user = adminUsers[index];
    const newName = prompt('Edit user name:', user.name);
    if (newName) {
        adminUsers[index].name = newName;
        loadUsers();
        logActivity(`User ${user.name} updated`, 'info');
    }
}

function viewUserDetails(index) {
    const user = adminUsers[index];
    alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nLocation: ${user.location}\nRole: ${user.role}\nJoined: ${user.joined}`);
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        const deletedUser = adminUsers[index];
        adminUsers.splice(index, 1);
        loadUsers();
        logActivity(`User ${deletedUser.name} deleted`, 'warning');
    }
}

// System Logs Functions
function loadSystemLogs() {
    const logsList = document.getElementById('logs-list');
    logsList.innerHTML = '';
    
    systemLogs.forEach(log => {
        const logDiv = document.createElement('div');
        logDiv.className = `log-entry log-${log.type}`;
        logDiv.innerHTML = `
            <span class="log-type"><i class="fas fa-circle"></i> ${log.type.toUpperCase()}</span>
            <span class="log-message">${log.message}</span>
            <span class="log-time">${log.timestamp}</span>
        `;
        logsList.appendChild(logDiv);
    });
}

function filterLogs() {
    const filter = document.getElementById('log-filter').value;
    const logsList = document.getElementById('logs-list');
    logsList.innerHTML = '';
    
    const filteredLogs = filter === 'all' ? systemLogs : systemLogs.filter(log => log.type === filter);
    
    filteredLogs.forEach(log => {
        const logDiv = document.createElement('div');
        logDiv.className = `log-entry log-${log.type}`;
        logDiv.innerHTML = `
            <span class="log-type"><i class="fas fa-circle"></i> ${log.type.toUpperCase()}</span>
            <span class="log-message">${log.message}</span>
            <span class="log-time">${log.timestamp}</span>
        `;
        logsList.appendChild(logDiv);
    });
}

function clearLogs() {
    if (confirm('Are you sure you want to clear all logs? This cannot be undone.')) {
        systemLogs = [];
        loadSystemLogs();
        alert('All logs have been cleared.');
    }
}

function logActivity(message, type = 'info') {
    const newLog = {
        id: systemLogs.length + 1,
        type: type,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    systemLogs.unshift(newLog);
    if (systemLogs.length > 100) systemLogs.pop(); // Keep only last 100 logs
}

// System Settings
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('system-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ System settings saved successfully!');
            logActivity('System settings updated', 'info');
        });
    }
});

// Reports Functions
function exportReport(format) {
    const reportData = {
        totalUsers: adminUsers.length,
        totalOrders: '1,234',
        totalRevenue: '$15,678.90',
        date: new Date().toLocaleDateString()
    };
    
    if (format === 'pdf') {
        alert('📄 Report will be exported as PDF\n\nNote: Install a PDF library for actual PDF generation');
    } else if (format === 'csv') {
        alert('📊 Report will be exported as CSV\n\nData: ' + JSON.stringify(reportData));
    }
    logActivity(`Report exported as ${format.toUpperCase()}`, 'info');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
        window.location.href = 'login.html';
    }
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#users-table-body tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});
