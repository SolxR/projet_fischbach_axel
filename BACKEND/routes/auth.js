const express = require('express');
const { login, register, updateUserById } = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

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

router.put('/me/:id', auth, updateUserById);

module.exports = router;
