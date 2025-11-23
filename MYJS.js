// SECTION: Tab Switching Logic
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
        const oldListItems = tabcontent.querySelectorAll('ul li');
        oldListItems.forEach(item => item.classList.remove('reveal-item'));
    }

    event.currentTarget.classList.add("active-link");

    const targetTabContent = document.getElementById(tabname);
    targetTabContent.classList.add("active-tab");

    // SECTION: Staggered Animation Logic
    const listItemsToReveal = targetTabContent.querySelectorAll('ul li');
    
    listItemsToReveal.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('reveal-item');
        }, index * 100);
    });
}


// SECTION: Toggle Button Logic
function myFunction(el) {
    const buttonParent = el.closest('h1');
    
    if (!buttonParent) {
        console.error("Error: Could not find the parent <h1> for the button.");
        return;
    }

    const content = buttonParent.nextElementSibling;
    
    if (!content || !content.classList.contains('toggle-content')) {
        console.error("Error: Could not find the toggle-content element.");
        return;
    }
    content.classList.toggle('visible');

    if (content.classList.contains('visible')) {
        el.textContent = "Less Details";
    } else {
        el.textContent = "My Journey";
    }
}