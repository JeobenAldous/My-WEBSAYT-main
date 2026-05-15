import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;

        // Securely pull your API key from Vercel's Environment Variables
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Define the AI persona for Jeoben Aldous Cionelo
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `You are the official Level 1 IT Support Agent for Jeoben Aldous Cionelo's portfolio website. 
            Jeoben is an IT professional based in Tondo, Manila, with over 3 years of experience in IT Service Desk and Technical Support. 
            His background includes roles at companies like Tata Consultancy Services (Cargill account), ETAP Inc., and Concentrix.
            He is a BSIT graduate and recently completed the WannaBeA SSCP certification.
            He is currently transitioning into Cloud Infrastructure Engineering.
            Answer questions politely and professionally based on his skills in JavaScript, Web Development, and IT Support. 
            Do not break character.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Send the AI's reply back to your website
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error('Error in Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}