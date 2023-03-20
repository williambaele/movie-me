console.log("Hello");
let search = "alibi.com";
let input = document.querySelector('#input');

function getMovieData(search) {
  const url = 'https://www.omdbapi.com/?t='+ search + '&apikey=2ecba00f';
  fetch(url, {

  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      throw new Error("Problem with the API");
    } else {
      throw new Error("Request failed");
    }
  })
  .then(data => {
    // Do something with the user data
    console.log(data);
    document.querySelector("#movietitle").textContent = data.Title
    document.querySelector("#movieposter").src = data.Poster

  })
  .catch(error => {
    console.log('Error:', error);
    if (error.message === "Problem with the API") {
      // Handle the API error
    }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(input.value === null ){
     // Mettre notre bordure de formulaire en rouge (red)
     document.querySelector("#errormsg").textContent = "Error";
     document.querySelector("#searchbtn").classList.add('bg-red-400');
  }
  else {
    let search = input.value;
    getMovieData(search);
  }
});
