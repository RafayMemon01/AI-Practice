import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/ask-gemini', async (req, res) => {
    try {
        if (!req.body.userPrompt) {
            return res.status(400).send({ error: "User prompt is required" });
        }
        
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(req.body.userPrompt);
        res.send(result.response.text());
        console.log(result.response.text());
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});