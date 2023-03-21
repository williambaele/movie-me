function searchMovie() {
  const title = document.getElementById("input").value;
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=2ecba00f`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "False") {
        document.getElementById("movieInfo").innerHTML = `
          <div class="grid flex bg-gray-200 rounded-md py-10 px-4 flex justify-center"><h2 class="font-medium text-4xl">Your research doesn't match any movie. Try again !</h2><img class="flex justify-center items-center" src="https://ouch-cdn2.icons8.com/7VvFyC515Y1E1JaSOZBcvEq2iUjaKaojSlBhtCHHmRA/rs:fit:608:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzU2/LzdjYjEyM2Q1LWQz/NjItNDI3NS1iYjk5/LWNiMDE2Zjk3ODQ3/ZS5zdmc.png"></div>
        `;
      } else {
      document.getElementById("movieInfo").innerHTML = `
      <div class="flex gap-4 bg-gray-200 rounded-md py-10 px-4">
        <div>
          <img src="${data.Poster}" id="movieposter" class="rounded-md"></img>
        </div>
        <div>
          <div class="flex justify-between">
            <h2 class="font-medium text-4xl">${data.Title}</h2>
            <p class="text-lg text-white bg-[#E50914] p-1 rounded-md flex justify-center items-center">${data.Ratings[0].Value}</p>
          </div>
          <div class="grid gap-4 mt-6">
            <p>Released: ${data.Released}</p>
            <p>Length: ${data.Runtime}</p>
            <p>Director: ${data.Director}</p>
            <p>Actors: ${data.Actors}</p>
            <p>Plot: ${data.Plot}</p>
          </div>
        </div>
        <button class="absolute bottom-8 right-8" onclick="saveMovie()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
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

function displayWatchList(watchList, watchedList = []) {
  const watchListDiv = document.getElementById("watchList");
  watchListDiv.innerHTML = "";
  if (watchList.length > 0 || watchedList.length > 0) {
    watchListDiv.innerHTML += `
    <div class="flex justify-center mt-10 mb-6">
      <h2 class="text-white font-medium text-4xl">Watch List</h2>
    </div>
    <div class="w-full grid grid-cols-2 rounded-md mb-6">
      <div class="p-4">
          <h3 class="text-white font-medium text-lg mb-4 bg-[#302c2c] py-2 rounded-md hover:bg-[#E50914]">To Watch</h3>
          <ul id="toWatchList">
            ${watchList.map(movie => `
              <li class="flex my-2 items-center gap-2 justify-between py-2 bg-[#454141] px-2 rounded-md">
                <div class="flex gap-5">
                  <img src="${movie.Poster}" id="movieposter" class="rounded-md h-20 hidden md:block"></img>
                  <div class="grid gap-1">
                    <h2 class="font-medium text-xl text-white text-left">${movie.Title}</h2>
                    <div class="flex gap-4">
                      <span class="text-md text-white">${movie.Runtime}</span>
                      <span class="text-md text-white">${movie.Ratings[0].Value}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="flex items-center">
                    <input type="checkbox" class="mr-2" onclick="markAsWatched('${movie.imdbID}')">
                  </label>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="p-4">
          <h3 class="text-white font-medium text-lg mb-4 bg-[#302c2c] py-2 rounded-md hover:bg-[#E50914]">Watched</h3>
          <ul id="watchedList">
            ${watchedList.map(movie => `
            <li class="flex my-2 items-center gap-2 justify-between py-2 bg-[#454141] px-2 rounded-md">
                <div class="flex gap-5">
                  <img src="${movie.Poster}" id="movieposter" class="rounded-md h-20 hidden md:block"></img>
                  <div class="grid gap-1">
                    <h2 class="font-medium text-xl text-white text-left">${movie.Title}</h2>
                    <div class="flex gap-4">
                      <span class="text-md text-white">${movie.Runtime}</span>
                      <span class="text-md text-white">${movie.Ratings[0].Value}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="flex items-center justify-start">
                    <a onclick="deleteWatchedMovie('${movie.imdbID}')" id="trashmovie" class="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#E50914" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </a>
                  </label>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

function markAsWatched(imdbID) {
  // Retrieve the existing watch list from local storage
  let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  // Find the selected movie in the watch list
  const movieIndex = watchList.findIndex(movie => movie.imdbID === imdbID);
  if (movieIndex !== -1) {
    // Remove the movie from the watch list and add it to the watched list
    const [movie] = watchList.splice(movieIndex, 1);
    const watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
    watchedList.push(movie);
    // Save the updated watch lists to local storage
    localStorage.setItem("watchList", JSON.stringify(watchList));
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
    console.log("Movie marked as watched");
    // Update the display of the watch lists
    displayWatchList(watchList, watchedList);
  }
}

let input = document.querySelector("#input");
let form = document.querySelector("#form");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(input.value == ''){
     // Mettre notre bordure de formulaire en rouge (red)


  }
  else {
    // Mettre notre bordure de formulaire en gris (silver)
    let movie = input.value;
    searchMovie(movie);

  }
});

function loadWatchList() {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  const watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
  displayWatchList(watchList, watchedList);

}


function checkWL() {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  if (watchList.length > 0){
    document.querySelector("#loadwlbtn").classList.remove('hidden');
    document.querySelector("#loadwlbtn").classList.add('block');
  }
}


checkWL();

const loadWlBtn = document.getElementById("loadwlbtn");
loadWlBtn.addEventListener("click", hideLoadWlBtn);

function hideLoadWlBtn() {
  loadWlBtn.style.display = "none";
}


function deleteWatchedMovie(index) {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];

  const watchedList = JSON.parse(localStorage.getItem("watchedList")) || [];
  watchedList.splice(index, 1);
  localStorage.setItem("watchedList", JSON.stringify(watchedList));
  displayWatchList(watchList, watchedList);
}
