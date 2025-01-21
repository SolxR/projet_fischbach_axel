const { MOCK_USER } = require('../data/user.mock.js');
const { PRODUCTS } = require('../data/product.mock.js');
const User = require('../models/User');
const Product = require('../models/Produit');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        const existingUser = await User.findOne({ where: { email: MOCK_USER.email } });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(MOCK_USER.password, 10);
            await User.create({ ...MOCK_USER, password: hashedPassword });
            console.log('Utilisateur fictif inséré.');
        } else {
            console.log('Utilisateur fictif déjà existant.');
        }

        for (const product of PRODUCTS) {
            const existingProduct = await Product.findOne({ where: { name: product.name } });
            if (!existingProduct) {
                await Product.create(product);
            }
        }
        console.log('Produits fictifs insérés.');
    } catch (err) {
        console.error('Erreur lors de l’insertion des données fictives :', err);
    }
};

module.exports = { seedDatabase };
