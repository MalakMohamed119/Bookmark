var siteName = document.getElementById("bookmarkName");
var siteurl = document.getElementById("bookmarkURL");

var websites;
if (localStorage.getItem("websites") == null) {
    websites = [];
} else {
    websites = JSON.parse(localStorage.getItem("websites"));
    display();
}

function isValidURL(url) {
    var pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\S*)?$/;
    return pattern.test(url);
}

function add() {
    var name = siteName.value.trim();
    var url = siteurl.value.trim();

    if (name === "" || url === "") {
        alert("Please fill in both fields.");
        return;
    }

    if (!isValidURL(url)) {
        alert("Please enter a valid URL (e.g. https://example.com)");
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

function clearInputs() {
    siteName.value = "";
    siteurl.value = "";
}

function display() {
    var cartona = "";

    for (var i = 0; i < websites.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${websites[i].name}</td>
                <td>
                    <a href="${websites[i].url}" target="_blank">
                        <button class="btn btn-visit text-white" style="background-color:rgb(138, 158, 35)">
                            <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button>
                    </a>
                </td>
                <td>
                    <button onclick="deleteWebsite(${i})" class="btn btn-delete text-white" style="background-color:rgb(215, 11, 35)">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tableContent").innerHTML = cartona;
}

function deleteWebsite(index) {
    websites.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(websites));
    display();
}
