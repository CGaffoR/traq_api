// controllers/profileController.js
const profileService = require('../services/ProfileService');

const createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfile(req.body);
    res.json(profile);
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await profileService.getProfile(userId);
    res.json(profile);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.json(profile);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

module.exports = {
  updateProfile,
  getProfile
};
