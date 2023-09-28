const router = require('express').Router();
const { addMovie, getMovies } = require('../controllers/movies');

router.post('/', addMovie);
router.get('/', getMovies);

module.exports = router;
