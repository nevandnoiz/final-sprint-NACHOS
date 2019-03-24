import axios from 'axios'

export default {
    getNewsByArr
}

function getNewsByArr(items) {
    const news = []
    items.forEach(item => {
        getNewsByStr(item)
            .then(res => {
                const filteredNews = filterNews(res)
                news.push(filteredNews)
            })
    })
    console.log(news);
}

function getNewsByStr(str) {
    return axios.get(`https://newsapi.org/v2/everything?q=${str}&from=2019-03-01&sortBy=relevancy&apiKey=cb55db45cf6e44ce9d46a7e7cefc1922`)
        .then(res => { return { searchTerm: str, articles: res.data.articles } })
}

function filterNews(news) {
    const filteredNews = {searchTerm: news.searchTerm, articles: []}
    news.articles.forEach(article => {
        if (
            article.description.includes(news.searchTerm) ||
            article.title.includes(news.searchTerm)) {
            filteredNews.articles.push(article)
        }
    });
    return filteredNews
}