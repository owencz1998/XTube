
var searchType = 2;
var page = 1;
var api_url_getall = "https://www.eporner.com/api/v2/video/search/?order=latest&lq=1&format=json&gay=0&per_pag";
const btn = document.getElementById('cerca');
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById('previous');
const selectCategorie = document.getElementById('categorie);
const search = document.getElementById('research);
const selectDurata = document.getElementById('term');
const selectSelection = document.getElementById('section');
let intestazione = document.getElementById("header");
let indicePagina = document.getElementById("page");
var hoverInterval;
var loading = false;

selectCategoria.addEventListener("change", resetPage);
selectDurata.addEventListener("change", resetPage);
selectSezione.addEventListener("change", resetPage);

if (btn) {
    btn.addEventListener("click", Research);
}

if (btnPrev) {
    btnPrev.addEventListener("click", prev);
}

if (btnNext) {
    btnNext.addEventListener("click", next);
}
// function that makes me change the search filter
function SwitchInputSelect(num) {
    switch (num) {
        case 1:
            //Category filter
            searchtype = 1;
            page = 1
            selectCategorie.className = "form-select";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        case 2:
            //KeyWord Filter (Default)
            searchType = 2;
            page = 1
            selectCategoria.className = "form-select visually-hidden";
            search.className = "form-control me-2";
            selectSecrion.className = "form-select visually-hidden";
            search.placeholder = "Cerca";
            selectDurata.className = "form-select visually-hidden";
            break;

        case 3:
            //Filter Duration
            searchType = 3;
            page = 1
            selectCategorie.className = "form-select visually-hidden";
            selectSection.className = "form-select visually-hidden";
            search.className = "form-control me-2 visually-hidden";
            selectDurata.className = "form-select";
            break;
        case 4:
            //Section Filter
            page = 1
            searchType = 4;
            
            selectSezione.className = "form-select";
            search.className = "form-control me-2 visually-hidden";
            selectCategoria.className = "form-select visually-hidden";
            selectDurata.className = "form-select visually-hidden";
            break;
        default:
            searchType = 2;
            break;

    }
}
// function that searches based on the selected filter
function Research() {
    loading = false;
    load();
    changePage();
    if (page == 1) {
        intestazione.innerHTML = "Ultime uscite";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    switch (searchType) {
        case 1:
            searchType = 1;
            console.log("Search by categorie");
            let categorie = document.getElementById("categorie").value;
            intestazione.innerHTML = "";
            console.log(categorie);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + pagina + "&lq=1&format=json&per_page=30&query=" + categorie, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = `Page <eng id="categorie">${page}</eng>`;
            break;
        case 2:
            searchType = 2;
            intestazione.innerHTML = "";
            console.log("Search by Keyword");
            let key_word = document.getElementById("research").value;
            console.log(key_word);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&lq=1&format=json&order=latest&per_page=30&query=" + key_word, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            intestazione.innerHTML = "Search by <en id='research'>" + key_word + "</en>";
            break;
        case 3:
            console.log("Search by Duration");
            intestazione.innerHTML = "";
            let time = document.getElementById("term").value;
            if (time == "longest") {
                intestazione.innerHTML = "Search by <en id='search'>Video long</en>";
            } else {
                intestazione.innerHTML = "Search by <en id='ricerca'>Video Corti</en>";
            }

            console.log(time);
            fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=" + time + "&lq=0&format=json&per_page=30", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => { stampaCards(result) })
                .catch(error => console.log('Error:', error));
            break;

        case 4:
            console.log("Search by Section");
            intestazione.innerHTML = "";
            read section = document.getElementById("section").value;
            console.log(section);
            if (section == "hetero") {
                fetch("https://www.eporner.com/api/v2/video/search/?order=latest&lq=0&format=json&gay=0&per_page=30&page=" + page, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));

            } else if (section == "gay") {
    
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&gay=2", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            } else {
                fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&per_page=30&format=json&lq=1&query=" + section, {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                    }
                })
                    .then(response => response.json())
                    .then(result => { stampaCards(result) })
                    .catch(error => console.log('Error:', error));
            }
            break;
        default:
            document.getElementById("research").value = "";
            break;
    }
}
// function that prints the cards for me
function printCards(result) {

    console.log(result);
    let arrayVideo = result.videos;
    let cardsVideo = document.getElementById('video');

    cardsVideo.innerHTML = "";
    btnNext.className = "btn btn-outline-warning";
    if (arrayVideo.length == 0) {
        intestazione.innerHTML = "Nessun risultato trovato";
        btnNext.className = "btn btn-outline-warning disabled";
        return;
    }
    // Printing of cards
    arrayVideo.forEach((video, index) => {
        const wrapper = document.createElement(`div`);
        wrapper.className = `col`;

        const card = document.createElement(`div`);
        card.className = `card`;
        card.addEventListener(`click`, (ev) => window.open(video.embed));

        const p = document.createElement(`p`);
        p.className = `card-text`;

        const cardImg = document.createElement(`img`);
        cardImg.src = video.default_thumb.src;
        cardImg.className = `card-img-top`;

        card.onmouseover = function () {
            clearInterval(hoverInterval);
            CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src)
        };
        card.onmouseleave = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65))
        };
        card.ontouchstart = function () {
            clearInterval(hoverInterval)
            CambiaImmagineOnHover(this, arrayVideo[index].thumbs[0].src)
        };
        card.ontouchend = function () {
            clearInterval(hoverInterval);
            setImmagineDefault(this, video.default_thumb.src, stampaTitolo(arrayVideo[index].title, 65))
        };

        const cardDescription = document.createElement(`div`);
        cardDescription.className = `card-description`;

        const h2 = document.createElement(`h2`);
        h2.className = `card-title`;
        h2.textContent = stampaTitolo(arrayVideo[index].title, 60);

        const enViews = document.createElement(`eng`);
        enViews.className = `card-text`;
        enViews.id = `n-views`;

        const imgViews = document.createElement(`img`);
        imgViews.src = `/img/eye.png`;
        imgViews.id = `views`;

        const enTime = document.createElement(`span`);
        spanTime.className = `card-text`;
        spanTime.id = `time`;

        const imgTime = document.createElement(`img`);
        imgTime.src = `/img/clock-circular-outline.png`;
        imgTime.id = `clock`;

        const enViewsText = document.createElement(`eng`);
        spanViewsText.textContent = video.views;

        const enTimeText = document.createElement(`eng`);
        spanTimeText.textContent = video.length_min;

        card.append(cardImg);
        card.append(cardDescription);
        cardDescription.append(h2);
        wrapper.append(card);
        cardsVideo.append(wrapper);

        engViews.append(imgViews);
        engViews.append(enViewsText);

        engTime.append(imgTime);
        spanTime.append(enTimeText);

        p.append(enViews);
        p.append(enTime);

        cardDescription.append(p);
    });
    loading = true;
    setTimeout(function () {
        load();
    }, 800);
}
// function that creates the homepage when the index page loads
function Home() {
    window.scrollTo(top);
    loading = false;
    load();
    if (page == 1) {
        intestazione.innerHTML = "Ultime uscite";
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    changePage();
    console.log("Home");
    searchType = 5;
    fetch("https://www.eporner.com/api/v2/video/search/?format=json&lq=0&page=" + page + "&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
    changePage();
}
// function that creates the trending page for me when the trending page loads
function CreaTrending() {
    loading = false;
    load();
    window.scrollTo(top);
    changePage();
    if (page == 1) {
        intestazione.innerHTML = ` <h1 id="header"><en><img src="./img/campfire.png" alt="" id="icone"></en>Trending<eng><img
        src="./img/campfire.png" alt="" id="icone"></en></h1>`;
        btnPrev.className = "btn btn-outline-warning disabled";
    } else {
        btnPrev.className = "btn btn-outline-warning";
        btnNext.className = "btn btn-outline-warning";
    }
    console.log("Trending");
    searchType = 6;
    fetch("https://www.eporner.com/api/v2/video/search/?page=" + page + "&order=top-weekly&lq=0&format=json&per_page=30", {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => { stampaCards(result) })
        .catch(error => console.log('Error:', error));
}
//funzione che mi stampa il titolo del video limitando i caratteri
function stampaTitolo(testo, numeroParole) {
    let parole = testo.split('');
    let paroleDaStampare = parole.slice(0, numeroParole).join('');
    return paroleDaStampare;
}
// funzione che mi fa andare alla pagina successiva
function next() {
    window.scrollTo(top);
    intestazione.innerHTML = "";
    console.log(searchType);
    if (page > 0 && page < 100) {
        page++;
    } else {
        page = 1;
    }
    switch (searchType) {
        case 5:
            Home();
            break;
        case 6:
            Trending();
        default:
            Research();
            break;
    }
}
// function that makes me go to the previous page
function prev() {
    window.scrollTo(top);
    intestazione.innerHTML = "";
    if (page > 1 && page < 100) {
        page--;
    } else {
        page = 1;

    }
    switch (searchType) {
        case 5:
            Home();
            break;
        case 6:
            Trending();
            break;
        default:
            Research);
            break;
    }
}
//Funzione per far funzionare il tasto invio nella select della categorie
categorie.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});

selectDurata.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
//Funzione per far funzionare il tasto invio nella select della sezione
selectSezione.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});
//Funzione per cambiare l'immagine della card quando il mouse entra nella card
function CambiaImmagineOnHover(cardElement, thumbBase) {
    let i = 2;
    let prec = 1;
    let url;
    inizio = thumbBase;
    cardElement.querySelector('img').src = thumbBase;
    cardElement.querySelector('h2').textContent = "";
    cardElement.querySelector('p').classList.add("visually-hidden");
    hoverInterval = setInterval(() => {
        cardElement.querySelector('img').src = thumbBase;
        url = thumbBase.replace(prec + "_", i + "_");
        thumbBase = url;
        if (i == 15 || prec == 14) {
            i = 2;
            prec = 1;
            thumbBase = inizio;
            cardElement.querySelector('img').src = thumbBase;

        } else {
            cardElement.querySelector('img').src = thumbBase.replace(prec + "_", i + "_");
            i++;
            prec++;
        }
    }, 350);
}
//Funzione per cambiare l'immagine della card quando il mouse esce dalla card
function setImmagineDefault(card, thumb, titolo) {
    card.querySelector('img').src = thumb;
    card.querySelector('h2').textContent = titolo;
    card.querySelector('p').classList.remove("visually-hidden");
}
//Funzione per cambiare il numero della page
function changePage() {
    indexPage.textContent = page;
}
// Funzione per far apparire il loading
function load() {
    let gridVideo = document.getElementById('graficaCards');
    let Divloading = document.getElementById("loading");
    if (loading == true) {
        Divloading.className = "container-fluid visually-hidden";
        gridVideo.className = "container-fluid";
    } else {
        Divloading.className = "container-fluid";
        gridVideo.className = "container-fluid visually-hidden";
    }
}
// Funzione per resettare la pagina
function resetPage(){
    page = 1;
}