const express = require('express');
const Produit = require('../models/Produit');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/produitController');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/', async (req, res) => {
    try {
        const produits = await Produit.findAll();
        res.status(200).json(produits);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
    }
});

module.exports = router;
