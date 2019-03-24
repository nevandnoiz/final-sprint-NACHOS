import axios from 'axios'

export default {
    getNewsByArr
}

function getNewsByArr(items) {
    const news = []
    items.forEach(item => {
        getNewsByStr(item)
            .then(res => {
                const filteredNews = filterNews(res, 3)
                news.push(filteredNews)
            })
    })
    return news;
}

function getNewsByStr(str) {
    return axios.get(`https://newsapi.org/v2/everything?q=${str}&from=2019-03-01&sortBy=relevancy&apiKey=cb55db45cf6e44ce9d46a7e7cefc1922`)
        .then(res => { return { searchTerm: str, articles: res.data.articles } })
}

function filterNews(news, numOfArticles = 3) {
    const filteredNews = []
    news.articles.forEach(article => {
        if (
            article.description.includes(news.searchTerm) ||
            article.title.includes(news.searchTerm)) {
            article.searchTerm = news.searchTerm
            article.type = 'article'
            filteredNews.push(article)
        }
    });
    while (filteredNews.length > numOfArticles) {
        const randomIdx = Math.floor(Math.random() * filteredNews.length)
        filteredNews.splice(randomIdx, 1)
    }
    return filteredNews
}