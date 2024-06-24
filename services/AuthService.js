const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const secretKey = process.env.SECRET_KEY; 

exports.register = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashedPassword });
    return user;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Senha incorreta');

    const token = jwt.sign({ id: user.id, name:user.name, email: user.email }, secretKey, { expiresIn: '8h' });
    return token;
};
