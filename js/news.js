const geoApi = "https://us1.locationiq.com/v1/reverse.php?key=";
const geoKey = "pk.e3976893d40464da4600650f1376d19d";
const newsApi = "https://saurav.tech/NewsAPI/top-headlines/category/general/";
const latitude = !!localStorage.getItem('lat') ? localStorage.getItem('lat') : "51.5074";
const longitude = !!localStorage.getItem('lon') ? localStorage.getItem('lon') : "0.1278";

(() => {
    try{
        fetch(`${geoApi}${geoKey}&lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json()
            .then(data => {
                const coutryCodes = ['in', 'us', 'au', 'ru', 'fr', 'gb'];
                const country = data.address.country_code === 'ca' ? 'us' : coutryCodes[Math.floor(Math.random()*coutryCodes.length)];
                fetchNews(country);
            })
        );
    }
    catch(err){
        console.log("Error in news IIFE", err);
    }
})();

const shuffleArray = (array) => {
    try{
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
        while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        return array;
    }
    catch(err){
        console.log("Error in shuffleArray", err);
    }
};

const fetchNews = (country) => {
    try{
        fetch(`${newsApi}/${country}.json`)
            .then(response => response.json()
            .then(data => {
                let articlesArray = [];
                for(let i = 0; i < data.articles.length; i++){
                    let newsArticle = {
                        title: data.articles[i].title,
                        img: data.articles[i].urlToImage,
                        url: data.articles[i].url
                    };
                    articlesArray.push(newsArticle);
                }
                articlesArray = shuffleArray(articlesArray);
                articlesArray = articlesArray.splice(0, 9);
                prntArticles(articlesArray);
            })
        );
    }
    catch(err){
        console.log("Error in fetchNews", err);
    }
};

const prntArticles = (newsArr) => {
    try{
        const newsUl = document.querySelector('.news-ul');
        for(let i = 0; i < newsArr.length; i++){
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = !!newsArr[i].img ? newsArr[i].img : "images/not-found.png";
            img.classList.add(!!newsArr[i].img ? "found" : "not-found");
            let ttl = document.createElement('p');
            ttl.innerHTML = newsArr[i].title;
            let anchr = document.createElement('a');
            anchr.href = newsArr[i].url;
            anchr.target = "_blank";
            anchr.appendChild(img);
            anchr.appendChild(ttl);
            li.appendChild(anchr);
            newsUl.appendChild(li);
        }
        document.querySelector('.artcle-wrap').style.display = "block";
        document.querySelector('.news-loader').style.display = "none";
    }
    catch(err){
        console.log("Error in prntArticles", err);
    }
};