let currentPage = 1;
const per_page = 30;

window.onload = ()=>{
    
   const  get_img = (currentPage)=> { return fetch(`https://api.unsplash.com/photos?page=${currentPage}&per_page=${per_page}&client_id=${api_key}`)
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.json();
   });
};


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
        img.classList.add('lazy');
        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    }
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries,observer) => {
        console.log(entries);
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });

    });
    lazyImages.forEach(img=> {
        imageObserver.observe(img)
    })

}
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

get_img(currentPage).then(generateCards);
window.addEventListener('scroll',debounce(() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500){
        currentPage++;
    
    get_img(currentPage).then(generateCards)
    }
    
        
        
        

 },200));

}