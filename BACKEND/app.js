const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db.js');
const User = require('./models/User.js');
const Produit = require('./models/Produit.js');
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/produit.js');
const auth = require('./middleware/auth.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/produit', productRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion réussie à la base de données');

        await sequelize.sync({ alter: true });
        console.log('Modèles synchronisés avec la base de données');

        console.log('Aucune donnée fictive n’a été insérée.');

        const PORT = process.env.PORT || 5432;
        app.listen(PORT, () => {
            console.log(`Le serveur tourne sur http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Erreur lors du démarrage du serveur :', err);
    }
};

startServer();
