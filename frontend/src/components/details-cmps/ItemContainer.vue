<template>
<section>
      <div v-if="!isTrailer" class="details-sections" :style="bckImage">
        <div :style="bckColor" class="row">

        </div>
  <div class="item-main-container">
    <!-- <h1>Nachos details</h1> -->
      <div class="main-container-of-poster-info">
        <div class="white-fill"></div>
        <div class="item-container">
       
     
          <div class="shadowing-container">
            <div class="social-main-container">

<social-button-bar :item="item"></social-button-bar>
            </div>
            
            <div  :style="{'background':''+dominantColor+''}" class="details-text">

              <seasons-menu v-if="item.seasons" :seasons="item.seasons" :tvShowId="item.details.id"></seasons-menu>
              <p :style="{'color':''+isLightOrDark+''}" >{{item.details.overview}}</p>
            </div>

            <div class="shadowing">
              <!-- icons -->

              <!-- end icons -->
              <!-- <pannel-heading class="pannel-heading-epo" :title="'Description'" :dominantColor="dominantColor"></pannel-heading> -->
              <h1 class="title">{{item.details.title || item.details.name}}</h1>
              <media-icons-bar class="media-icons-bar"></media-icons-bar>
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
            <div class="black-filler"></div>
                      <!-- <netflix-season-menu  class="netflix-season-menu-container"></netflix-season-menu> -->

            <!-- <div class="icons-container">
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
            </div> -->
          </div>

          <!-- <div class="item-details"> -->

          <!-- </div> -->
        </div>
        <button v-if="isTrailer" @click="onTrailer">Trailer</button>
      </div>
    </div>
  </div>
  <p>
  </p>
  
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

// import NetflixSlideSeason from "@/components/details-cmps/NetflixSlideSeason.vue";
// import SeasonsList from "@/components/details-cmps/SeasonsList.vue";
// import NetflixSlideMain from "@/components/details-cmps/NetflixSlideMain.vue";
// import NetflixSeasonMenu from "@/components/details-cmps/NetflixSeasonMenu.vue";
import { eventBus } from "@/main.js";
export default {
  components: {
    PannelHeading,
    SocialButtonBar,
    // NetflixSeasonMenu,
    // NetflixSlideMain,
    NavBar,
    
    SeasonsMenu,
    // NetflixSlideSeason,
    UserControlBar,
    MediaIconsBar
  },
  async created() {
    console.log('this item from itemContianer:',this.item)
    eventBus.$on("onSeasonsListClick",() => (this.isSeasonsListMode = !this.isSeasonsListMode));
  },
  data() {
    return {
      isSeasonsListMode: false,
      isTrailer: false,
    };
  },
 props: ["item", "dominantColor"],
  methods: {
    listing() {
    },
    onTrailer() {
      this.isTrailer = !this.isTrailer;
    }
  },
  computed: {
      isLightOrDark() {
        if(UtilityService.lightOrDark(this.dominantColor) === 'light') return 'black'
        else return 'white'
      },
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
@import url("https://fonts.googleapis.com/css?family=Arvo");

*{
    font-family: Arvo;
}

a {
  font: -webkit-control;
}
iframe {
  width: 100%;
}
.black-filler {
      background: black;
      height: 73px;
    /* z-index: 343434543; */
    /* background: antiquewhite; */

}
.social-main-container {
    display: flex;
    -ms-flex-pack: end;
    justify-content: flex-end;
    color: white;
    -ms-flex-order: 2;
    order: 2;
    -ms-flex-align: end;
    align-items: flex-end;
    display: flex;
    z-index: 3333;
    -ms-flex-direction: row;
    flex-direction: row;
    grid-row: 1;
    grid-column: 2;
}
.pannel-heading-epo{
      margin-top: 1.3rem;
 grid-column: 1/8;
    grid-row: 43;
}
   
.pannel-heading>h1{
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
  grid-row: 5;
  /* margin-left: 2em; */
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
  align-items: center;
}

.shadowing {
    z-index: 33;
    grid-row: 1;
    grid-column: 2;
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
        height: 494px;
}
.row {
    background: rgba(39, 36, 18, 0.7);
    width: 100%;
    top: 0;
    position: absolute;
    height: 100% !important;
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
iframe {
  width: 80vw;
  height: 80vw;
}
.white-fill {
      display: none;
    background-color: #f5f5f5;
    grid-row: 2;
    padding-bottom: 285px

}
.item-container {
    display: grid;
    width: 76vw;
    z-index: 1;
    grid-template-columns: 400px 2fr;
    grid-template-rows: minmax(75px, auto) 1fr;
    margin: 120px auto;
    border-radius: 3px;
}

.item-poster-img {
  z-index: 3;
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
position: relative;
      box-shadow: 0px 0px 12px #000000;
    padding: 20px;
    margin: 0;
    grid-column: 2;
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2));
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


</style>
