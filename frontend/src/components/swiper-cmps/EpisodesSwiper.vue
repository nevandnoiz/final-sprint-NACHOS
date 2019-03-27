<template>
  <section v-if="season" class="slider-main-container">
    <carousel :paginationEnabled="false" :navigationEnabled="true" :per-page="5">
      <slide
        class="slider-card"
        :style="{'background-image':'url(\''+imgURL(eposide.still_path)+'\')'}"
        v-for="(eposide, index) in season.episodes"
        :key="index"
      >
        <div class="color-fill" @mouseover="mouseOver" @mouseleave="mouseLeave" :style="{'background':''+dominantColor+'66'}"></div>
        <div class="check-container">
          <i class="fas fa-check" @click="onCheckEpo"></i>
        </div>
        <h1>{{eposide.episode_number}}</h1>
        <p>{{eposide.name}}</p>
      </slide>
    </carousel>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
import UtilityService from "@/services/UtilityService.js";

export default {
  async created() {
    console.log('epiSwiper:' , this.seasons,this)
    eventBus.$on("onSeasonClick", index => this.onEmit(index));
    this.seasonsDetails = await this.$store.dispatch({
      type: "getSeasonDetails",
      id: this.tvShowId,
      seasons: this.seasons
    });
    this.onEmit(0);
    // console.log(this.season.episodes);
  },
  components: {},
  data() {
    return {
      fillColor: true,
      season: null,
      seasonsDetails: null,

      checkedEpisodes: null
    };
  },
  methods: {
    mouseOver(){
      this.fillColor = false;
    },
    onCheckEpo() {
      console.log('checked')
    },
    onEmit(index) {
      this.season = this.seasonsDetails[index].data;
    },
    imgURL(stillPath) {
      return UtilityService.imgURL(stillPath, 780);
    }
  },
  props: ["seasons", "tvShowId", "dominantColor"]
};
</script>

<style scoped>

.color-fill{
    z-index: 2434;
    height: 100%;
    position: absolute;
    width: 100%;
}
.color-fill:hover{
  background-image: none;
  background-color: none !important
}

h1 {
  z-index: 434134;
  color: white;
  margin: 0.1rem 0.5rem;
  align-self: flex-start;
  order: -1;
  font-size: 1.8rem;
}

p {
  z-index: 434134;
  color: white;
  align-self: end;
  margin: 0.2rem;
}
i {
  z-index: 434134;
  font-size: 42px;
  margin: 9px 9px 9px 0;
  background-color: white;
  opacity: 0.5;
  color: darkslategray;
  padding: 8px;
  /* height: 57px; */
  border-radius: 50%;
  flex-grow: 0;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
i:hover {
  cursor: pointer;
  opacity: 0.75;
}
.check-container {
  position: absolute;
  /* margin: 50%; */
  top: 0;
  /* left: 0; */
  /* right: 0; */
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  /* flex-grow: unset; */
  bottom: 0;
}
.checked {
  background-color: rgb(1, 221, 1);
}

.slider-main-container {
  z-index: 3423423423;
}
.swiper-container {
  width: 600px;
  height: 300px;
}
.slider-card {
  background-color: black;
  background-size: 287px;
  height: 161px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid;
  background-repeat: no-repeat;
}

.cards-container-of-season-netflix {
  position: relative;
}
</style>
