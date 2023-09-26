function displayData(films) {
    return new Promise((resolve, reject) => {
        filmsContainer.innerHTML = "";

        for (const film of films) {
            filmsContainer.innerHTML +=
        `<div class="details-container">
            <div class="img-container">
                <img src="${film.Poster}" alt="Film Poster">
            </div>
            <div class="grid-container">
                <h4>Title:</h4>
                <p>${film.Title}</p>

                <h4>Released:</h4>
                <p>${film.Released}</p>

                <h4>Genre:</h4>
                <p>${film.Genre}</p>
                
                <h4>Country:</h4>
                <p>${film.Country}</p>
                
                <h4>Director:</h4>
                <p>${film.Director}</p>
                
                <h4>Writer:</h4>
                <p>${film.Writer}</p>
                
                <h4>Actors:</h4>
                <p>${film.Actors}</p>
                
                <h4>Awards:</h4>
                <p>${film.Awards}</p>
            </div>
        </div>`;
        }

        resolve();
    });
}

(async () => {
    let response = await getDataFromServer(apiUrl, null, null, null, new URLSearchParams(window.location.search).get("id"));

    if (response.Response === "False") {
        filmsContainer.innerHTML = `<h4 style="color: red;">Error: ${response.Error}</h4>`;
        return;
    }

    await displayData([response], true);
})();