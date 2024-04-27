// Importe o modelo de usuário
const User = require('../models/user');

// Função para obter todos os usuários
const getUsers = async (req, res) => {
    try {
        // Encontre todos os usuários no banco de dados
        const users = await User.find();
        // Responda com os usuários encontrados
        res.json(users);
    } catch (err) {
        // Em caso de erro, envie uma resposta de erro
        res.status(500).json({ message: err.message });
    }
};

// Função para obter um usuário por ID
const getUserById = async (req, res) => {
    try {
        // Encontre um usuário pelo ID fornecido
        const user = await User.findById(req.params.id);
        if (!user) {
            // Se o usuário não for encontrado, retorne um erro 404
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        // Responda com o usuário encontrado
        res.json(user);
    } catch (err) {
        // Em caso de erro, envie uma resposta de erro
        res.status(500).json({ message: err.message });
    }
};

// Função para deletar um usuário por ID
const deleteUser = async (req, res) => {
    try {
        // Encontre e delete um usuário pelo ID fornecido
        await User.findByIdAndDelete(req.params.id);
        // Responda com uma mensagem de sucesso
        res.json({ message: 'Usuário deletado' });
    } catch (err) {
        // Em caso de erro, envie uma resposta de erro
        res.status(500).json({ message: err.message });
    }
};

// Exporte as funções para serem usadas em outros lugares
module.exports = { getUsers, getUserById, deleteUser };
