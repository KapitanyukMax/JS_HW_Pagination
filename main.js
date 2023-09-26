const searchForm = document.getElementById("search-form");
const titleField = document.getElementById("title");
const typeField = document.getElementById("type");
const filmsTitle = document.getElementById("films-title");
const paginationNav = document.getElementById("pagination-nav");
let page = 1;

function displayData(films) {
    return new Promise((resolve, reject) => {
        filmsTitle.style.visibility = "visible";
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

searchForm.onsubmit = async (event) => {
    event.preventDefault();

    page ??= new URLSearchParams(window.location.search).get("page");
    if (page === 1) searchForm.style.visibility = "visible";
    else searchForm.style.visibility = "hidden";

    let response = await getDataFromServer(apiUrl, page, titleField.value, typeField.value);

    if (response.Response === "False") {
        filmsContainer.innerHTML = `<h4 style="color: red;">Error: ${response.Error}</h4>`;
        return;
    }

    await displayData(response.Search);

    // let totalPages = Math.floor(response.Total / 10);
    // paginationNav.style.visibility = "visible";
    // paginationNav.insertAdjacentHTML("afterbegin",
    //     `<button onclick="window.location.href='./film.html?id=${film.imdbID}'" ${page === 1 ? "disabled" : ""}>&lt;&lt;</button>`);
    // paginationNav.insertAdjacentHTML("afterbegin",
    //     `<button onclick="window.location.href='./film.html?id=${film.imdbID}'">1</button>`);
    // paginationNav.insertAdjacentHTML("afterbegin", `<button ${totalPages === 1 ? "disabled" : ""}>2</button>`);
}