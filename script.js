// ==========================================
// SECTION NAVIGATION
// ==========================================

const navButtons = document.querySelectorAll(
    ".nav-tab, .bottom-item"
);

const sections = document.querySelectorAll(
    ".page-section"
);


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionName = button.dataset.section;

        showSection(sectionName);

    });

});


function showSection(sectionName) {

    // Hide all pages
    sections.forEach(section => {
        section.classList.remove("active");
    });


    // Show selected page
    const selectedSection =
        document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }


    // Update top navigation
    document.querySelectorAll(".nav-tab").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section === sectionName
        );

    });


    // Update bottom navigation
    document.querySelectorAll(".bottom-item").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section === sectionName
        );

    });


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// MATCH FILTER
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter");

const matchCards =
    document.querySelectorAll(".full-match-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active from all
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active
        button.classList.add("active");


        const filter =
            button.dataset.filter;


        matchCards.forEach(card => {

            const type =
                card.dataset.type;


            if (filter === "all" || filter === type) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ==========================================
// REMINDER
// ==========================================

function setReminder(button) {

    const originalHTML = button.innerHTML;

    button.innerHTML =
        '<i class="fa-solid fa-check"></i> Reminder Set';

    button.style.color = "#008d5a";
    button.style.borderColor = "#008d5a";


    setTimeout(() => {

        button.innerHTML = originalHTML;

    }, 2500);

}


// ==========================================
// SCORECARD MODAL
// ==========================================

const modal =
    document.getElementById("scorecardModal");


function openScorecard(matchName) {

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeScorecard() {

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

}


// Close modal when clicking outside
modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeScorecard();

    }

});


// ==========================================
// ESC KEY CLOSE MODAL
// ==========================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeScorecard();

    }

});


// ==========================================
// SIMPLE LIVE SCORE UPDATE
// ==========================================

let currentRuns = 287;
let currentWickets = 4;
let currentOver = 76;
let currentBall = 2;


function updateLiveScore() {

    // Randomly update demo score
    const random =
        Math.random();


    if (random > 0.65) {

        currentRuns += Math.floor(
            Math.random() * 4
        );

    }


    if (random < 0.08 && currentWickets < 10) {

        currentWickets++;

    }


    currentBall++;


    if (currentBall >= 6) {

        currentBall = 0;
        currentOver++;

    }


    const scoreElements =
        document.querySelectorAll(".score strong");


    if (scoreElements.length > 0) {

        scoreElements[0].textContent =
            `${currentRuns}/${currentWickets}`;

    }


    const overElements =
        document.querySelectorAll(".score span");


    if (overElements.length > 0) {

        overElements[0].textContent =
            `${currentOver}.${currentBall} Overs`;

    }

}


// Update demo score every 10 seconds
setInterval(updateLiveScore, 10000);
