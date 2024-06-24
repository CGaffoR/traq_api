const authService = require('../services/AuthService');
const ProfileService = require('../services/ProfileService');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await authService.register(name, email, password);
        const profile = await ProfileService.createProfile(user.name, user.id);
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('email: '+email);
    try {
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};