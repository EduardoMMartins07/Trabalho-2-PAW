// Importe a biblioteca jsonwebtoken
const jwt = require('jsonwebtoken');

// Middleware para autenticação de token JWT
const authenticateToken = (req, res, next) => {
    // Obtenha o token do cabeçalho Authorization da requisição
    const token = req.header('Authorization');
    // Verifique se o token está ausente
    if (token == null) return res.sendStatus(401);

    // Verifique se o token é válido
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Se houver um erro ao verificar o token, retorne status 403 (proibido)
        if (err) return res.sendStatus(403);
        // Se o token for válido, passe o usuário decodificado para a próxima função de middleware
        req.user = user;
        next();
    });
};

// Exporte o middleware para ser usado em outras rotas
module.exports = authenticateToken;
