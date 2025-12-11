document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const loginBtn = document.getElementById('loginBtn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showError("Please enter both username and password.");
            return;
        }

        setLoading(true);

        // --- CHECK 1: LocalStorage (Custom User) ---
        const customUser = JSON.parse(localStorage.getItem('customUser'));

        if (customUser && customUser.username === username && customUser.password === password) {
            // Success: User matches the one registered locally
            console.log("Logged in with Custom Profile");
            
            // Generate a fake token for consistency
            localStorage.setItem('userToken', 'custom-token-' + Date.now());
            localStorage.setItem('username', customUser.username); // Use the real name if you want

            alert("Login Successful! Redirecting...");
            window.location.href = "index.html";
            return; // Stop here, don't call API
        }

        // --- CHECK 2: FakeStore API (Default Users) ---
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('username', username);
                
                alert("Login Successful! Redirecting...");
                window.location.href = "index.html";
            } else {
                showError("Invalid credentials.");
            }

        } catch (error) {
            console.error("API Login Error:", error);
            showError("Login failed. Invalid username or password.");
        } finally {
            setLoading(false);
        }
    });

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loginBtn.textContent = "Logging in...";
            loginBtn.disabled = true;
            loginBtn.style.backgroundColor = "#ccc";
        } else {
            loginBtn.textContent = "Login";
            loginBtn.disabled = false;
            loginBtn.style.backgroundColor = "#e40046";
        }
    }
});