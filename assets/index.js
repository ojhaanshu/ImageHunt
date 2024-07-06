window.onload = function(){
    fetch(`https://api.unsplash.com/photos?per_page=35&client_id=${api_key}`) .then(convert_to_jason).then(function(data){
        generateCards(data);
    });

}

function generateCards(data){

   
console.log(data);
    const container = document.getElementById('img-container');
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