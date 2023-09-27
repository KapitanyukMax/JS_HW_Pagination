const searchTitle = document.getElementById("search-title");
const searchForm = document.getElementById("search-form");
const titleField = document.getElementById("title");
const typeField = document.getElementById("type");
const filmsTitle = document.getElementById("films-title");
const paginationNav = document.getElementById("pagination-nav");

let page = +(new URLSearchParams(window.location.search).get("page"));

if (page > 0) {
    if (page === 1) {
        searchTitle.style.display = "block";
        searchForm.style.display = "grid";
    } else {
        searchTitle.style.display = "none";
        searchForm.style.display = "none";
    }

    proceedRequest();
} else {
    searchTitle.style.display = "block";
    searchForm.style.display = "grid";
}

function displayData(films) {
    return new Promise((resolve, reject) => {
        filmsTitle.style.display = "block";
        filmsContainer.innerHTML = "";

        for (const film of films) {
            filmsContainer.innerHTML +=
                `<div class="film-container">
            <div class="img-container">
                <img src="${film.Poster}" alt="Film Poster">
            </div>
            <div class="text-container">
                <p class="type-display">${film.Type}</p>
                <h4>${film.Title}</h4>
                <p class="year-display">${film.Year}</p>
                <button onclick="window.location.href='./film.html?id=${film.imdbID}'">Details</button>
            </div>
        </div>`;
        }

        resolve();
    });
}

function generatePaginationNav(totalPages, title, type) {
    paginationNav.style.display = "block";
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${page - 1}&title=${title}&type=${type}'" ${page === 1 ? "disabled" : ""}>&lt;&lt;</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=1&title=${title}&type=${type}'" ${page === 1 ? "disabled" : ""}>1</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=2&title=${title}&type=${type}'" ${totalPages < 2 || page === 2 ? "disabled" : ""}>2</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${page < 5 || totalPages < 7 ? 3 : page - 2}&title=${title}&type=${type}'" ${totalPages < 3 || page === 3 ? "disabled" : ""}>${page < 5 || totalPages < 7 ? "3" : "..."}</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${page < 5 || totalPages < 7 ? 4 : page > totalPages - 3 ? totalPages - 2 : page}&title=${title}&type=${type}'" ${page > 3 || totalPages < 4 ? "disabled" : ""}>${page < 5 || totalPages < 7 ? 4 : page > totalPages - 3 ? totalPages - 2 : page}</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${totalPages < 7 ? 5 : page === totalPages - 1 || page > totalPages - 3 ? totalPages - 1 : page + 2}&title=${title}&type=${type}'" ${page === 5 && totalPages < 7 || page === totalPages - 2 || page === totalPages ? "disabled" : ""}>${totalPages < 7 ? 5 : page > totalPages - 3 ? totalPages - 1 : "..."}</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${totalPages < 7 ? 6 : totalPages}&title=${title}&type=${type}'" ${page === totalPages || totalPages < 6 ? "disabled" : ""}>${totalPages < 7 ? 6 : totalPages}</button>`);
    paginationNav.insertAdjacentHTML("beforeend",
    `<button onclick="window.location.href='./index.html?page=${page + 1}&title=${title}&type=${type}'" ${page === totalPages ? "disabled" : ""}>&gt;&gt;</button>`);
}

async function proceedRequest() {
    let title = new URLSearchParams(window.location.search).get("title") || titleField.value;
    let type = new URLSearchParams(window.location.search).get("type") || typeField.value;
    
    let response = await getDataFromServer(apiUrl, page || 1, title, type);

    if (response.Response === "False") {
        filmsContainer.innerHTML = `<h4 style="color: red;">Error: ${response.Error}</h4>`;
        return;
    }

    await displayData(response.Search);
    
    generatePaginationNav(Math.ceil(response.totalResults / 10), title, type);
}

searchForm.onsubmit = (event) => {
    event.preventDefault();

    proceedRequest();
}