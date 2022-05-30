const searchForm = document.querySelector('.search')
const input = document.querySelector(".input");
const newsList = document.querySelector(".news-list");
const newsContainer = document.querySelector(".newsContainer")

searchForm.addEventListener('submit', retrieve);

// newsContainer.innerHTML = "";
function retrieve(event) {
    event.preventDefault();

    if (input.value == "") {
        alert("Input field is empty");
    }
    else if (input.value != "") {
        
        const apiKey = "1ef9fbc4146c4e73a659e218f25c36d8";
        let topic = input.value;
        console.log(topic);

        let url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`
        let inner = "";
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
           
            data.articles.forEach(articles => {
                let net = `<div class="card">
                <img class="card-img-top" src="${articles.urlToImage}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${articles.title}</h5>
                  <p class="card-text">${articles.content}
                  <a href="${articles.url}" target="_blank" class="btn btn-primary">Read more</a>
                  </p>
                </div>
              </div>`
            //   console.log(net);
                inner += net;
            });
            newsContainer.innerHTML = inner;
            if(newsContainer.innerHTML==""){
                alert("Topic not found !! try something else");
            }
        }).catch((error) => {
            console.log("error");
        })
    }

}