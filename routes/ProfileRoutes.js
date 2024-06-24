// routes/profileRoutes.js
const express = require('express');
const multer = require('multer');
const { validationToken } = require('../services/ValidateToken');
const path = require('path');
const ProfileController = require('../controllers/ProfileController');

const router = express.Router();

// Configuração do Multer para upload de arquivos com renomeação
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const userId = req.params.userId;
    const fileName = `${userId}-${file.fieldname}${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2MB por arquivo
});

router.get('/profile/:userId', ProfileController.getProfile);

router.put('/profile/', validationToken, ProfileController.updateProfile);

module.exports = router;
