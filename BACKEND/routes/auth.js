const express = require('express');
const { login, register, updateUserById } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route pour la connexion
router.post('/login', login);

// Route pour la création de compte
router.post('/register', register);

// Route pour récupérer les infos de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user); // Renvoie l'objet utilisateur complet
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
    }
});

// Route pour mettre à jour les informations utilisateur
router.put('/me/:id', auth, updateUserById); // Ajout de la route ici

module.exports = router;
