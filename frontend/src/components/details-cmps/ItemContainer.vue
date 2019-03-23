<template>
  <div class="details" :style="bckImage">
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
          
          <actor-card :item="item.credits"></actor-card>
          <nav-bar class="nav-bar"></nav-bar>
          <div class="shadowing-container">
            <div class="details-text">
              <h1>{{item.details.title || item.details.name}}</h1>
              <!-- <a href="//www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a> -->
              <!-- <h4>Release date: {{item.details.release_date}}</h4> -->
              <p>{{item.details.overview}}</p>
            </div>
         

            <div class="shadowing">
                 <user-control-bar class="user-control-bar"></user-control-bar>
            </div>
          </div>
          <media-icons-bar class="media-icons-bar"></media-icons-bar>
          <div class="poster-image-container">
            <img class="item-poster-img" ref="itemPoster" :src="imgURL">
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

          <!-- <div class="item-details"> -->

          <!-- </div> -->
        </div>
        <button v-if="isTrailer" @click="onTrailer">Trailer</button>
      </div>
    </div>
  </div>
</template>
<script>
import "@/services/average-color.js";
import UtilityService from "@/services/UtilityService.js";
import NavBar from "@/components/details-cmps/NavBar.vue";
import MediaIconsBar from "@/components/details-cmps/MediaIconsBar.vue";
import UserControlBar from "@/components/details-cmps/UserControlBar.vue";
import ActorCard from "@/components/details-cmps/ActorCard.vue"
export default {
  components: {
    NavBar,
    ActorCard,
    UserControlBar,
    MediaIconsBar
  },
  data() {
    return {
      isTrailer: false
    };
  },
  props: ["item", "dominantColor"],
  methods: {
    onTrailer() {
      console.log("on trailer click");
      this.isTrailer = !this.isTrailer;
    }
  },
  computed: {
    bckImage() {
      return {
        backgroundImage: `url(http://image.tmdb.org/t/p/w1280${
          this.item.details.backdrop_path
        })`
      };
    },
    bckColor() {
      return {
        // in the case of redComp, greenComp and blueComp are a vue prop or data
        background: this.dominantColor + "B3"
      };
    },
    imgURL() {
      return UtilityService.imgURL(this.item.details.poster_path, 500);
    }
  }
};
</script>

<style scoped>
a {
  font: -webkit-control;
}
.nav-bar {
    grid-column: 1/3;
    grid-row: 2;
    margin-top: 10px;
    margin-bottom: 20px;
    margin: m;
    margin-bottom: 3;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.poster-image-container {
  display: flex;
  flex-direction: column;
  grid-column: 1;
  grid-row: 1;
}
.media-icons-bar {
  /* display: block; */
  /* z-index: 40; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* flex-grow: 0; */
  grid-column: 2;
  grid-row: 1;
  margin-left: 2em;
}
.shadowing-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 374px 1fr;
  grid-column: 2;
  grid-row: 1;

  /* display: none; */
}
.user-control-bar {
       z-index: 10;
           grid-column: 2;
    grid-row: 3;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.shadowing {
    grid-column: 2;
    grid-template: repeat(10, 1fr);
    display: grid;
    grid-template-rows: repeat(5,1fr);
    grid-template-columns: 2em 1fr 1fr;
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
.detalis-sections {
  background-repeat: no-repeat;
  background-size: 100%;
  height: 580px;
}
.row {
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
i {
  color: white;
}
iframe {
  width: 80vw;
  height: 80vw;
}

.item-container {
  display: grid;
  z-index: 1;
  /* height: 750px; */
  /* column-gap: 1.5em; */
  grid-template-columns: 400px 2fr;
  grid-template-rows: minmax(75px, auto);
  margin: 0 auto;
  /* grid-template-rows: repeat(14,75px); */
  /* gap: 3em; */
  border-radius: 3px;
  /* padding: 40px; */
  margin-top: 205px;
  max-width: 67%;
  /* background-color: lightslategray; */
  /* display: flex; */
}

.item-poster-img {
  /* border-radius: 5px; */
  width: 400px;
  grid-column: 1;
  grid-row: 1;
  -webkit-box-shadow: 0px 0px 12px #000000;
  box-shadow: 0px 0px 12px #000000;
  background-color: #dddddd;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 12pt;
  color: #888888;
  text-align: center;
}
.icons-container {
  box-shadow: 0px 0px 12px #000000;
  color: black;
  background-color: black;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  justify-content: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  grid-row: 2;
  grid-column: 1;
}
.icons-container > * {
  font-size: 3rem;
  margin: 0 0.5rem;
}
.icons-container > *:hover {
  cursor: pointer;
}
.details {
  /* background-color: lightslategray; */
}
.details-text {
  padding: 20px;
  color: black;
  margin: 0;
  grid-column: 2;
  /* padding-top: 300px; */
  grid-row: 2;
  /* padding: 0; */
}
.details-text > * {
  /* color: black; */
  margin: 0;

  padding: 0;
}
.details-text > p {
  font-size: 1.4rem;
  color: black;
}
.details-text > h1 {
  font-size: 2rem;
  color: black;
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
