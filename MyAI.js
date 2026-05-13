document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('chatBtn');
    const closeChat = document.getElementById('closeChat');
    const chatPopup = document.getElementById('chatPopup');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    // --- 1. Animation & Visibility Logic ---
    chatBtn.addEventListener('click', () => {
        // Toggle the 'hidden' class to trigger the 1.5s CSS transition
        chatPopup.classList.toggle('hidden');
        
        // Focus the input automatically when opened for better UX
        if (!chatPopup.classList.contains('hidden')) {
            setTimeout(() => chatInput.focus(), 500);
        }
    });

    closeChat.addEventListener('click', () => {
        chatPopup.classList.add('hidden');
    });

    // --- 2. Chat Messaging Logic ---
    const sendMessage = async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message to UI
        appendMessage('user-message', text);
        chatInput.value = '';

        // Add "Typing..." Indicator
        const typingDiv = appendMessage('ai-message', 'Thinking...');

        try {
            // Call your Vercel Backend route
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            
            // Replace "Thinking..." with actual AI response
            typingDiv.textContent = data.reply || "I'm sorry, I couldn't process that request.";
        } catch (error) {
            typingDiv.textContent = "Connection error. Make sure your Vercel Environment Variable is set.";
            console.error('Gemini API Error:', error);
        }
        
        // Final scroll to ensure latest message is visible
        scrollToBottom();
    };

    // --- 3. Helper Functions ---
    function appendMessage(className, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        scrollToBottom();
        return msgDiv;
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // --- 4. Event Listeners ---
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});