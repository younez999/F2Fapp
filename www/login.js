// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        // Retrieve users from Local Storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Find user with matching email and password
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Successful login
            // Save current user to Local Storage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Redirect based on role
            if (user.role === 'buyer') {
                window.location.href = 'buyer.html';
            } else if (user.role === 'farmer') {
                window.location.href = 'farmer.html';
            }
        } else {
            // Invalid credentials
            loginError.textContent = 'Invalid email or password.';
        }
    });
});
