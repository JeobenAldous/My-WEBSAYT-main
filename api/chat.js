const { GoogleGenerativeAI } = require('@google/generative-ai');

export default async function handler(req, res) {
    // Only allow POST requests from your website front-end
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;

        // Securely pull your API key from Vercel's hidden environment variables
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Define the AI persona
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `You are the official Level 1 IT Support Agent for Jeoben Cionelo's portfolio website. 
            Jeoben is an IT professional with 3+ years of experience, specializing in IT Service Desk operations, back-end support, and system troubleshooting. 
            He is actively transitioning into Cloud Infrastructure Engineering and has completed full-stack web development training (MERN stack).
            Your job is to answer questions politely, concisely, and professionally. Only answer questions related to Jeoben's portfolio, skills, experience, or IT capabilities.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Send the AI's reply back to the chat widget on the screen
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error('Error in Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}