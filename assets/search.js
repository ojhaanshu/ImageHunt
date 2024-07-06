window.onload = function(){
    const location = window.location.href;
    const url = new URL(location);
    const search_param = new URLSearchParams(url.search);

    if(!search_param.has('q') || search_param.get('q')== ""){
        window.location.href ='./';
    }

    fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${search_param.get('q')}&client_id=${api_key}`) .then(convert_to_jason).then(function(data){
        generateCards(data.results);
    });

}

function generateCards(data){

   
console.log(data);
const container = document.getElementById('result-container');
    for(let i = 0; i < data.length; i++){
        const one_item = data[i];

        const card = document.createElement('div');
        const anchor = document.createElement('a');
        const img = document.createElement('img');

card.classList.add('item');
anchor.href = `./detail.html?id=${one_item.id}`;
card.style.backgroundColor=one_item.color;
img.src = one_item.urls.thumb;

anchor.appendChild(img);
card.appendChild(anchor);
container.appendChild(card);
    }
}
