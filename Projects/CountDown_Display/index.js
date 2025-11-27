// --- DATA WITH IMAGES ---
// I added an 'image' link to every product here
const products = [
  {
    name: "Super Drone",
    price: 100,
    image: "./images/Drone.png",
  },
  {
    name: "VR Headset",
    price: 60,
    image: "./images/VR.png",
  },
  {
    name: "Smart Watch",
    price: 200,
    image: "./images/SmartWatch.png",
  },
  {
    name: "Retro Mouse",
    price: 40,
    image: "./images/RetroMouse.png",
  },
  {
    name: "Mech Keyboard",
    price: 120,
    image: "./images/KeyBoard.png",
  },
];

// 1. Wait 5 Seconds
setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("shop-container").style.display = "block";
  renderProducts(true);
  startCountdown(120);
}, 5000);

// 2. Draw Cards with Images
function renderProducts(isDiscounted) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    let priceHtml;
    if (isDiscounted) {
      let discountedPrice = (product.price * 0.8).toFixed(2);
      priceHtml = `<span class="old-price">$${product.price}</span> $${discountedPrice}`;
    } else {
      priceHtml = `$${product.price}`;
    }

    // NEW: We added the <img> tag inside the card
    container.innerHTML += `
                    <div class="card">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="card-content">
                            <h3>${product.name}</h3>
                            <p class="price">${priceHtml}</p>
                        </div>
                    </div>
                `;
  });
}

// 3. Countdown Timer (Same as before)
function startCountdown(duration) {
  let timeLeft = duration;
  const timerDisplay = document.getElementById("live-timer");

  const interval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;

    timerDisplay.innerText = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      timerDisplay.innerText = "00:00";
      timerDisplay.parentElement.style.backgroundColor = "#b2bec3";
      alert("🚫 SALE OVER!");
      renderProducts(false);
    }
  }, 1000);
}
