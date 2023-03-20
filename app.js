function searchMovie() {
  const title = document.getElementById("input").value;
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=2ecba00f`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("movieInfo").innerHTML = `
        <h2>${data.Title}</h2>
        <p>Year: ${data.Year}</p>
        <p>Director: ${data.Director}</p>
        <p>Plot: ${data.Plot}</p>
        <button class="absolute top-0 right-0" onclick="saveMovie()">Save</button>
      `;
      // Save the movie data to local storage
      localStorage.setItem("movie", JSON.stringify(data));
      console.log(data);
    })
    .catch(error => console.log(error));
}
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if(inputValue == ""){
//      document.querySelector("#errormsg").textContent = "Error";
//      console.log("Empty value");
//      document.querySelector("#searchbtn").classList.add('cursor-not-allowed');
//   }
//   else {
//     let search = inputValue;
//     getMovieData(search);
//   }
// });

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
  }
}
