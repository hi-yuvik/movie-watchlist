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

if(addmovieBtn)
    {
        addmovieBtn.disabled = true;
    }

let movies = [];

function saveMovies()
{
    localStorage.setItem("movies", JSON.stringify(movies));

    console.log("Saved Movies: ", localStorage.getItem("movies"));
    console.log("Movies Array : ", movies);

    updateInsights();
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

// Render Dashboard Movies

const dashboardMovieCards = document.getElementById("dashboard-movie-cards");

function renderDashboardMovies()
{
    if(!dashboardMovieCards)
    {
        return;
    }

    dashboardMovieCards.innerHTML = "";

    const latestMovies = movies.slice(-4).reverse();

    latestMovies.forEach(function(movie)
    {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const imageCard = document.createElement("div");
        imageCard.classList.add("movie-image");

        if(movie.poster)
        {
            const moviePoster = document.createElement("img");

            moviePoster.src = movie.poster;
            moviePoster.alt = movie.title;

            imageCard.append(moviePoster);
        }

        const movieDescription = document.createElement("div");
        movieDescription.classList.add("movie-description");

        const movieTitle = document.createElement("h2");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.title;

        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        const ratingStars = document.createElement("div");
        ratingStars.classList.add("rating-stars");

        for(let i = 1; i<=5; i++)
        {
            const star = document.createElement("span");
            star.classList.add("rating-star");

            if(movie.rating!== null && i<=movie.rating)
            {
                star.textContent = "★";
            }
            else
            {
                star.textContent = "☆";
            }

            ratingStars.append(star);
        }

        movieInfo.append(ratingStars);

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

        const movieTextContent = document.createElement("div");
        movieTextContent.classList.add("movie-text-content");

        movieTextContent.append(movieDescription);

        movieCard.append(imageCard);
        movieCard.append(movieTextContent);

        dashboardMovieCards.append(movieCard);
    });
}

if(movieInput)
{
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
}

// Filter Methods //

let currentFilter = "all";
let currentSearch = "";

function filters()
{
    let filteredMovies = movies;

    if(currentFilter === "watched")
    {
        filteredMovies = movies.filter(function(movie)
        {
            return movie.watched === true;
        });
    }

    else if(currentFilter === "unwatched")
    {
        filteredMovies = movies.filter(function(movie)
        {
            return movie.watched === false;
        });
    }

    if(currentFilter!== "")
    {
        filteredMovies = filteredMovies.filter(function(movie)
        {
            return movie.title.toLowerCase().includes(currentSearch);
        });
    }

    return filteredMovies;
}

const filterBtns = document.querySelectorAll("[data-filter]");

filterBtns.forEach(function(btn)
{
    btn.addEventListener("click", function()
    {
        currentFilter = btn.dataset.filter;

        filterBtns.forEach(function(filterBtn)
        {
            filterBtn.classList.remove("active");
        });

        btn.classList.add("active");
        renderMovies();
    });
});

const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

if(searchBar && searchBtn)
{
    searchBtn.addEventListener("click", function(event)
    {
        event.preventDefault();
        currentSearch = searchBar.value.trim().toLowerCase();

        renderMovies();
    });

    searchBar.addEventListener("keydown", function(event)
    {
        if(event.key === "Enter")
        {
            event.preventDefault();
            currentSearch = searchBar.value.trim().toLowerCase();
            renderMovies();
        }
    });
}

// Render Movies //

function renderMovies()
{
    if(!movieposterCards || !watchlistEmpty)
    {
        return;
    }

    movieposterCards.innerHTML = "";

    /* if(movies.length === 0)
    {
        watchlistEmpty.style.display = "block";
        return 
    }
    else
    {
        watchlistEmpty.style.display = "none";
    } */

    const filteredMovies = filters();

    if(filteredMovies.length === 0)
    {
        watchlistEmpty.style.display = "block";
        return;
    }
    else
    {
        watchlistEmpty.style.display = "none";
    }

    filteredMovies.forEach(function(movie)
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
                renderAllMovies();
            });

            ratingStars.append(star);
        }

        movieInfo.append(ratingStars);

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
            renderAllMovies();
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
            renderAllMovies();
        });

        movieActions.append(deleteBtn);

        movieCard.append(imageCard);

        // Created divs to put footer content into 1 div

        const movieTextContent = document.createElement("div");
        movieTextContent.classList.add("movie-text-content");

        movieTextContent.append(movieDescription);
        movieTextContent.append(movieActions);

        movieCard.append(movieTextContent);

        movieposterCards.append(movieCard);
    });
}

function renderAllMovies()
{
    renderMovies();
    renderDashboardMovies();
}

loadMovies();
renderAllMovies();

// Type and Add Movie //

if(addmovieForm)
{

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
                renderAllMovies();
            };

            reader.readAsDataURL(posterFile);
        }
        else
        {
            movies.push(movie);
            saveMovies();
            renderAllMovies();
        }

        movieInput.value = "";
        posterInput.value = "";

        if(addmovieBtn)
        {
            addmovieBtn.disabled = true;   
        }
    });
}

// ========================================
// INSIGHTS SECTION
// ========================================

function updateInsights()
{
    // Get saved movies
    let insSavedMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Select HTML elements
    let insTotalMoviesElement = document.querySelector("#ins-total-movies");
    let insWatchedMoviesElement = document.querySelector("#ins-watched-movies");
    let insUnwatchedMoviesElement = document.querySelector("#ins-unwatched-movies");
    let insAverageRatingElement = document.querySelector("#ins-average-rating");
    let insCompletionPercentageElement = document.querySelector("#completion-percentage");
    let insProgressFillElement = document.querySelector("#progress-fill");

    // Calculate total movies
    let insTotalCount = insSavedMovies.length;

    // Calculate watched movies
    let insWatchedCount = insSavedMovies.filter(function(movie)
    {
        return movie.watched === true;
    }).length;

    // Calculate unwatched movies
    let insUnwatchedCount = insTotalCount - insWatchedCount;

    // Get movies that have valid ratings
    let insRatedMovies = insSavedMovies.filter(function(movie)
    {
        return typeof movie.rating === "number" &&
               movie.rating >= 1 &&
               movie.rating <= 5;
    });

    // Calculate the total of all ratings
    let insRatingSum = insRatedMovies.reduce(function(sum, movie)
    {
        return sum + movie.rating;
    }, 0);

    // Calculate average rating
    let insAverageRating = insRatedMovies.length > 0
        ? (insRatingSum / insRatedMovies.length).toFixed(1)
        : "—";

    // Calculate completion percentage
    let insCompletion = insTotalCount > 0
        ? Math.round((insWatchedCount / insTotalCount) * 100)
        : 0;

    // Display total movies
    if(insTotalMoviesElement)
    {
        insTotalMoviesElement.textContent = insTotalCount;
    }

    // Display watched movies
    if(insWatchedMoviesElement)
    {
        insWatchedMoviesElement.textContent = insWatchedCount;
    }

    // Display unwatched movies
    if(insUnwatchedMoviesElement)
    {
        insUnwatchedMoviesElement.textContent = insUnwatchedCount;
    }

    // Display average rating
    if(insAverageRatingElement)
    {
        insAverageRatingElement.textContent = insAverageRating === "—"
            ? "—"
            : insAverageRating + " / 5";
    }

    // Display completion percentage
    if(insCompletionPercentageElement)
    {
        insCompletionPercentageElement.textContent = insCompletion + "%";
    }

    // Update progress bar width
    if(insProgressFillElement)
    {
        insProgressFillElement.style.width = insCompletion + "%";
    }
}

updateInsights();
























