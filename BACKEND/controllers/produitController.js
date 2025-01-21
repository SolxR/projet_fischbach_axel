const Product = require('../models/Produit');

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const newProduct = await Product.create({ name, price, description });
        res.status(201).json({ message: 'Produit créé avec succès', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création du produit' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        await product.update({ name, price, description });
        res.status(200).json({ message: 'Produit mis à jour avec succès', product });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
    }
};
