const navbar = document.getElementById("navbar");

function handleScroll()
{
    console.log(window.scrollY);
    
    if(window.scrollY > 20)
    {
        navbar.classList.add("sticky");
    }
    else
    {
        navbar.classList.remove("sticky");
    }
}

window.addEventListener("scroll", handleScroll);

const movieInput = document.getElementById("movie-input");
const posterInput = document.getElementById("poster-input");
const addmovieBtn = document.getElementById("add-movie-btn");
const addmovieForm = document.getElementById("add-movie-form");
const movieposterCards = document.getElementById("movie-poster-cards");
const watchlistEmpty = document.getElementById("watchlist-empty");

addmovieBtn.disabled = true;

let movies = [];

function saveMovies()
{
    localStorage.setItem("movies", JSON.stringify(movies));

    console.log("Saved Movies: ", localStorage.getItem("movies"));
    console.log("Movies Array : ", movies);
}

function loadMovies()
{
    const savedMovies = localStorage.getItem("movies");

    if(savedMovies)
    {
        movies = JSON.parse(savedMovies);
    }

    console.log("Loaded Movies: ", movies);
}

movieInput.addEventListener("input", function()
    {
        if(movieInput.value.trim() === "")
        {
            addmovieBtn.disabled = true;
        }
        else
        {
            addmovieBtn.disabled = false;
        }
    });

// Render Movies //

function renderMovies()
{
    movieposterCards.innerHTML = "";

    if(movies.length === 0)
    {
        watchlistEmpty.style.display = "block";
        return 
    }
    else
    {
        watchlistEmpty.style.display = "none";
    }

    movies.forEach(function(movie)
    {

        // Creating div and movie-card class

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Creating poster variable to store

        const imageCard = document.createElement("div");
        imageCard.classList.add("movie-image");

        const moviePoster = document.createElement("img");

        if(movie.poster)
        {
            moviePoster.src = movie.poster;
            moviePoster.alt = movie.title;

            imageCard.append(moviePoster);
        }

        // Creating Movie Title & Description

        const movieDescription = document.createElement("div");
        movieDescription.classList.add("movie-description");

        const movieTitle = document.createElement("h2");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;

        // Creating movie info

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        // Creating Rating
        
        const movieRating = document.createElement("div");
        movieRating.classList.add("movie-rating");

        const ratingStars = document.createElement("div");
        ratingStars.classList.add("rating-stars");

        const movieIndex = movies.findIndex(function(movieItem)
        {
            return movieItem.id === movie.id;
        });

        for(let i = 1; i <= 5; i++)
        {
            const star = document.createElement("button");

            star.type = "button";
            star.classList.add("rating-star");
            star.textContent = "☆";
            star.dataset.rating = i;

            if(movie.rating !== null && i <= movie.rating)
            {
                star.textContent = "★";
            }

            star.addEventListener("click", function(event)
            {
                event.stopPropagation();

                const rating = Number(event.currentTarget.dataset.rating);

                movies[movieIndex].rating = rating;

                saveMovies();
                renderMovies();
            });

            ratingStars.append(star);
        }

        movieRating.append(ratingStars);

        movieInfo.append(movieRating);

        // Movie watched status(watched or not)

        const movieStatus = document.createElement("p");
        movieStatus.classList.add("movie-status");

        if(movie.watched)
        {
            movieStatus.textContent = "Watched";
        }
        else
        {
            movieStatus.textContent = "Not Watched";
        }

        movieInfo.append(movieStatus);

        movieDescription.append(movieTitle);
        movieDescription.append(movieInfo);

        // Creating Movie Actions

        const movieActions = document.createElement("div");
        movieActions.classList.add("movie-actions");

        // Add Watched Button & Status Update

        const watchedBtn = document.createElement("button");
        watchedBtn.classList.add("watch-btn");

        if(movie.watched)
        {
            watchedBtn.textContent = "Unwatched";
        }
        else
        {
            watchedBtn.textContent = "Watched";
        }

        watchedBtn.dataset.id = movie.id;

        watchedBtn.addEventListener("click", function(event)
        {
            const movieId = event.currentTarget.dataset.id;

            const movieIndex = movies.findIndex(function(movie)
            {
                return movie.id === Number(movieId);
            });

            movies[movieIndex].watched = !movies[movieIndex].watched;

            saveMovies();
            renderMovies();
        });

        movieActions.append(watchedBtn);

        // Add Delete Button & Status Update

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");

        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = movie.id;

        deleteBtn.addEventListener("click", function(event)
        {
            const movieId = event.currentTarget.dataset.id;
            console.log(movieId);
            
            const movieIndex = movies.findIndex(function(movie)
            {
                return movie.id === Number(movieId);
            });

            movies.splice(movieIndex, 1);

            saveMovies();
            renderMovies();
        });

        movieActions.append(deleteBtn);

        movieCard.append(imageCard);

        // Created divs to put footer content into 1 div

        const movieFooter = document.createElement("div");
        movieFooter.classList.add("movie-footer");

        movieFooter.append(movieDescription);
        movieFooter.append(movieActions);

        movieCard.append(movieFooter);

        movieposterCards.append(movieCard);
    });
}

loadMovies();
renderMovies();

// Type and Add Movie //

addmovieForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log("FORM SUBMITTED");

    const movieTitle = movieInput.value.trim();
    const posterFile = posterInput.files[0];

    const movie = 
    {
        title: movieTitle,
        id: Date.now(),
        watched: false,
        rating: null,
        poster: null
    };

    if(posterFile)
    {
        const reader = new FileReader();

        reader.onload = function()
        {
            movie.poster = reader.result;

            movies.push(movie);
            saveMovies();
            renderMovies();
        };

        reader.readAsDataURL(posterFile);
    }
    else
    {
        movies.push(movie);
        saveMovies();
        renderMovies();
    }

    movieInput.value = "";
    posterInput.value = "";
    addmovieBtn.disabled = true;

});


























