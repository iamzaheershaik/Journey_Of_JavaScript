document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capture values
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        // 2. Simple Validation
        if (!name || !email || !username || !password) {
            showError("All fields are required.");
            return;
        }

        if (password.length < 6) {
            showError("Password must be at least 6 characters.");
            return;
        }

        // 3. Create User Object
        const newUser = {
            name: name,
            email: email,
            username: username,
            password: password
        };

        // 4. Save to LocalStorage (Simulating a Database)
        // We store it as 'customUser' so the Login page can find it.
        localStorage.setItem('customUser', JSON.stringify(newUser));

        // 5. Success Feedback
        alert("Account created successfully! Please login.");
        window.location.href = "login.html";
    });

    function showError(msg) {
        const errorEl = document.getElementById('reg-error');
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
});