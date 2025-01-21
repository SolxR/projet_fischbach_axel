const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        civilite: user.civilite,
        nom: user.nom,
        prenom: user.prenom,
        adresse: user.adresse,
        cp: user.cp,
        ville: user.ville,
        pays: user.pays,
        tel: user.tel,
        login: user.login,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: 'Erreur lors de la récupération de l’utilisateur'
    });
  }
});

router.put('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    await user.update(req.body);
    res.json({
      message: 'Utilisateur mis à jour avec succès',
      user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
  }
});

module.exports = router;
