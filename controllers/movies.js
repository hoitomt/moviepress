// Demo comment for demonstration
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const popularMoviesURL = `http://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`;
  axios.get(popularMoviesURL)
  .then((api_res) => {
    res.render('application', {
      locals: {
        user: req.user,
        movies: api_res.data
      },
      partials: {
        yield: 'views/movies/index.html'
      },
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get('/movies/:id', (req, res) => {
  const movieUrl = `http://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIE_API_KEY}&language=en-US`;
  axios.get(movieUrl)
  .then((api_res) => {
    res.render('application', {
      locals: {
        user: req.user,
        movie: api_res.data
      },
      partials: {
        yield: 'views/movies/show.html'
      }
    });
  }).catch((err) => {
    console.log(err);
  });
})

module.exports = router;
