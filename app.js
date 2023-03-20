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

function displayWatchList(watchList) {
  const watchListDiv = document.getElementById("watchList");
  watchListDiv.innerHTML = "";
  if (watchList.length > 0) {
    watchListDiv.innerHTML += `
    <div class="flex justify-center mt-10 mb-6">
      <h2 class="text-white font-medium text-4xl">Watch List</h2>
    </div>
    `;
    watchList.forEach(movieData => {
      watchListDiv.innerHTML += `
        <div class="bg-gray-200 p-2 rounded-md my-2 flex gap-4">
            <img src="${movieData.Poster}" id="movieposter" class="rounded-md object-fill h-40">
            <div class="grid gap-2 w-full">
              <div class="flex justify-between">
                <h3 class="text-2xl font-medium">${movieData.Title}</h3>
                <p class="text-sm text-white bg-[#E50914] p-1 rounded-md flex justify-center items-center">${movieData.Ratings[0].Value}</p>
              </div>
              <p>Actors: ${movieData.Actors}</p>
              <p>Duration: ${movieData.Runtime}</p>
              <p>Plot: ${movieData.Plot}</p>
            </div>
        </div>
      `;
    });
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
  displayWatchList(watchList);
}


function checkWL() {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  if (watchList.length > 0){
    document.querySelector("#loadwlbtn").classList.remove('hidden');
    document.querySelector("#loadwlbtn").classList.add('block');
  }
}


checkWL();
