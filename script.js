const apiKEY = 'api_key=ef09f9831c63af1b30359046b8ce6f0c';
const baseURL = 'https://api.themoviedb.org/3';
const apiURL = baseURL + '/discover/movie?sort_by=popularity.desc&'+apiKEY;
// addded api key base url and api url : JSON Response
const imgURL = 'https://image.tmdb.org/t/p/w500';

const searchURL = baseURL + '/search/movie?' + apiKEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsElement = document.getElementById('tags');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

var previousGenres = []
setGenre();
function setGenre(){
    tagsElement.innerHTML='';
    // Removes all tags initially
    genres.forEach(genre =>{
        const a = document.createElement('div');
        a.classList.add('tag');
        a.id = genre.id;
        a.innerText = genre.name;
        a.addEventListener('click', ()=>{
            if(previousGenres.length == 0){
                previousGenres.push(genre.id);
            }else{
                if(previousGenres.includes(genre.id)){
                previousGenres.forEach((id,idx) =>{
                    if (id == genre.id){
                        previousGenres.splice(idx, 1);
                    }
                })
                }else{
                previousGenres.push(genre.id);
                }
            }
            console.log(previousGenres);
            getMovies(apiURL + '&with_genres='+ encodeURI(previousGenres.join(',')))
            highlightSelection(); // Hilighted
        })
        tagsElement.append(a);
        //added all genre dynamically
    })
}
//genres click response

function highlightSelection(){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
         tag.classList.remove('highlight') // to remove highlight
    })
    if (previousGenres.length != 0){
        previousGenres.forEach(id => {
            const highlightedGenre = document.getElementById(id);
            highlightedGenre.classList.add('highlight');
        })
    }
}



getMovies(apiURL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        if (data.results.length !== 0){
        showMovies(data.results);
        }else{
            main.innerHTML = `<h1 class="no-results">No results found</h1>`
        }
    })
}

function showMovies(data){
  main.innerHTML = '';

    data.forEach(movie => {
        // for fetching data API: object destructuring JS
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `<a href="checkoutPg.html?movie-name=${title}">
        <img src="${imgURL+poster_path}" alt="${title}">
            
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            <h4>Click for Booking and Streaming</h4>
            ${overview}
        </div>
        </a>`
        main.appendChild(movieElement);
    });
}

function getColor(vote){
    if (vote>=8){
        return 'green'
    }else if(vote>= 5){
        return 'orange'
    }else{
        return 'red'
    }
}


// When form is submmited
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    previousGenres = [];
    setGenre();
    //searching by clearing genre

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }
    // For main page after clear and enter
    else{
        getMovies(apiURL);
    }
})
// JSON for Movie genre
// https://api.themoviedb.org/3/genre/movie/list?api_key=ef09f9831c63af1b30359046b8ce6f0c

