<template>
  <section>
    
    <div v-if="!isTrailer" class="details-sections">
      <div :style="bckImage" class="hello"></div>
      <div :style="bckColor" class="row"></div>
      <div class="item-main-container">
        <!-- <h1>Nachos details</h1> -->
        <div class="main-container-of-poster-info">
          <div class="white-fill"></div>
          <div class="item-container">
            <div class="shadowing-container">
              <div class="social-main-container">
                <social-button-bar :item="item"></social-button-bar>
              </div>

              <div :style="{'background':''+dominantColor+''}" class="details-text">
                <seasons-menu
                class="seasons-menu-desktop"
                  v-if="item.seasons"
                  :seasons="item.seasons"
                  :tvShowId="item.details.id"
                ></seasons-menu>
                <p :style="{'color':''+isLightOrDark+''}">{{item.details.overview}}</p>
              </div>

              <div class="shadowing">
                <!-- icons -->
                <div class="geners">
                  <div class="item-info">
                    <h1>{{genres}}</h1>
                  </div>
                  <div class="sub-item-info">
                    <h1>Original Language: {{originalLanguage}}</h1>
                    <h1>Status: {{item.details.status}}</h1>
                    <h1>realse info</h1>

                    
                  </div>
                </div>

                <!-- end icons -->
                <!-- <pannel-heading class="pannel-heading-epo" :title="'Description'" :dominantColor="dominantColor"></pannel-heading> -->
                <h1 class="title">
                  {{item.details.title || item.details.name}}
                  <span
                    class="title"
                    v-if="item.details.release_date"
                  >({{item.details.release_date}})</span>
                </h1>
                <user-control-bar class="user-control-bar"></user-control-bar>
              </div>
            </div>

            <div class="poster-image-container">
              <!-- <seasons-list
              v-show="isSeasonsListMode"
              :seasons="item.seasons"
              :tvShowId="item.details.id"
              ></seasons-list>-->

              <img class="item-poster-img" ref="itemPoster" :src="imgURL">
              <div class="black-filler">
                                <media-icons-bar :watchLinks="item.watchLinks" class="media-icons-bar"></media-icons-bar>

              </div>
              <!-- <netflix-season-menu  class="netflix-season-menu-container"></netflix-season-menu> -->
            </div>

            <!-- <div class="item-details"> -->

            <!-- </div> -->
          </div>
          <button v-if="isTrailer" @click="onTrailer">Trailer</button>
        </div>
      </div>
    </div>
    <p></p>
  </section>
</template>
<script>
import "@/services/AvgColorService.js";
import SeasonsMenu from "@/components/details-cmps/SeasonsMenu.vue";
import UtilityService from "@/services/UtilityService.js";
import NavBar from "@/components/details-cmps/NavBar.vue";
import SocialButtonBar from "@/components/details-cmps/SocialButtonBar.vue";
import MediaIconsBar from "@/components/details-cmps/MediaIconsBar.vue";
import UserControlBar from "@/components/details-cmps/UserControlBar.vue";
import PannelHeading from "@/components/general-cmps/PannelHeading.vue";
// import SeasonsList from "@/components/details-cmps/SeasonsList.vue";

import { eventBus } from "@/main.js";
export default {
  components: {
    PannelHeading,
    SocialButtonBar,
    NavBar,
    SeasonsMenu,
    UserControlBar,
    MediaIconsBar
  },
  async created() {
    console.log("item", this.item);
    // var test = await this.$store.dispatch("getTvShowWatchLinksByKeyword","Prison Break");
    // console.log(test.results[0].locations[4]);
    eventBus.$on(
      "onSeasonsListClick",
      () => (this.isSeasonsListMode = !this.isSeasonsListMode)
    );
  },
  data() {
    return {
      isSeasonsListMode: false,
      isTrailer: false
    };
  },
  props: ["item", "dominantColor"],
  methods: {
    listing() {},
    onTrailer() {
      this.isTrailer = !this.isTrailer;
    }
  },
  computed: {
    originalLanguage(){
      if(this.item.details.original_language === 'en') return 'English'
      return this.item.details.original_language
    },
    genres() {
      var res = "Genres: ";
      this.item.details.genres.forEach(genre => (res += `${genre.name}, `));
      return res.substring(0, res.length - 2);
      console.log(res);
    },
    isLightOrDark() {
      console.log("do we have dom colo?", this.dominantColor);
      if (UtilityService.lightOrDark(this.dominantColor) === "light")
        return "black";
      else return "white";
    },
    bckImage() {
      return {
        backgroundImage: `url(http://image.tmdb.org/t/p/w1280${
          this.item.details.backdrop_path
        })`
      };
    },
    bckColor() {
      // in the case of redComp, greenComp and blueComp are a vue prop or data
      console.log(UtilityService.lightOrDark(this.dominantColor));
      if (UtilityService.lightOrDark(this.dominantColor) === "dark")
        return { background: this.dominantColor + "B3" };
    },
    imgURL() {
      return UtilityService.imgURL(this.item.details.poster_path, 500);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Arvo");

* {
  font-family: Arvo;
}
h1 {
  color: white;
}
a {
  font: -webkit-control;
}
.seasons-menu-desktop {
  display: block
}
.hello {
      background-image: url(http://image.tmdb.org/t/p/w1280/xVzvD5BPAU4HpleFSo8QOdHkndo.jpg);
    z-index: 1;
    width: 100%;
    height: 494px;
    position: absolute;
    top: 0;
        background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: 32%;
}
.geners {
  grid-row: 2;
  grid-column: 2/333;
}
.black-filler {
  z-index: 2;
      box-shadow: 0px 0px 12px #000000;
      display: flex;
          justify-content: center;
  background: black;
      /* height: 100%; */
    min-height: 64px
  /* z-index: 343434543; */
  /* background: antiquewhite; */
}
.social-main-container {
  /* z-index: 4235345345; */
  display: flex;
  -ms-flex-pack: end;
  justify-content: flex-end;
  color: white;
  -ms-flex-order: 2;
  order: 2;
  -ms-flex-align: end;
  align-items: flex-end;
  display: flex;
  /* z-index: 23333; */
  -ms-flex-direction: row;
  flex-direction: row;
  grid-row: 1;
  grid-column: 2;
}
.pannel-heading-epo {
  margin-top: 1.3rem;
  grid-column: 1/8;
  grid-row: 43;
}

.pannel-heading > h1 {
  padding: 0 0.5rem;
  display: flex;
  background-color: white;
  height: 100%;
  align-items: center;
}

.item-main-container {
  display: flex;
  justify-content: center;
}
.netflix-season-menu-container {
  -webkit-box-shadow: 0px 0px 12px #000000;
  box-shadow: 0px 0px 12px #000000;
  /* margin-top: 1rem; */
  width: 100%;
  grid-column: 1;
  grid-row: 1;
  align-self: flex-end;
  /* position: relative; */
  /* display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.netflix-container {
 -webkit-box-shadow: 0px 0px 12px #000000;
    box-shadow: 0px 0px 12px #000000;
    /* padding-bottom: 1.5rem; */
    margin: 0 auto;
    width: 76vw;
}
.item-info {
  margin-top: 0.2rem;
  grid-column: 2/22;
  /* margin: 2rem 0; */
  margin-bottom: 1rem;
  grid-row: 2;
  z-index: 1;
}
.item-info > h1 {
  color: white;
}

.title {
  margin-bottom: 0 !important;
  margin-top: 30px;
  grid-column: 2/4;
  font-size: 2rem;
  grid-row: 1;
  color: white;
  line-height: 2.4rem;
  align-self: end;
}
.nav-bar {
  grid-column: 1/3;
  grid-row: 3;
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
  width: 400px;
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
     grid-column: 2/333;
  grid-row: 5;
  /* margin-left: 2em; */
}
.shadowing-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 374px 1fr;
  grid-column: 2;
  grid-row: 1;

  /* display: none; */
}
.user-control-bar {
  z-index: 10;
  
grid-column: 2/10;
  margin-top: 3rem;
  grid-row: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.shadowing {
  z-index: 33;
  grid-row: 1;
  grid-column: 1/3;
  grid-template: repeat(10, 1fr);
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 2em 1fr 1fr;
  background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
.details-sections {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 32%;
  /* height: 494px; */
}
.row {
  width: 100%;
  top: 0;
  position: absolute;
  height: 494px !important;
  /* width: 100vw; */
  z-index: 2;
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

.white-fill {
  display: none;
  background-color: #f5f5f5;
  grid-row: 2;
  padding-bottom: 285px;
}
.item-container {
  display: grid;
  width: 76vw;
  z-index: 1;
  /* grid-template-columns: 1fr 2fr; */
  grid-template-rows: minmax(75px, auto) 1fr;
     margin: 120px auto 0;
  border-radius: 3px;
}

.item-poster-img {
      min-width: 250px;
  z-index: 3;
  /* border-radius: 5px; */
  /* width: 400px; */
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
/* .icons-container {
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
} */
.icons-container > * {
  font-size: 3rem;
  /* margin: 0 0.5rem; */
}
.icons-container > *:hover {
  cursor: pointer;
}
/* .details {
  background-color: lightslategray;
} */
.details-text {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 12px #000000;
  padding: 20px;
      padding-bottom: 50px;
  margin: 0;
  grid-column: 1/3;
  /* background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)); */
  grid-row: 2;
}
.details-text > * {
  color: white;
  margin: 0;

  padding: 0;
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
  width: 100%;
  grid-row: 2;
  grid-column: 1/4;
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
  /* padding: 50px; */
  /* background-color: lightgray; */
}



@media only screen and (max-width: 1000px) {
  
.item-container {
  width: 95vw;
  /* grid-template-columns: 1fr 1fr; */
}
.hello {
        background-position-y: 100%;

}


}



@media only screen and (max-width: 750px) {
  



* {
  font-family: Arvo;
}
h1 {
  color: white;
}
a {
  font: -webkit-control;
}
i{
  /* font-size: 4rem */
}
.hello {
  height: 1112px;
  background-size:auto;
      background-position-y: 0;
}
.seasons-menu-desktop {
  display: none
}
.geners {
  grid-row: 2;
  grid-column: 2/333;
}

/* item-container > 1fr  */
.black-filler {
  background: black;
      height: 100%;
    min-height: 64px;
      justify-content: center;
      display: flex;
  /* z-index: 343434543; */
  /* background: antiquewhite; */
}
.social-main-container {
  /* z-index: 4235345345; */
  display: flex;
  -ms-flex-pack: end;
  justify-content: flex-end;
  color: white;
  -ms-flex-order: 2;
  order: 2;
  -ms-flex-align: end;
  align-items: flex-end;
  display: flex;
  /* z-index: 23333; */
  -ms-flex-direction: row;
  flex-direction: row;
  grid-row: 1;
  grid-column: 2;
}
.pannel-heading-epo {
  margin-top: 1.3rem;
  grid-column: 1/8;
  grid-row: 43;
}

.pannel-heading > h1 {
  padding: 0 0.5rem;
  display: flex;
  background-color: white;
  height: 100%;
  align-items: center;
}

.item-main-container {
  display: flex;
  justify-content: center;
}
.netflix-season-menu-container {
  -webkit-box-shadow: 0px 0px 12px #000000;
  box-shadow: 0px 0px 12px #000000;
  /* margin-top: 1rem; */
  width: 100%;
  grid-column: 1;
  grid-row: 1;
  align-self: flex-end;
  /* position: relative; */
  /* display: flex; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.netflix-container {
  box-shadow: 0px 0px 12px #000000;
  padding-bottom: 2rem;
  background-color: rgb(39, 36, 18);
  /* padding: 1rem 0; */
  /* padding-bottom: 20px; */
  box-shadow: 0px 0px 12px #000000;
  margin-top: 1rem;
  grid-column: 1/6;
  /* position: relative; */
  display: flex;
  flex-direction: column;
}
.item-info {
  margin-top: 0.2rem;
  grid-column: 2/22;
  /* margin: 2rem 0; */
  margin-bottom: 1rem;
  grid-row: 2;
  z-index: 1;
}
.item-info > h1 {
  color: white;
}

.title {
  margin-bottom: 0 !important;
  margin-top: 30px;
  grid-column: 2/4;
  font-size: 2rem;
  grid-row: 1;
  color: white;
  line-height: 2.4rem;
  align-self: end;
}
.nav-bar {
  grid-column: 1/3;
  grid-row: 3;
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
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  grid-column: 1;
      order: -1;
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
     grid-column: 2/333;
  grid-row: 5;
  /* margin-left: 2em; */
}
.shadowing-container {
  display: grid;
      order: 1;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 374px 1fr;
  grid-column: 2;
  grid-row: 1;

  /* display: none; */
}
.user-control-bar {
  z-index: 10;
      
  margin-top: 3rem;
  grid-row: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.shadowing {
  z-index: 33;
  grid-row: 1;
  grid-column: 1/3;
  grid-template: repeat(10, 1fr);
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 2em 1fr 1fr;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))
}
.details-sections {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 32%;
  /* height: 494px;  */
}
.row {
  width: 100%;
  top: 0;
  position: absolute;
  height: 720px !important;
  /* width: 100vw; */
  z-index: 2;
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

.white-fill {
  display: none;
  background-color: #f5f5f5;
  grid-row: 2;
  padding-bottom: 285px;
}
.item-container {
      margin: 0 0 auto;
  /* display: grid; */
  width: 100vw;
  z-index: 1;
      /* width: 100%; */
    display: flex;
    flex-direction: column;
  /* grid-template-columns: 1fr 2fr; */
  /* grid-template-rows: minmax(75px, auto) 1fr; */
  /* margin: 120px auto; */
  border-radius: 3px;
}

.item-poster-img {
         height: auto;
    width: 100vw;
  z-index: 3;
  /* border-radius: 5px; */
  /* width: 400px; */
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
/* .icons-container {
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
} */
.icons-container > * {
  font-size: 3rem;
  /* margin: 0 0.5rem; */
}
.icons-container > *:hover {
  cursor: pointer;
}
/* .details {
  background-color: lightslategray;
} */
.details-text {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 12px #000000;
  padding: 20px;
      padding-bottom: 20px;
  margin: 0;
  grid-column: 1/3;
  /* background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)); */
  grid-row: 2;
}
.details-text > * {
  color: white;
  margin: 0;

  padding: 0;
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
  width: 100%;
  grid-row: 2;
  grid-column: 1/4;
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
  /* padding: 50px; */
  /* background-color: lightgray; */
}
}

















</style>
