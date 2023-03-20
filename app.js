function searchMovie() {
  const title = document.getElementById("input").value;
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=2ecba00f`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        document.getElementById("movieInfo").innerHTML = `
          <div class="grid bg-gray-200 rounded-md py-10 px-4"><p>not found</p></div>
        `;
      } else {
      document.getElementById("movieInfo").innerHTML = `
      <div class="grid bg-gray-200 rounded-md py-10 px-4">
        <h2>${data.Title}</h2>
        <p>Year: ${data.Year}</p>
        <img src="${data.Poster}" id="movieposter"></img>
        <p>Director: ${data.Director}</p>
        <p>Plot: ${data.Plot}</p>
        <button class="absolute top-0 right-0" onclick="saveMovie()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg></button>
      </div>
      `;
      // Save the movie data to local storage
      localStorage.setItem("movie", JSON.stringify(data));
      console.log(data);
    }})
    .catch(error => console.log(error));
}

function saveMovie() {
  const movieData = JSON.parse(localStorage.getItem("movie"));
  if (movieData) {
    // Retrieve the existing watch list from local storage
    const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    // Add the movie data to the watch list
    watchList.push(movieData);
    // Save the updated watch list to local storage
    localStorage.setItem("watchList", JSON.stringify(watchList));
    console.log("Movie saved");
    displayWatchList(watchList);

  }
}

function displayWatchList(watchList) {
  const watchListDiv = document.getElementById("watchList");
  watchListDiv.innerHTML = "";
  if (watchList.length > 0) {
    watchListDiv.innerHTML += "<h2>Watch List</h2>";
    watchList.forEach(movieData => {
      watchListDiv.innerHTML += `
        <div>
          <h3>${movieData.Title}</h3>
          <p>Year: ${movieData.Year}</p>
          <p>Director: ${movieData.Director}</p>
          <p>Plot: ${movieData.Plot}</p>
        </div>
      `;
    });
  }
}
