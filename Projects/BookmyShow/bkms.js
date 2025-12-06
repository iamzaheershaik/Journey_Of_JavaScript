document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SEARCH BAR INTERACTION ---
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-box input");

    // Add visual focus effect to the entire box when input is focused
    searchInput.addEventListener("focus", () => {
        searchBox.style.borderColor = "#ccc";
    });

    searchInput.addEventListener("blur", () => {
        searchBox.style.borderColor = "#eeeeee"; // Revert to original color
    });


    // --- 2. CUSTOM DROPDOWN LOGIC ---
    const dropdown = document.getElementById("cityDropdown");
    const trigger = dropdown.querySelector(".dropdown-trigger");
    const selectedText = dropdown.querySelector(".selected-text");
    const menuItems = dropdown.querySelectorAll(".dropdown-menu li");
    const arrowIcon = dropdown.querySelector(".arrow-icon");

    // Toggle Dropdown on Click
    trigger.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop click from reaching document
        dropdown.classList.toggle("active");
    });

    // Handle Selection of a City
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop click from reaching document
            const city = e.target.getAttribute("data-value");
            
            // Update the text to show selected city
            selectedText.textContent = city; 
            
            // Close the menu
            dropdown.classList.remove("active");
        });
    });

    // Close Dropdown when clicking anywhere outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });


    // --- 3. SIGN IN BUTTON (Optional) ---
    const signInBtn = document.querySelector(".sign-in-btn");
    signInBtn.addEventListener("click", () => {
        console.log("Sign In clicked");
        // You can add your login modal logic here
    });

});