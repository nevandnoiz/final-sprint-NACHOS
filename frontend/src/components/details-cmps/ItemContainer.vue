<template>
  <div class="details">
    <div v-if="isTrailer">
      <youtube
        class="youtube-container"
        :video-id="this.item.videos.results[0].key"
        player-vars="{ autoplay: 1 }"
      ></youtube>
    </div>

    <!-- <h1>Nachos details</h1> -->
    <div v-if="!isTrailer" class="detalis-sections" :style="bckImage">
      <div class="row" :style="bckColor">


      <div class="item-container">
        <img class="item-poster-img" ref="itemPoster" :src="imgURL">
        <div class="item-details">
          <div class="details-text">
            <h1>{{item.details.title || item.details.name}}</h1>
            <!-- <a href="//www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a> -->
            <!-- <h4>Release date: {{item.details.release_date}}</h4> -->
            <p>{{item.details.overview}}</p>
          </div>
          <div class="icons-container">
            <i @click="onTrailer" class="far fa-play-circle"></i>
            <a
              target="_blank"
              v-if="item.externalIds.twitter_id"
              :href="`https://twitter.com/${item.externalIds.twitter_id}`"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              v-if="item.externalIds.facebook_id"
              :href="`https://www.facebook.com/${item.externalIds.facebook_id}`"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a
              target="_blank"
              v-if="item.externalIds.instagram_id"
              :href="`https://www.instagram.com/${item.externalIds.instagram_id}`"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              target="_blank"
              v-if="item.externalIds.imdb_id"
              :href="`https://www.imdb.com/title/${item.externalIds.imdb_id}`"
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

// import colorThief from 'colorthief'
// const color = new ColorThief()
// var sightengine = require('sightengine')('1163479865', 'rQZS3hEBvZSJ9Nqbc5qu')
export default {
  created() {
    console.log(this.dominantColor)
      
    
  },
  data() {
    return {
      isTrailer: false
    };
  },
  props: ["item","dominantColor"],
  methods: {
    onTrailer() {
      console.log("on trailer click");
      this.isTrailer = !this.isTrailer;
    }
  },
  computed: {
    bckImage(){
      return {
         backgroundImage: `url(http://image.tmdb.org/t/p/w1280${this.item.details.backdrop_path})`
      }
    },
    bckColor() {
        return {
            // in the case of redComp, greenComp and blueComp are a vue prop or data
            background : this.dominantColor+'B3'
        };
    },
    imgURL() {
      return UtilityService.imgURL(this.item.details.poster_path, 300);
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
i{
  color: white
}
iframe {
  width: 80vw;
  height: 80vw;
}
.item-container {
  margin: 0 auto;
  border-radius: 3px;
  padding: 40px;
  max-width: 60%;
  /* background-color: lightslategray; */
  display: flex;
}

.item-poster-img {
  border-radius: 5px;
  width: 300px;
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
color: white
}
.details-text>h1 {
font-size: 2rem;
color: white
}
.item-container > img {
  margin-right: 20px;
}
.item-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.item-details > p {
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
