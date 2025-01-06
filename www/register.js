// register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const role = document.getElementById('registerRole').value;

        // Basic validation
        if (!email || !password || !role) {
            registerMessage.textContent = 'Please fill in all fields.';
            registerMessage.className = 'error';
            return;
        }

        // Retrieve existing users from Local Storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            registerMessage.textContent = 'Email is already registered.';
            registerMessage.className = 'error';
            return;
        }

        // Create new user object
        const newUser = {
            email: email,
            password: password,
            role: role
        };

        // Add new user to users array
        users.push(newUser);

        // Save updated users array to Local Storage
        localStorage.setItem('users', JSON.stringify(users));

        // Display success message
        registerMessage.textContent = 'Registration successful! You can now log in.';
        registerMessage.className = 'success';

        // Reset the form
        registerForm.reset();
    });
});
