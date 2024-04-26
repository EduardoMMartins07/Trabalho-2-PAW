const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const authenticateToken = require('../middleware/authenticate');

// Middleware de autenticação para proteger as rotas de filmes
router.use(authenticateToken);

// Rota para obter todos os filmes
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo filme
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        year: req.body.year
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para atualizar um filme
router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um filme
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
