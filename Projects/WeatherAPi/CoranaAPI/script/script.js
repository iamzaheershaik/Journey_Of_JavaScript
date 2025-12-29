// ===== ELEMENTS =====
const searchTypeEl = document.querySelector(".searchType");
const inputEl = document.querySelector(".inputElement");
const btnEl = document.querySelector(".btn");

const activeCasesEl = document.querySelector(".activeCases");
const newCasesEl = document.querySelector(".newCases");
const recoveredCasesEl = document.querySelector(".recoveredCases");

const totalCasesEl = document.querySelector(".totalCases");
const totalDeathsEl = document.querySelector(".totalDeaths");

// ===== BASE URL =====
const BASE_URL = "https://disease.sh/v3/covid-19";

// ===== UTILITIES =====
function showLoading() {
    [
        activeCasesEl,
        newCasesEl,
        recoveredCasesEl,
        totalCasesEl,
        totalDeathsEl,
    ].forEach(el => el.textContent = "Loading...");
}

function showError(message) {
    [
        activeCasesEl,
        newCasesEl,
        recoveredCasesEl,
        totalCasesEl,
        totalDeathsEl,
    ].forEach(el => el.textContent = message);
}

function formatNumber(num) {
    return num?.toLocaleString() ?? "N/A";
}

// ===== DATA RENDER =====
function renderData(data) {
    activeCasesEl.textContent = formatNumber(data.active);
    newCasesEl.textContent = formatNumber(data.todayCases);
    recoveredCasesEl.textContent = formatNumber(data.recovered);

    totalCasesEl.textContent = formatNumber(data.cases);
    totalDeathsEl.textContent = formatNumber(data.deaths);
}

// ===== FETCH LOGIC =====
async function fetchCovidData() {
    const type = searchTypeEl.value;
    const query = inputEl.value.trim();

    if (!query) {
        showError("Enter a valid name");
        return;
    }

    showLoading();

    let endpoint = "";

    if (type === "countries") {
        endpoint = `${BASE_URL}/countries/${query}?strict=true`;
    }

    if (type === "states") {
        endpoint = `${BASE_URL}/states/${query}`;
    }

    try {
        const res = await fetch(endpoint);

        if (!res.ok) {
            throw new Error("Invalid input or data not found");
        }

        const data = await res.json();
        renderData(data);

    } catch (error) {
        showError("Data not available");
    }
}

// ===== EVENT =====
btnEl.addEventListener("click", fetchCovidData);

// Optional: Enter key support
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        fetchCovidData();
    }
});
