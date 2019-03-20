module.exports = {
  imgURL
 }

function imgURL(posterPath,size){
    return `http://image.tmdb.org/t/p/w${size}${posterPath}`
  }