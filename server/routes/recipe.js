const express = require("express");
const Recipe = require("../models/Recipe");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const router = express.Router();


router.post("/add", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token gerekli" });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token eksik" });
        let decoded;
        try {
            decoded = jwt.verify(token, "SECRET_KEY");
        } catch (err) {
            return res.status(401).json({ error: "Geçersiz token" });
        }
        const { title, description, ingredients, steps, image, category } = req.body;
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            image,
            category,
            author: decoded.id
        });
        await newRecipe.save();
        res.status(201).json({ message: "Tarif eklendi", recipe: newRecipe });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token gerekli" });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token eksik" });
        let decoded;
        try {
            decoded = jwt.verify(token, "SECRET_KEY");
        } catch (err) {
            return res.status(401).json({ error: "Geçersiz token" });
        }
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        if (recipe.author.toString() !== decoded.id) return res.status(403).json({ error: 'Yetkisiz işlem' });
        await Recipe.findByIdAndDelete(recipeId);
        res.json({ message: 'Tarif silindi' });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token gerekli" });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token eksik" });
        let decoded;
        try {
            decoded = jwt.verify(token, "SECRET_KEY");
        } catch (err) {
            return res.status(401).json({ error: "Geçersiz token" });
        }
        const recipeId = req.params.id;
        const { title, category, ingredients, steps, image } = req.body;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        if (recipe.author.toString() !== decoded.id) return res.status(403).json({ error: 'Yetkisiz işlem' });
        recipe.title = title;
        recipe.category = category;
        recipe.ingredients = ingredients;
        recipe.steps = steps;
        if (image) recipe.image = image;
        await recipe.save();
        res.json({ message: 'Tarif güncellendi', recipe });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        res.json({ recipe });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const recipes = await Recipe.find({ author: userId }).populate('author', 'username');
        res.json({ recipes });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});


module.exports = router;
