function attachEvents() {
    const input = document.getElementById('input');
    const searchBtn = document.getElementById('searchBtn');
    const BASE_URL = `https://restcountries.com/v3.1/name/`;


    const fetchCountry = () => {
        fetch(BASE_URL + input.value)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    searchBtn.addEventListener('click', fetchCountry);
}

attachEvents();
