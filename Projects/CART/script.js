document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  if (productContainer) {
    fetchProducts();
  }
});

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    const products = await response.json();

    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("product-container").innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card-img">
            <div class="card-body">
                <p class="card-category">${product.category}</p>
                <h3 class="card-title">${product.title}</h3>
                <p class="card-price">$${product.price}</p>
            </div>
        `;

    productContainer.appendChild(card);
  });
}
