window.onload = function(){
    const location = window.location.href;
    const url = new URL(location);
    const search_param = new URLSearchParams(url.search);

    if(!search_param.has('id') || search_param.get('id') == ""){
        window.location.href ='./';

    }

    fetch(`https://api.unsplash.com/photos/${search_param.get('id')}?client_id=${api_key}`).then(convert_to_jason).then(function(data){
        loadDetail(data);
    });

}

function loadDetail(data){
    console.log(data);
    document.getElementById('detail_img').src = data.urls.regular;
    document.getElementById('detail_img').style.borderColor = data.color;
    
    document.getElementById('username').innerText = data.user.username;
    document.getElementById('likes').innerText = data.likes;
    document.getElementById('view_count').innerText = data.views;
    document.getElementById('alt_description').innerText = data.alt_description;
    document.getElementById('img_color').style.backgroundColor = data.color;
    document.getElementById('color_text').innerText = data.color;
    document.getElementById('download').href = data.links.download;

    const date = new Date(data.created_at);
    const upload_date =`${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`;
    document.getElementById('upload_date').innerText = upload_date;
}