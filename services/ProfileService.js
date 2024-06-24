// services/profileService.js
const { Profile } = require('../models/index');
const sharp = require('sharp');
const path = require('path');

const createProfile = async (name, userId) => {
    try {
      console.log('name: '+name+' userId: '+userId);
        return await Profile.create({ name, userId });
    } catch (error) {
      console.log(error.error);
        throw new Error('Erro ao criar perfil');
    }
}

const getProfile = async (userId) => {
  try {
    return await Profile.findOne(
      {
        where: { userId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] }
      }
    );
  } catch (error) {
    throw new Error('Erro ao buscar perfil');
  }
}

const updateProfile = async (userId, data, files = null) => {
  const { name, specialization, description , profilePicture, backgroundPicture} = data;
  // const profilePicture = files['profilePicture'] ? files['profilePicture'][0] : null;
  // const backgroundPicture = files['backgroundPicture'] ? files['backgroundPicture'][0] : null;

  let profile = await Profile.findOne({userId});
  if (!profile) {
    profile = await Profile.create({ id: userId });
  }

  // if (profilePicture) {
  //   const profilePicturePath = path.join(__dirname, '../uploads', `${userId}-profile.jpg`);
  //   await sharp(profilePicture.path)
  //     .resize(200, 200)
  //     .toFile(profilePicturePath);
  //   profile.profilePicture = profilePicturePath;
  // }

  // if (backgroundPicture) {
  //   const backgroundPicturePath = path.join(__dirname, '../uploads', `${userId}-background.jpg`);
  //   await sharp(backgroundPicture.path)
  //     .resize(800, 600)
  //     .toFile(backgroundPicturePath);
  //   profile.backgroundPicture = backgroundPicturePath;
  // }

  if (name) profile.name = name;
  if (specialization) profile.specialization = specialization;
  if (description) profile.description = description;
  if (profilePicture) profile.profilePicture = profilePicture;
  if (backgroundPicture) profile.backgroundPicture = backgroundPicture;

  await profile.save();
  return profile;
};

module.exports = {
  updateProfile,
  createProfile,
  getProfile
};
