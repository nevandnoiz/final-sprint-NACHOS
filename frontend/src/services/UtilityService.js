module.exports = {
  imgURL
 }

function imgURL(imgPATH){
    // if(!imgPATH) imgPATH = 'asd'
    console.log('IMGPATHIS',imgPATH)
    return 'http://image.tmdb.org/t/p/w185/'+imgPATH
  }