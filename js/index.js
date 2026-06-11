var siteName = document.getElementById("bookmarkName");
var siteurl = document.getElementById("bookmarkURL");
var bookmarkForm = document.getElementById("bookmarkForm");

var websites;
if (localStorage.getItem("websites") == null) {
    websites = [];
} else {
    websites = JSON.parse(localStorage.getItem("websites"));
}

display();

// Handle form submission
bookmarkForm.addEventListener("submit", function(e) {
    e.preventDefault();
    add();
});

function isValidURL(url) {
    var pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\S*)?$/;
    return pattern.test(url);
}

function add() {
    var name = siteName.value.trim();
    var url = siteurl.value.trim();

    if (name === "" || url === "") {
        shakeInput(name === "" ? siteName : siteurl);
        return;
    }

    if (!isValidURL(url)) {
        shakeInput(siteurl);
        return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    var web = {
        name: name,
        url: url
    };

    websites.push(web);
    localStorage.setItem("websites", JSON.stringify(websites));
    display();
    clearInputs();
}

function shakeInput(input) {
    input.style.animation = "shake 0.5s ease";
    setTimeout(() => input.style.animation = "", 500);
}

function clearInputs() {
    siteName.value = "";
    siteurl.value = "";
    siteName.focus();
}

function display() {
    var cartona = "";

    if (websites.length === 0) {
        cartona = `
            <tr>
                <td colspan="4" class="text-white-50 py-4">
                    <i class="fa-solid fa-bookmark-broken fa-2x mb-2 d-block opacity-50"></i>
                    No bookmarks yet. Add your first one above!
                </td>
            </tr>
        `;
    } else {
        for (var i = 0; i < websites.length; i++) {
            cartona += `
                <tr class="table-row animate">
                    <td data-label="Index">${i + 1}</td>
                    <td data-label="Website Name">
                        <i class="fa-solid fa-globe me-2 opacity-75"></i>
                        ${escapeHtml(websites[i].name)}
                    </td>
                    <td data-label="Visit">
                        <a href="${escapeHtml(websites[i].url)}" target="_blank" class="btn btn-visit">
                            <i class="fa-solid fa-arrow-up-right-from-square me-2"></i>Visit
                        </a>
                    </td>
                    <td data-label="Delete">
                        <button onclick="deleteWebsite(${i})" class="btn btn-delete">
                            <i class="fa-solid fa-trash-can me-2"></i>Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    }

    document.getElementById("tableContent").innerHTML = cartona;
}

function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function deleteWebsite(index) {
    var row = document.querySelector(`tr.table-row:nth-child(${index + 1})`);
    if (row) {
        row.classList.add("delete-row");
        setTimeout(() => {
            websites.splice(index, 1);
            localStorage.setItem("websites", JSON.stringify(websites));
            display();
        }, 400);
    } else {
        websites.splice(index, 1);
        localStorage.setItem("websites", JSON.stringify(websites));
        display();
    }
}

// Add shake animation style
var style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
    }
    .table-row.animate {
        animation: fadeSlideUp 0.5s ease forwards;
    }
`;
document.head.appendChild(style);
