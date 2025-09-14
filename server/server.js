console.log("Sunucu debug aktif");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/authdb")
    .then(() => console.log("MongoDB bağlantısı başarılı"))
    .catch(err => console.error(err));



// uploads klasörünü statik olarak sun
app.use('/uploads', express.static('uploads'));

app.listen(5000, () => console.log("Server 5000 portunda çalışıyor"));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const recipeRoutes = require("./routes/recipe");
app.use("/recipe", recipeRoutes);
