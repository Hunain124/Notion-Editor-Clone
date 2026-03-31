const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const dbURI = "mongodb://hunainshahid032_db_user:VGBV9IsUozAimyMR@cluster0-shard-00-00.kchaw9o.mongodb.net:27017,cluster0-shard-00-01.kchaw9o.mongodb.net:27017,cluster0-shard-00-02.kchaw9o.mongodb.net:27017/neonNotion?ssl=true&replicaSet=atlas-k8p9z6-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(dbURI, {
    tlsInsecure: true, // Ye line certificates ka masla bypass kar degi
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log("Cloud MongoDB Connected... ☁️✅"))
.catch(err => {
    console.log("Cloud Error: ❌");
    console.error(err.message);
});

// --- MODELS ---
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    title: { type: String, default: "Untitled" },
    content: { type: String, default: "" }
});
const User = mongoose.model('User', UserSchema);

// --- ROUTES ---

// 1. SAVE CONTENT
app.post('/api/save-content', async (req, res) => {
    const { email, title, content } = req.body;
    try {
        await User.findOneAndUpdate({ email }, { title, content });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 2. GET CONTENT
app.get('/api/get-content', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ success: true, title: user.title, content: user.content });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 3. LOGIN/SIGNUP (Simple version for testing)
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, message: "User exists!" });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));