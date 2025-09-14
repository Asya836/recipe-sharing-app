const express = require("express");
const Recipe = require("../models/Recipe");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const router = express.Router();

// Tarif beğen (likeCount artır)
const User = require("../models/User");

// Tarif beğen (likeCount artır)
router.post('/:id/like', async (req, res) => {
    try {
        const recipeId = req.params.id;
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
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        recipe.likeCount = (recipe.likeCount || 0) + 1;
        await recipe.save();
        // Kullanıcıya ekle
        await User.findByIdAndUpdate(decoded.id, { $addToSet: { likedRecipes: recipeId } });
        res.json({ likeCount: recipe.likeCount });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Tarif beğeniyi geri al (likeCount azalt)
router.post('/:id/unlike', async (req, res) => {
    try {
        const recipeId = req.params.id;
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
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        recipe.likeCount = Math.max((recipe.likeCount || 1) - 1, 0);
        await recipe.save();
        // Kullanıcıdan çıkar
        await User.findByIdAndUpdate(decoded.id, { $pull: { likedRecipes: recipeId } });
        res.json({ likeCount: recipe.likeCount });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Tarif kaydet (saveCount artır)
router.post('/:id/save', async (req, res) => {
    try {
        const recipeId = req.params.id;
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
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        recipe.saveCount = (recipe.saveCount || 0) + 1;
        await recipe.save();
        // Kullanıcıya ekle
        await User.findByIdAndUpdate(decoded.id, { $addToSet: { savedRecipes: recipeId } });
        res.json({ saveCount: recipe.saveCount });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Tarif kaydetmeyi geri al (saveCount azalt)
router.post('/:id/unsave', async (req, res) => {
    try {
        const recipeId = req.params.id;
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
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı' });
        recipe.saveCount = Math.max((recipe.saveCount || 1) - 1, 0);
        await recipe.save();
        // Kullanıcıdan çıkar
        await User.findByIdAndUpdate(decoded.id, { $pull: { savedRecipes: recipeId } });
        res.json({ saveCount: recipe.saveCount });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// ...existing code...

// uploads klasörüne kaydet
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Resim yükleme endpoint'i
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenemedi' });
    }
    // Sunulan dosyanın URL'si
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});



// Tarif sil
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

// Tarif güncelle
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


// Belirli bir tarifin detayını getir
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

// Tarif ekle
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

// Tüm tarifleri getir
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'username');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Belirli bir kullanıcının tariflerini getir

// Belirli bir kullanıcının tariflerini getir
router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const recipes = await Recipe.find({ author: userId }).populate('author', 'username');
        res.json({ recipes });
    } catch (err) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Giriş yapan kullanıcının beğendiği tarifler
router.get('/liked', async (req, res) => {
    console.log("/recipe/liked endpoint çağrıldı");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token gerekli" });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token eksik" });
        let decoded;
        try {
            decoded = jwt.verify(token, "SECRET_KEY");
        } catch (err) {
            console.error("JWT doğrulama hatası:", err);
            return res.status(401).json({ error: "Geçersiz token" });
        }
        let user, userError = null, userAlt = null, userAltError = null;
        try {
            user = await User.findById(decoded.id).populate({ path: 'likedRecipes', populate: { path: 'author', select: 'username' } });
        } catch (e) {
            userError = e;
        }
        try {
            userAlt = await User.findOne({ _id: decoded.id }).populate({ path: 'likedRecipes', populate: { path: 'author', select: 'username' } });
        } catch (e) {
            userAltError = e;
        }
        console.log("DEBUG /liked", { decodedId: decoded.id, user, userError, userAlt, userAltError });
        if (!user && !userAlt) {
            return res.json({ recipes: [], debugId: decoded.id, debugUser: null, userError: userError ? userError.toString() : null, userAltError: userAltError ? userAltError.toString() : null });
        }
        res.json({ recipes: Array.isArray((user || userAlt).likedRecipes) ? (user || userAlt).likedRecipes : [], debugId: decoded.id, debugUser: user || userAlt });
    } catch (err) {
        console.error("/recipe/liked endpoint hatası:", err);
        res.status(500).json({ error: 'Sunucu hatası', details: err.message, stack: err.stack, err: JSON.stringify(err) });
    }
});

// Giriş yapan kullanıcının kaydettiği tarifler
router.get('/saved', async (req, res) => {
    console.log("/recipe/saved endpoint çağrıldı");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token gerekli" });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Token eksik" });
        let decoded;
        try {
            decoded = jwt.verify(token, "SECRET_KEY");
        } catch (err) {
            console.error("JWT doğrulama hatası:", err);
            return res.status(401).json({ error: "Geçersiz token" });
        }
        let user, userError = null, userAlt = null, userAltError = null;
        try {
            user = await User.findById(decoded.id).populate({ path: 'savedRecipes', populate: { path: 'author', select: 'username' } });
        } catch (e) {
            userError = e;
        }
        try {
            userAlt = await User.findOne({ _id: decoded.id }).populate({ path: 'savedRecipes', populate: { path: 'author', select: 'username' } });
        } catch (e) {
            userAltError = e;
        }
        console.log("DEBUG /saved", { decodedId: decoded.id, user, userError, userAlt, userAltError });
        if (!user && !userAlt) {
            return res.json({ recipes: [], debugId: decoded.id, debugUser: null, userError: userError ? userError.toString() : null, userAltError: userAltError ? userAltError.toString() : null });
        }
        res.json({ recipes: Array.isArray((user || userAlt).savedRecipes) ? (user || userAlt).savedRecipes : [], debugId: decoded.id, debugUser: user || userAlt });
    } catch (err) {
        console.error("/recipe/saved endpoint hatası:", err);
        res.status(500).json({ error: 'Sunucu hatası', details: err.message, stack: err.stack, err: JSON.stringify(err) });
    }
});


module.exports = router;
