function myFunction(el) {
    // This is the function for the old toggle button interaction (less details / more details)
    const buttonParent = el.closest('h1');
    
    if (!buttonParent) {
        console.error("Error: Could not find the parent <h1> for the button.");
        return;
    }

    const content = buttonParent.nextElementSibling;
    
    if (!content || !content.classList.contains('toggle-content')) {
        console.error("Error: The next sibling is not the '.toggle-content' div. Check your HTML structure.");
        return;
    }

    if (!el.dataset.originalText) {
        el.dataset.originalText = el.innerHTML;
    }

    content.classList.toggle('visible');

    if (content.classList.contains('visible')) {
        el.innerHTML = "Less Details";
    } else {
        el.innerHTML = el.dataset.originalText;
    }
}

// =================================================
// --- UPDATED FUNCTION FOR SERVICE FILTERING ---
// =================================================

/**
=
 * @param {string} category - The data-category value to filter by ('all', 'web', 'backend', etc.).
 * @param {HTMLElement} clickedButton - The button element that was clicked.
 */
function selectServiceCategory(category, clickedButton) {
    const boxes = document.querySelectorAll('.service-item-box');
    const buttons = document.querySelectorAll('.filter-btn');

    // 1. Update the active button state visually
    buttons.forEach(btn => btn.classList.remove('active-filter'));
    clickedButton.classList.add('active-filter');

    // 2. Loop through service boxes and toggle visibility
    boxes.forEach(box => {
        const boxCategory = box.getAttribute('data-category');
        
        if (category === 'all' || boxCategory === category) {
            // SHOW the box: remove 'hidden' class
            box.classList.remove('hidden');
        } else {
            // HIDE the box: add 'hidden' class
            box.classList.add('hidden');
        }
    });
}


// =================================================
// --- FUNCTION FOR FALLING TEXT EFFECT ---
// =================================================

function animateText(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent;
    let newHTML = '';
    let delay = 0;
    
    for (const char of text) {
        if (char === ' ') {
            newHTML += '<span class="space">&nbsp;</span>';
        } else {
            newHTML += `<span style="animation-delay: ${delay}s;">${char}</span>`;
        }
        delay += 0.08;
    }

    element.innerHTML = newHTML;
}

// Run functions when the window loads
window.onload = function() {
    // Run the falling text animation
    animateText('title-to-animate');
    
    // Set the initial filter state (showing all services)
    const initialButton = document.querySelector('.filter-btn.active-filter');
    if (initialButton) {
        // Use the new function name
        selectServiceCategory('all', initialButton); 
    }
}