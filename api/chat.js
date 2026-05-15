import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `You are the official Level 1 IT Support Agent for Jeoben Aldous Cionelo. 
            Jeoben is an IT professional in Tondo, Manila, with 3+ years of experience. 
            He has worked at Tata Consultancy Services (Cargill account), ETAP Inc., and Concentrix. 
            He is a BSIT graduate and holds a WannaBeA SSCP certification. 
            He is currently transitioning into Cloud Infrastructure Engineering. 
            Answer politely and concisely regarding his IT skills and experience.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}