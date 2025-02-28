const axios = require('axios');
require('dotenv').config(); 

const generateImage = async (prompt) => {
    const API_URL = 'https://api.openai.com/v1/images/generations';
    const API_KEY = process.env.OPENAI_API_KEY;

    const requestBody = {
        "prompt": prompt,
        "n": 1,
        "size": '1024x1024'
    };
    
    try {
        const response = await axios.post(API_URL, requestBody, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json' 
            }
        });

        if (response.data && response.data.data && response.data.data[0]) {
            return response.data.data[0].url;
        } else {
            console.error('Error generating image:', error);
        }
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate image');
    }
};

module.exports = { generateImage };
