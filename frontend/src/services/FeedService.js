import axios from 'axios'

export default {
    getNewsByArr
}

 function getNewsByArr(items, numOfArticles = 3) {
    const news = []
    items.forEach(item => {
        getNewsByObj(item)
            .then(res => {
                // console.log(res);
                const filteredNews = filterNews(res, numOfArticles)
                news.push(filteredNews)
            })
    })
    return news;
}

async function getNewsByObj(obj) {
    return axios.get(`https://newsapi.org/v2/everything?q=${obj.name}&from=2019-03-01&sortBy=relevancy&apiKey=1668455b7c154817b93f4fa5fd2630d7`)
        .then(res => { return { searchTerm: obj.name, id: obj.id, type: obj.item_type, articles: res.data.articles } })
}

function filterNews(news, numOfArticles) {
    const filteredNews = []
    news.articles.forEach(article => {
        if (
            article.description.includes(news.searchTerm) ||
            article.title.includes(news.searchTerm)) {
            article.searchTerm = { searchTerm: news.searchTerm, id: news.id, type: news.type }
            article.type = 'FeedArticle'
            filteredNews.push(article)
        }
    });
    while (filteredNews.length > numOfArticles) {
        const randomIdx = Math.floor(Math.random() * filteredNews.length)
        filteredNews.splice(randomIdx, 1)
    }
    return filteredNews
}