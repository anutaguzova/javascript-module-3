const root = document.querySelector("#root")

// header
const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "Rick y Morty";
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

mainContainer.append(mainPart1, mainPart2);


const URL_EPISODE = 'https://rickandmortyapi.com/api/episode';

const  getUrl = async(url) => {
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes;
}

const ul = document.createElement("ul");
sidebar.appendChild(ul);

getUrl(URL_EPISODE).then((obj) => {
    ul.innerHTML = obj.results.map(episode => `
                <li>
                    <a id=${episode.id} href="#">Episode ${episode.id}</a>
                </li>`).join("")
})


// main container
// the information of the episode
getUrl(URL_EPISODE).then((arr) => {
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



const showCharacters = async (characters) => {
    const resultArray = await Promise.all(characters.map(async (character) => getUrl(character)));
    let results = resultArray;

    return results.map((obj) =>
        `<div class="character" id=${obj.id}>
            <img src=${obj.image} width="100%" height="150">
            <h3>${obj.name}</h3>
            <span>${obj.species}</span>
            <span>|</span>
            <span>${obj.status}</span>
         </div>
    `).join('')
}

// when I click character , I see all episodes where this character met
mainPart2.addEventListener("click", (event) => {
    const id = event.target.parentElement.getAttribute('id');
    if (!id) return;
    getUrl(`https://rickandmortyapi.com/api/character/${id} `).then((obj) =>  {
        
        mainPart1.innerHTML = `
          <div class="character_card">
            <div>
                <img src=${obj.image} width="100" height="100">
            </div>
            <div>
                <h2>${obj.name}</h2>
                <span>${obj.status}</span>
                <span>|</span>
                <span>${obj.species}</span>
                <span>|</span>
                <span>${obj.gender}</span>
                <span>|</span>
                <span>${obj.origin.name}</span>
            </div>
         </div>
        `

        let episodes = obj.episode;
        showCharacterEpisodes(episodes).then((episodesString) => {
            mainPart2.innerHTML = episodesString;
        });

});
})


const showCharacterEpisodes = async (episodes) => {
    const resultArray = await Promise.all(episodes.map(async(episode) => getUrl(episode)));
    let results = resultArray;

    return results.map((obj) =>
        `<div class="episode" id=${obj.id}>
            <h3>Episode ${obj.id}</h3>
            <div>${obj.episode}</div>
         </div>
    `).join('')
}




main.append(sidebar, mainContainer);
root.append(header, main);
