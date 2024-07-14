document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000'; 

    // Selecting DOM elements
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');

    // Template elements
    const filmTemplate = document.getElementById('film-template');
    const movieDetailsTemplate = document.getElementById('movie-details-template');

    // Function to fetch movie details by ID
    const fetchMovieDetails = (id) => {
        fetch(`${apiUrl}/films/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(movie => {
                displayMovieDetails(movie);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    };

    // Function to display movie details on the page
    const displayMovieDetails = (movie) => {
        const moviePoster = movieDetailsTemplate.content.querySelector('.movie-poster');
        const movieTitle = movieDetailsTemplate.content.querySelector('.movie-title');
        const movieDescription = movieDetailsTemplate.content.querySelector('.movie-description');
        const movieRuntime = movieDetailsTemplate.content.querySelector('.movie-runtime');
        const movieShowtime = movieDetailsTemplate.content.querySelector('.movie-showtime');
        const availableTickets = movieDetailsTemplate.content.querySelector('.available-tickets');
        const buyTicketBtn = movieDetailsTemplate.content.querySelector('.buy-ticket');

        moviePoster.src = movie.poster;
        moviePoster.alt = `${movie.title} Poster`;
        movieTitle.textContent = movie.title;
        movieDescription.textContent = movie.description;
        movieRuntime.textContent = movie.runtime;
        movieShowtime.textContent = movie.showtime;
        availableTickets.textContent = movie.capacity - movie.tickets_sold;

        buyTicketBtn.addEventListener('click', () => {
            buyTicket(movie);
        });

        // Clear previous content and append new details
        movieDetails.innerHTML = '';
        movieDetails.appendChild(movieDetailsTemplate.content.cloneNode(true));
    };

    // // Function to handle buying a ticket
    // const buyTicket = (movie) => {
    //     if (movie.tickets_sold < movie.capacity) {
    //         movie.tickets_sold++;
    //         displayMovieDetails(movie); // Update displayed tickets count
    //         // Optional: Update backend via PATCH request (bonus deliverable)
    //     } else {
    //         alert('This showing is sold out!');
    //     }
    // };

    // Function to fetch all movies and display in the menu
    const fetchAllMovies = () => {
        fetch(`${apiUrl}/films`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(movies => {
                displayMovieList(movies);
                fetchMovieDetails(movies[0].id); // Display details of the first movie by default
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    };

    // Function to display movie list in the sidebar
    const displayMovieList = (movies) => {
        movies.forEach(movie => {
            const clone = document.importNode(filmTemplate.content, true);
            const filmItem = clone.querySelector('.film.item');
            filmItem.textContent = movie.title;
            filmItem.dataset.movieId = movie.id;

            filmItem.addEventListener('click', () => {
                fetchMovieDetails(movie.id);
            });

            filmsList.appendChild(clone);
        });
    };

    // Initial function call to fetch all movies
    fetchAllMovies();
});