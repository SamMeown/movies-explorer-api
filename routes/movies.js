const router = require('express').Router();
const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateAddMovie, validateDeleteMovie } = require('../validators/movie');

router.get('/', getMovies);
router.post('/', validateAddMovie, addMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
