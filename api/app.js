document.getElementById("onSubmit").addEventListener("click", () => {
  const movieName = document.getElementById("searchInput").value.trim();
  const movieResult = document.getElementById("movieResult");

  if (!movieName) {
    movieResult.style.display = "block";
    movieResult.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=9d4c61a3`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        movieResult.style.display = "block";
        movieResult.innerHTML = `<p>Movie not found.</p>`;
        return;
      }

      movieResult.style.display = "block";
      movieResult.innerHTML = `
        <img src="${data.Poster}" alt="Poster">
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>IMDb:</strong> ${data.imdbRating}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
      `;
    })
    .catch(() => {
      movieResult.style.display = "block";
      movieResult.innerHTML = "<p>Error fetching data.</p>";
    });
});
