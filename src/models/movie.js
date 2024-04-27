// Importe o mongoose para criar o esquema do filme
const mongoose = require('mongoose');

// Defina o esquema do filme
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Título do filme (obrigatório)
    description: { type: String, required: true }, // Descrição do filme (obrigatório)
    genre: { type: String, required: true }, // Gênero do filme (obrigatório)
    year: { type: Number, required: true } // Ano do filme (obrigatório)
});

// Crie o modelo Movie com base no esquema
const Movie = mongoose.model('Movie', movieSchema);

// Exporte o modelo para ser usado em outras partes do aplicativo
module.exports = Movie;
