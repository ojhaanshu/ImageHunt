let currentPage = 1;
const per_page = 30;


window.onload = function () {
    const location = window.location.href;
    const url = new URL(location);
    const search_param = new URLSearchParams(url.search);

    if (!search_param.has('q') || search_param.get('q') === "") {
        window.location.href = './';
        return; // Stop further execution
    }

    const get_img = (currentPage) => {
        return fetch(`https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${per_page}&query=${search_param.get('q')}&client_id=${api_key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
           
    };

    function generateCards(data) {
        console.log(data);
        const container = document.getElementById('result-container');
        for (let i = 0; i < data.results.length; i++) {
            const one_item = data.results[i];

            const card = document.createElement('div');
            const anchor = document.createElement('a');
            const img = document.createElement('img');

            card.classList.add('item');
            anchor.href = `./detail.html?id=${one_item.id}`;
            card.style.backgroundColor = one_item.color;
            img.src = one_item.urls.thumb;

            anchor.appendChild(img);
            card.appendChild(anchor);
            container.appendChild(card);
        }
    }

    get_img(currentPage).then(generateCards);

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            currentPage++;
            get_img(currentPage).then(generateCards);
        }
    });
};
