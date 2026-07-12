const url = "data/members.json";
const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#nav");

// ------------------------------
// Responsive Navigation
// ------------------------------
menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");
});

// ------------------------------
// Fetch Chamber Members
// ------------------------------
async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {
        console.error("Unable to load member data:", error);

        membersContainer.innerHTML =
            "<p>Unable to load chamber members.</p>";
    }
}

getMembers();

// ------------------------------
// Display Cards
// ------------------------------
function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name}"
                 loading="lazy"
                 width="250"
                 height="170">

            <h2>${member.name}</h2>

            <p><strong>Category:</strong> ${member.category}</p>

            <p><strong>Address:</strong><br>${member.address}</p>

            <p><strong>Phone:</strong><br>${member.phone}</p>

            <p>
                <strong>Website:</strong><br>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <p><strong>Membership:</strong> ${membershipName(member.membership)}</p>

            <p>${member.description}</p>
        `;

        membersContainer.appendChild(card);
    });

}

// ------------------------------
// Membership Name
// ------------------------------
function membershipName(level) {

    switch (level) {

        case 1:
            return "Member";

        case 2:
            return "Silver";

        case 3:
            return "Gold";

        default:
            return "Member";
    }

}

// ------------------------------
// Grid View
// ------------------------------
gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");

});

// ------------------------------
// List View
// ------------------------------
listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");

});