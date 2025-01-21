const express = require('express');
const { login, register } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Connexion
router.post('/login', login);

// Création de compte
router.post('/register', register);

// Récupérer les infos de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur' });
    }
});

// Modifier l'utilisateur
router.put('/me/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Ne pas mettre à jour le mot de passe s'il est vide
        if (!data.password) {
            delete data.password;
        } else {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.update(data);
        res.json({ message: `Utilisateur ID=${id} mis à jour avec succès`, user });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
    }
});

module.exports = router;
