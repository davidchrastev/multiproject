function attachEvents() {
    const input = document.getElementById('input');
    const searchBtn = document.getElementById('searchBtn');
    const BASE_URL = `https://restcountries.com/v3.1/name/`;


    const fetchCountry = () => {
        fetch(BASE_URL + input.value)
            .then((res) => res.json())
            .then((data) => {


                const country = {
                    name: data[0].altSpellings[2],
                    flag: data[0].flags.png,
                    capital: data[0].capital[0],
                    population: data[0].population,
                    map: data[0].maps.googleMaps,
                }
                console.log(country);
                console.log(data);
                displayCountry(country);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        input.value = '';
        document.querySelector('.country').innerHTML = '';
    };

    searchBtn.addEventListener('click', fetchCountry);


    const displayCountry = (country) => {
        const list = document.querySelector('.country');

        const listItem = document.createElement('li');
        listItem.classList.add('country-item');

        const name = document.createElement('h2');
        name.textContent = country.name;

        const flag = document.createElement('img');
        flag.src = country.flag;
        flag.alt = `${country.name} flag`;

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;

        const mapLink = document.createElement('a');
        mapLink.href = country.map;
        mapLink.target = '_blank';
        mapLink.textContent = 'View Map';

        listItem.appendChild(name);
        listItem.appendChild(flag);
        listItem.appendChild(capital);
        listItem.appendChild(population);
        listItem.appendChild(mapLink);

        list.appendChild(listItem);
    };

}

attachEvents();
