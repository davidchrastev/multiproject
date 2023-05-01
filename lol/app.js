function attachEvents() {
    const input = document.querySelector('.summonerName')
    const btn = document.querySelector('.submit');
    const BASE_URL = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    const CHAMPIONS_ULR = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
    const API_KEY = '?api_key=RGAPI-39fa2939-cd41-4ae2-b865-68b8b77ac7cc';
    const CHAMPION_IMAGE = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

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
                        name: currentChampion.name,
                        blurb: currentChampion.blurb,
                    }

                    console.log(data.data[currentChampion]);
                }

            })
    }
    fetchChampions();

    btn.addEventListener('click', fetchSummoner);

}

attachEvents();