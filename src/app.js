const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Rotas
app.use('/api', require('./routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
