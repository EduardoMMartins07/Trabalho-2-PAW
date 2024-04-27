// Importe as bibliotecas necessárias
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT
const bcrypt = require('bcrypt'); // Para criptografar senhas
const User = require('../models/user'); // Modelo de usuário

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifique se o email já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Este email já está em uso' });
        }

        // Criptografe a senha antes de armazená-la no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crie um novo usuário
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Salve o novo usuário no banco de dados
        await newUser.save();

        // Gere um token JWT para o novo usuário
        const accessToken = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.ACCESS_TOKEN_SECRET);

        // Responda com o token JWT
        res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        // Em caso de erro, envie uma resposta de erro
        res.status(500).json({ message: err.message });
    }
};

// Função para fazer login do usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifique se o usuário existe no banco de dados
        const user = await User.findOne({ email });
        if (!user) {
            // Se não existir, retorne um erro de autenticação
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Verifique se a senha está correta
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // Se a senha estiver incorreta, retorne um erro de autenticação
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        // Se as credenciais estiverem corretas, gere um token JWT
        const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET);

        // Responda com o token JWT
        res.json({ accessToken: accessToken });
    } catch (err) {
        // Em caso de erro, envie uma resposta de erro
        res.status(500).json({ message: err.message });
    }
};

// Exporte as funções para serem usadas em outros lugares
module.exports = { registerUser, loginUser };
