function attachEvents() {
    const button = document.getElementById('random');
    const BASE_URL = 'https://api.chucknorris.io/jokes/random';
    const paragraph = document.getElementById('joke');
    let products = [];
    button.addEventListener('click', getRandomJoke);
    const title = document.getElementById('title');
    function getRandomJoke(event) {
        event.preventDefault();
        title.innerHTML = '';
        paragraph.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((allProducts) => {
                products = Object.values(allProducts);
                console.log(products);

                paragraph.innerHTML = products[6];



    }).catch(err => {
        console.log(err);
        });
    }


}




attachEvents();