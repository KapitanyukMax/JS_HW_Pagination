const apiUrl = "https://www.omdbapi.com/?apikey=a707b654";
const filmsContainer = document.getElementById("films-container");

function getDataFromServer(url, page, title, type, id) {
    return new Promise(async (resolve, reject) => {
        if (id) url += `&i=${id}`;
        else if (page && title) url += `&s=${title}&page=${page}`;
        else reject();
        
        if (type) url += `&type=${type}`;
        let response = await fetch(url);
        resolve(await response.json());
    });
}