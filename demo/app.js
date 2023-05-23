function attachEvents() {
    const API_KEY = '';
    const BASE_URL = 'https://api.api-ninjas.com/v1/quotes?category=';

    const input = document.getElementById('categorySelect');
    const button = document.getElementById('button');
    const cardContainer = document.getElementById('quoteCard');
    button.addEventListener('click', presentCategory);

    function presentCategory(event) {
        event.preventDefault();

        fetch(BASE_URL + input.value, {
            headers: {
                'X-Api-Key': API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                cardContainer.innerHTML = '';

                const category = data[0].category;
                const quote = data[0].quote;


                const card = document.createElement('div');
                card.className = 'card';

                const categoryElement = document.createElement('p');
                categoryElement.textContent = `Category: ${category}`;

                const quoteElement = document.createElement('p');
                quoteElement.textContent = `Quote: ${quote}`;

                card.appendChild(categoryElement);
                card.appendChild(quoteElement);

                cardContainer.appendChild(card);

            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.log('Error:', error);
            });

    }
}

attachEvents();

