const express = require('express');
const { generateImage } = require('./generateImage');
const { getUserImages, storeImageMetadata } = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.post('/generate', async (req, res) => {
    const { prompt, userId } = req.body;

    if (!prompt || !userId) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const imageUrl = await generateImage(prompt);
        const timestamp = new Date().toISOString();  
        await storeImageMetadata({ prompt, userId, imageUrl, timestamp });
        res.json({ imageUrl, prompt, userId, timestamp });
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate image');
    }
});

app.get('/images', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const images = await getUserImages(userId);
    res.json(images);
});
