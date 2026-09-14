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

const addmovieForm = document.getElementById("add-movie-form");
const movieInput = document.getElementById("movie-input");
const posterInput = document.getElementById("poster-input");
const addmovieBtn = document.getElementById("add-movie-btn");
const movieposterCards = document.getElementById("movie-poster-cards");
const watchlistEmpty = document.getElementById("watchlist-empty");

let movies = [];
console.log(addmovieForm);

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

        const moviePoster = document.createElement("img");
        moviePoster.src = movie.poster;
        moviePoster.alt = movie.title;

        movieCard.append(moviePoster);


        // Creating Movie Card & Title

        const movieTitle = document.createElement("h2");
        movieTitle.textContent = movie.title;

        movieCard.append(movieTitle);

        // Creating movie status(watched or not)

        const movieStatus = document.createElement("p");
        if(movie.watched)
        {
            movieStatus.textContent = "Watched";
        }
        else{
            movieStatus.textContent = "Not Watched";
        }

        movieCard.append(movieStatus);

        // Creating movie rating

        const movieRating = document.createElement("p");
        if(movie.rating === null)
        {
            movieRating.textContent = "Rating: --";
        }
        else
        {
            movieRating.textContent = `Rating : ${movie.rating}`;
        }

        movieCard.append(movieRating);

        // Add Watched Button & Status Update

        const watchedBtn = document.createElement("button");
        watchedBtn.textContent = "Watched";

        watchedBtn.dataset.id = movie.id;

        watchedBtn.addEventListener("click", function(event)
        {
            const movieId = event.currentTarget.dataset.id;

            const movieIndex = movies.findIndex(function(movie)
            {
                return movie.id === Number(movieId);
            });

            movies[movieIndex].watched = !movies[movieIndex].watched;

            renderMovies();
        });

        movieCard.append(watchedBtn);

        // Add Delete Button & Status Update

        const deleteBtn = document.createElement("button");
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
            renderMovies();
        });

        movieCard.append(deleteBtn);

        // Add Rating and Rating Update

        const movieTitleRating = document.createElement("div");
        movieTitleRating.classList.add("movietitle-rating");

        const movieTitle = document.createElement("h2");
        movieTitle.textContent = movie.title;

        const movieRating = document.createElement("p");

        if(movie.rating === null)
        {
            movieRating.textContent = "Rating: --"
        }
        else
        {
            movieRating.textContent = "Rating: ";

            for(i = 1; i<=5; i++)
            {
                if(i<=movie.rating)
                {
                    movieRating.textContent += "★";
                }
                else
                {
                    movieRating.textContent += "☆";
                }
            }
        }

        movieRating.dataset.id = movie.id;

        movieRating.addEventListener("click", function(event)
        {
            const movieId = event.currentTarget.dataset.id;
            const movieIndex = movies.findIndex(function(movie)
            {
                return movie.id === Number(movieId);
            });

            const ratingStars = document.createElement("div");
            ratingStars.classList.add("rating-stars");

            for(let i = 1; i<=5; i++)
            {
                const star = document.createElement("button");

                star.textContent = "☆";
                star.dataset.rating = i;

                star.addEventListener("click", function(event)
                {
                    const rating = Number(event.currentTarget.dataset.rating);

                    movies[movieIndex].rating = rating;
                    renderMovies();
                });

                ratingStars.append(star);
            }

            movieTitleRating.append(ratingStars);
        });

        movieTitleRating.append(movieTitle);
        movieTitleRating.append(movieRating);
    });
}

// Type and Add Movie //

addmovieForm.addEventListener("submit", function(event)
{
    event.preventDefault();
    const movieTitle = movieInput.value.trim();
    const posterFile = posterInput.files[0];

    if(!posterFile)
    {
        console.log("No poster selected");
        return
    }

    const reader = new FileReader();
    reader.onload = function()
    {
        const movie = 
        {
            title: movieTitle,
            id: Date.now(),
            watched: false,
            rating: null,
            poster: reader.result
        };

        movies.push(movie);
        renderMovies();

        movieInput.value = "";
        posterInput.value = "";
    };

    reader.readAsDataURL(posterFile);
});




