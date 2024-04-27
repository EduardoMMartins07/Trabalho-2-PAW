// Importe o mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Conecte-se ao banco de dados MongoDB (nome do banco de dados: movieDB)
mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Obtenha uma referência para a conexão do banco de dados
const db = mongoose.connection;

// Escute por erros de conexão
db.on('error', (error) => console.error(error));

// Uma vez que a conexão estiver aberta, registre uma mensagem de sucesso
db.once('open', () => console.log('Connected to database'));
