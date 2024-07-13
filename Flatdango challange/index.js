document.addEventListener('DOMContentLoaded', () => {

    const movieList = document.getElementById('films');
    let movieData = [];

    function fetchMoviesFromDB() {
        fetch("db.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("error fetching movies at db.json");
            }
            return res.json();
        })
        .then(data => {
            movieData = data.films;
            displayMovies();//call the 'displayMovies' function which shows the movies on the webpage.
        })
        .catch(error => {
            console.error('error fetching movies at db.json:', error);
            showErrorMessage('error loading movies');
        });
    }

    function displayMovies() {// displays the list of movies on a webpage.
        movieData.forEach(movie => {
            const li = createMovieListItem(movie);
            movieList.appendChild(li);//append the items to the movieList element on the webpage.
        });
    }

    


})