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

    function createMovieListItem(movie) {//creates a list item for a movie.
         const li = document.createElement('li');

         li.textContent = movie.title;
         li.dataset.movieId = movie.Id;
         li.classList.add('item', 'film');
         li.addEventListener('click', () => updateMovieDetails(movie.Id));
         return li;
        }

    function updateMovieDetails(movieId) {//updates movie details when a movie is clicked.
        const movie = movieData.find(m => m.id === movieId)
        if (!movie) return;


        //available number of tickets for the movie.
        const availableTickets = movie.capacity - movie.tickets_sold;
        const buyTicketBtn = document.getElementById('buy-ticket');
        buyTicketBtn.textContent = availableTickets > 0 ? 'Buy Ticket': 'Sold Out';
        buyTicketBtn.classList.toggle('disabled', availableTickets=0);//returns true if the value entered is true otherwise false.

        buyTicketBtn.onclick = () => { //adds the event listener to the 'buy ticket' button for the ticket purchase.
            if(availableTickets > 0) {
                buyTicket(movie);
            }
        };

        displayMoviesDetails(movie);
    }


      function buyTicket(movie) {
        movie.tickets_sold++;

        // updates and implements tickets count display on the webpage.
        updateTicketCount(movie.id);
        updateMovieDetails(movie.id);
      }  

    
    function updateTicketCount (movieId) {
         const movie = movieData.find(m => m.id === movieId);// updates the displayed number of tickets available for a movie.

        const availableTickets = movie.capacity - movie.tickets_sold;// calculates  number of tickets available.

        document.getElementById('ticket-num').textContent = availableTickets;// update ticket count on the webpage.

        } 
        
    function displayMovieDetails(movie) {

        //display details about a movie in the details section on the webpage.
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = '${movie.runtime} minutes';
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('showtime').textContent = movie.showtime;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('poster').alt = `Poster for ${movie.title}`;

        updateTicketCount(movie.id);
    } 
    
    function showErrorMessage(message) {
        // display error message on the webpage.
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('ul', 'message', 'negative');
        document.body.appendChild(errorMessage);

        // set timeout to remove the error message 5 seconds.
        setTimeout(() => errorMessage.remove(), 5000);
    }

    // // call the fetchMoviesFromDB function to fetch movie data.
    // fetchMoviesFromDB();


});