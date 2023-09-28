const router = require('express').Router();
const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.post('/', addMovie);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovie);

module.exports = router;
