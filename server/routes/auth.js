
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// DELETE (kullanıcı sil)
router.delete("/delete", async (req, res) => {
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
        const user = await User.findByIdAndDelete(decoded.id);
        if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        res.json({ message: "Kullanıcı silindi" });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Kayıt başarılı!" });
    } catch (err) {
        res.status(400).json({ error: "Kayıt sırasında hata oluştu." });
    }
});


// UPDATE (profil güncelle)
router.put("/update", async (req, res) => {
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
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(
            decoded.id,
            { username, email },
            { new: true, runValidators: true, select: "-password" }
        );
        if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        res.json({ user, message: "Profil güncellendi" });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

module.exports = router;



const jwt = require("jsonwebtoken");


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bul
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı" });

        // Şifre doğru mu?
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: "Hatalı şifre" });

        // Token oluştur
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

        res.json({ message: "Giriş başarılı", token });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// ME (profil bilgisi)
router.get("/me", async (req, res) => {
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
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});
