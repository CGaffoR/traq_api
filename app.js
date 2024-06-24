//app.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

require('dotenv').config();

const app = express();

const { User } = require('./models');

const port = process.env.POgetUserNameRT || 3000;

app.use(express.json()); 
app.use(cors());

const authRoutes = require('./routes/AuthRoutes');
app.use('/api/auth', authRoutes)

const profileRoutes = require('./routes/ProfileRoutes');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', profileRoutes);

app.get('/', (req, res) => {
    console.log('Hello, World!');
    res.send('Hello, World!');
});

app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item One' },
        { id: 2, name: 'Item Two' },
        { id: 3, name: 'Item Three' }
    ];
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    console.log('New item created:', newItem);
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`Servidor ativo em: http://localhost:${port}`);
});
