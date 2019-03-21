<template>
  <div class="details" v-if="dominantColor">
    <div v-if="isTrailer">
      <youtube
        class="youtube-container"
        :video-id="this.movie.videos.results[0].key"
        player-vars="{ autoplay: 1 }"
      ></youtube>
    </div>

    <!-- <h1>Nachos details</h1> -->
    <div v-if="!isTrailer && dominantColor" class="detalis-sections" :style="bckImage">
      <div class="row" :style="bckColor">


      <div class="movie-container">
        <img class="movie-poster-img" ref="moviePoster" :src="imgURL">
        <div class="movie-details">
          <div class="details-text">
            <h1>{{movie.details.title}}</h1>
            <!-- <a href="//www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a> -->
            <!-- <h4>Release date: {{movie.details.release_date}}</h4> -->
            <p>{{movie.details.overview}}</p>
          </div>
          <div class="icons-container">
            <i @click="onTrailer" class="far fa-play-circle"></i>
            <a
              target="_blank"
              v-if="movie.externalIds.twitter_id"
              :href="`https://twitter.com/${movie.externalIds.twitter_id}`"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              v-if="movie.externalIds.facebook_id"
              :href="`https://www.facebook.com/${movie.externalIds.facebook_id}`"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a
              target="_blank"
              v-if="movie.externalIds.instagram_id"
              :href="`https://www.instagram.com/${movie.externalIds.instagram_id}`"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              target="_blank"
              v-if="movie.externalIds.imdb_id"
              :href="`https://www.imdb.com/title/${movie.externalIds.imdb_id}`"
            >
              <i class="fab fa-imdb"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <button v-if="isTrailer" @click="onTrailer">Trailer</button>
  </div>



      </div>
</template>
<script>
import UtilityService from "@/services/UtilityService.js";
const sightengine = require("sightengine")("1163479865","rQZS3hEBvZSJ9Nqbc5qu");

// import colorThief from 'colorthief'
// const color = new ColorThief()
// var sightengine = require('sightengine')('1163479865', 'rQZS3hEBvZSJ9Nqbc5qu')
export default {
  created() {
    sightengine.check(["properties"]).set_url(this.imgURL)
      .then(function(result) {
        // console.log(result);
        return result.colors.dominant.hex
        // console.log(this.dominatedColor)
      }).then(res=>this.dominantColor = res)
      .catch(function(err) {
        // Handle error
      });
      
    
  },
  data() {
    return {
      dominantColor: null,
      isTrailer: false
    };
  },
  props: ["movie"],
  methods: {
    onTrailer() {
      console.log("on trailer click");
      this.isTrailer = !this.isTrailer;
    }
  },
  computed: {
    bckImage(){
      return {
         backgroundImage: `url(http://image.tmdb.org/t/p/w1280${this.movie.details.backdrop_path})`
      }
    },
    bckColor() {
        return {
            // in the case of redComp, greenComp and blueComp are a vue prop or data
            background : this.dominantColor+'B3'
        };
    },
    imgURL() {
      return UtilityService.imgURL(this.movie.details.poster_path, 300);
    }
  }
};
</script>

<style scoped>
.detalis-sections {
background-repeat: no-repeat;
    background-size: 100%;
    height: 580px;
}
.row{
    /* overflow: hidden; */
    height: 100% !important;
    /* width: 100vw; */
    z-index: 2;
    position: inherit;
}

button {
  position: relative;
}
* {
  color: black;
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
iframe {
  width: 80vw;
  height: 80vw;
}
.movie-container {
  margin: 0 auto;
  border-radius: 3px;
  padding: 40px;
  max-width: 60%;
  /* background-color: lightslategray; */
  display: flex;
}

.movie-poster-img {
  border-radius: 5px;

  /* SHADOWS */
  -webkit-box-shadow: 0px 0px 12px #000000;
  -moz-box-shadow: 0px 0px 12px #000000;
  box-shadow: 0px 0px 12px #000000;
  background-color: #dddddd;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12pt;
  color: #888888;
  text-align: center;
}
.icons-container > * {
  font-size: 2rem;
  margin: 0 0.5rem;
}
.icons-container > *:hover {
  cursor: pointer;
}
.details {
  /* background-color: lightslategray; */
}
.details-text > * {
  
  margin: 5px 0;
}
.details-text>p {
font-size: 1.4rem;
}
.details-text>h1 {
font-size: 2rem;
}
.movie-container > img {
  margin-right: 20px;
}
.movie-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.movie-details > p {
  margin-top: 20px;
}

.youtube-container {
  /* position: fixed; */
  right: 0;
  left: 0;
  top: 10vw;
  margin: 50px auto 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 50px;
  /* background-color: lightgray; */
}
</style>
