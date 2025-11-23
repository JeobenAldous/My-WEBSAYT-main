// =================================================
// --- SERVICE FILTERING LOGIC (from PageForMyServices.html) ---
// =================================================

function filterServices(category) {
    const boxes = document.querySelectorAll('.service-item-box');
    const buttons = document.querySelectorAll('.filter-btn');

    // 1. Update active button state
    buttons.forEach(button => {
        if (button.getAttribute('data-filter') === category) {
            button.classList.add('active-filter');
        } else {
            button.classList.remove('active-filter');
        }
    });

    // 2. Toggle service box visibility
    boxes.forEach(box => {
        const boxCategory = box.getAttribute('data-category');

        // Always remove the 'removed' class first, in case it was hidden previously
        box.classList.remove('removed');
        
        if (category === 'all' || boxCategory === category) {
            // SHOW the box: Ensure it has no hidden classes
            box.classList.remove('hidden');
        } else {
            // HIDE the box: 
            box.classList.add('hidden');
            
            // Wait for the 500ms (0.5s) CSS transition to finish, then set display: none
            // This ensures the remaining boxes fill the space immediately after the transition.
            setTimeout(() => {
                // Only add 'removed' if it's still marked as 'hidden' 
                // (i.e., the user hasn't clicked another filter too fast)
                if (box.classList.contains('hidden')) {
                     box.classList.add('removed');
                }
            }, 500); // Must match the 0.5s transition time in style.css
        }
    });
}