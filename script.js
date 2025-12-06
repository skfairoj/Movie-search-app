const apikey = "826d4f48"; // Your real OMDB API key

function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("searchSection").style.display = "block";
  } else {
    alert("Please enter both username and password!");
  }
}

async function searchMovies(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  const list = document.getElementById("movieList");
  list.innerHTML = "";

  if (!query) {
    list.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apikey}&s=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      data.Search.forEach(movie => {
        const card = document.createElement("div");
        card.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/80"}" 
               alt="${movie.Title}">
          <p><b>${movie.Title}</b> (${movie.Year})</p>
        `;
        list.appendChild(card);
      });
    } else {
      list.innerHTML = `<p>No results found for "${query}"</p>`;
    }

  } catch (error) {
    console.error("Error fetching movies:", error);
    list.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}