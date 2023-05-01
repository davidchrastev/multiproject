function attachEvents() {
    // const input = document.querySelector('.summonerName')
    // const btn = document.querySelector('.submit');
    // const BASE_URL = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    const CHAMPIONS_ULR = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
    // const API_KEY = '?api_key=RGAPI-39fa2939-cd41-4ae2-b865-68b8b77ac7cc';
    const CHAMPION_IMAGE = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    const champs = document.querySelector('.container');

    const fetchSummoner = () => {
        fetch(BASE_URL + input.value + API_KEY)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
    };

    const championNames = [];

    const fetchChampions = () => {
        fetch(CHAMPIONS_ULR)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data.data) {
                    championNames.push(key);
                }
                for (let i = 0; i < championNames.length; i++) {
                    let currentChampion = championNames[i];
                    const leagueChamp = {
                        name: currentChampion,
                        title: data.data[currentChampion].title,
                        blurb: data.data[currentChampion].blurb,
                        image: CHAMPION_IMAGE + currentChampion + '_0.jpg',
                        attack: data.data[currentChampion].info.attack,
                        defense: data.data[currentChampion].info.defense,
                        difficulty: data.data[currentChampion].info.difficulty,
                        magic: data.data[currentChampion].info.magic,
                        type: data.data[currentChampion].tags[0] + ' ' + data.data[currentChampion].tags[1],
                    }

                    console.log(data.data[currentChampion]);
                    displayChamp(leagueChamp);
                }

            })
    }
    const displayChamp = (champion) => {
        console.log(champion);
        const champsString = `
        <li class="card">
            <img class="card-image" src="${champion.image}"/>
            <h2 class="card-title">${champion.name} "${champion.title}"</h2>           
            <p class="card-subtitle">Type: ${champion.blurb}</p>
            <p class="card-subtitle">
                Attack: ${champion.attack},<br>
                Defence: ${champion.defense},<br>
                Difficulty: ${champion.difficulty},<br>
                Magic: ${champion.magic},<br>
                Type: ${champion.type}
            </p>
        </li>
    `;
        champs.innerHTML += champsString;
    };


    fetchChampions();

    btn.addEventListener('click', fetchSummoner);

}

attachEvents();