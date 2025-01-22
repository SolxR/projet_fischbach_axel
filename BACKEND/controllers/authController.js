const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
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

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
};

exports.register = async (req, res) => {
    try {
        const { civilite, nom, prenom, adresse, cp, ville, pays, tel, email, login, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            civilite,
            nom,
            prenom,
            adresse,
            cp,
            ville,
            pays,
            tel,
            email,
            login,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'Compte créé avec succès.',
            user: {
                id: newUser.id,
                email: newUser.email,
                civilite: newUser.civilite,
                nom: newUser.nom,
                prenom: newUser.prenom,
            },
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création du compte.' });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        console.log(`Requête de mise à jour pour ID=${id} :`, data);

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        if (!data.password) {
            delete data.password;
        } else {
            data.password = await bcrypt.hash(data.password, 10);
        }

        await user.update(data);

        res.status(200).json({
            message: `Utilisateur ID=${id} mis à jour avec succès`,
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
        console.error('Erreur lors de la mise à jour de l’utilisateur :', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
    }
};