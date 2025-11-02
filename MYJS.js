let tablinks = document.getElementsByClassName("tab-links")
let tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {
    // 1. Remove active classes from tab links and tab contents (standard logic)
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    // 2. Set the newly clicked tab and content as active
    event.currentTarget.classList.add("active-link");
    let targetTab = document.getElementById(tabname);
    targetTab.classList.add("active-tab");

    // --- New Sequential Animation Logic ---

    // 3. Reset: Remove the 'reveal-item' class from ALL list items first
    document.querySelectorAll('.tab-contents ul li').forEach(li => {
        li.classList.remove('reveal-item');
    });

    // 4. Select the list items in the currently active tab
    let listItems = targetTab.querySelectorAll('ul li');

    // 5. Loop through items and apply the reveal class with a 1-second delay (1000ms)
    listItems.forEach((item, index) => {
        // Calculate the delay: 0s, 1s, 2s, 3s, etc.
        let delay = index * 350;

        setTimeout(() => {
            item.classList.add('reveal-item');
        }, delay);
    });
}



// features for page about

let aboutSubtitle = document.getElementsByClassName("about-subtitle")
let aboutContents = document.getElementsByClassName("about-contents")

function OpenAbout(tabname) {
    if aboutSubtitle of aboutSubtitle {
        aboutSubtitle.classList.remove("active-subtitle");
    }
}