// js/auth.js
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function handleAuthSubmit(event, mode) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const userData = {
        email: email,
        name: document.getElementById('fullname')?.value || "User",
        education: document.getElementById('education')?.value || "N/A"
    };

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    window.location.href = 'dashboard.html';
}