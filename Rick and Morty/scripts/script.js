const root = document.querySelector("#root")

// header
const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "Rick y Morty API";
header.appendChild(title);

const main = document.createElement("div");
main.classList.add("main");

// sidebar
const sidebar = document.createElement("div");
sidebar.classList.add("sidebar");


// main container
const mainContainer = document.createElement("div");
mainContainer.classList.add("mainContainer");

const mainPart1 = document.createElement("div");
const mainPart2 = document.createElement("div");
mainPart2.classList.add("characters_container");

mainContainer.append(mainPart1, mainPart2)


//sidebar episode
const  showEpisode = async() => {
    const url = 'https://rickandmortyapi.com/api/episode'
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes;

}

const ul = document.createElement("ul");
sidebar.appendChild(ul);

showEpisode().then((obj) => {
    ul.innerHTML = obj.results.map(episode => `
                <li>
                    <a id=${episode.id} href="#">Episode ${episode.id}</a>
                </li>`).join("")
})


// the information of the episode
showEpisode().then((arr) => {
    ul.addEventListener("click", (event) => {
        const id = event.target.getAttribute('id');
        if (!id) return;
        mainPart1.innerHTML = `
            <h2>${arr.results[id-1].name}</h2>
            <span>${arr.results[id-1].air_date}</span>
            <span>|</span>
            <span>${arr.results[id-1].episode}</span>`


        let characters = arr.results[id - 1].characters;

        showCharacters(characters).then((charactersString) => {
            mainPart2.innerHTML = charactersString;
        });
    })
})

const getCharacter = async (url) => {
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes;

}

const showCharacters = async (characters) => {
    const resultArray = await Promise.all(characters.map(async (character) => getCharacter(character)));
    let results = resultArray;

    return results.map((obj) =>
        `<div class="character">
            <img src=${obj.image} width="100%" height="150">
            <h3>${obj.name}</h3>
            <span>${obj.species}</span>
            <span>|</span>
            <span>${obj.status}</span>
         </div>
    `).join('')
}


main.append(sidebar, mainContainer);
root.append(header, main);
