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
async function showEpisode() {
    const url = 'https://rickandmortyapi.com/api/episode'
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes;

}

showEpisode().then((responseObject) => renderEpisode(responseObject.results));
const ul = document.createElement("ul");
sidebar.appendChild(ul);

function renderEpisode(array) {
    const creatLi = (id) => {
        const li = document.createElement("li");
        li.innerHTML = `<a id=${id} href="#">Episode ${id}</a>`;
        return li;
    }

    array.forEach((episode) => {
        ul.appendChild(creatLi(episode.id))
    });

}


// the information of the episode
showEpisode().then((a) => getEpisode(a.results));

function getEpisode(array) {
    ul.addEventListener("click", (event) => {
        const id = event.target.getAttribute('id');
        if (!id) return;
        mainPart1.innerHTML = `
            <h2>${array[id-1].name}</h2>
            <span>${array[id-1].air_date}</span>
            <span>|</span>
            <span>${array[id-1].episode}</span>`



        array[id - 1].characters.forEach(el => fetch(el)
            .then((response) => response.json())
            .then((responseObject) => console.log(responseObject))
        )



        // function renderCharacters(obj) {
        //    const div = document.createElement("div");
        // mainPart2.appendChild(div);

        // div.innerHTML = `<div>
        //             <img src=${obj.image}></img>
        //             <h3>${obj.name}</h3>
        //             <span>${obj.species}</span>
        //             <span>|</span>
        //             <span>${obj.status}</span>
        //             </div>`


        // }
    })
}



main.append(sidebar, mainContainer);
root.append(header, main);
