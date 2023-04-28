const quotes = document.getElementById('quotes');
let animes = [];
const fetchQuotes = () => {
    const BASE_URL = 'https://kitsu.io/api/edge/anime/';
    fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
            animes.push(data.data);
            for (let i = 0; i < 10; i++) {
                const anime = {
                    image: animes[0][i].attributes.posterImage.medium,
                    title: animes[0][i].attributes.titles.en_jp,
                    rating: animes[0][i].attributes.ageRatingGuide,
                }
                displayAnimes(anime);
            }

        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const displayAnimes = (anime) => {
    const li = document.createElement('li');
    li.classList.add('card');
    quotes.appendChild(li);

    const img = document.createElement('img');
    img.classList.add('card-image');
    img.setAttribute('src', anime.image);
    li.appendChild(img);

    const h2 = document.createElement('h2');
    h2.classList.add('card-title');
    h2.textContent = 'Title: ' + anime.title;
    li.appendChild(h2);

    const p = document.createElement('p');
    p.classList.add('card-subtitle');
    p.textContent = 'Rating: ' + anime.rating;
    li.appendChild(p);


};

function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type);

    if (content && useInnerHtml) {
        htmlElement.innerHTML = content;
    } else {
        if (content && type !== 'input') {
            htmlElement.textContent = content;
        }

        if (content && type === 'input') {
            htmlElement.value = content;
        }
    }

    if (classes && classes.length > 0) {
        htmlElement.classList.add(...classes);
    }

    if (id) {
        htmlElement.id = id;
    }

    // { src: 'link', href: 'http' }
    if (attributes) {
        for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
        }
    }

    if (parentNode) {
        parentNode.appendChild(htmlElement);
    }

    return htmlElement;
}

fetchQuotes();