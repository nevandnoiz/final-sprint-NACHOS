<template>
  <section v-if="season" class="slider-main-container">
    <carousel :paginationEnabled="false" :navigationEnabled="true" :per-page="5">
      <slide
        class="slider-card"
        :style="{'background-image':'url(\''+imgURL(eposide.still_path)+'\')'}"
        v-for="(eposide, index) in getSeason.episodes"
        :key="index"
      >
    <check-episode v-if="currUser" :episode="eposide"></check-episode>
        <div class="color-fill" :style="{'background':''+dominantColor+'66'}"></div>
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
import CheckEpisode from "@/components/swiper-cmps/CheckEpisode.vue";

export default {
  async created() {
    eventBus.$on("onSeasonClick", index => this.onEmit(index));
    this.seasonsDetails = await this.$store.dispatch({
      type: "getSeasonDetails",
      id: this.tvShowId,
      seasons: this.seasons
    });
    eventBus.$on("watchedSeason", this.toggleWatchedSeason);
    this.onEmit(0);
  },
  components: {
    CheckEpisode
  },
  data() {
    return {
      fillColor: true,
      season: null,
      seasonsDetails: null,
      isChecked: false,
      checkedEpisodes: null
    };
  },
  methods: {
    // toggleMarkWatched(episode) {
    //   this.isChecked=!this.isChecked
      // this.$store.dispatch({
      //   type: "markWatched",
      //   showId: episode.show_id,
      //   epId: episode.id
      // });
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
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    getSeason(){
      return this.season
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
  /* padding: 0 3px; */
  /* border: 1px solid; */
  border-left: 2px solid;
  border-right: 2px solid;
  background-repeat: no-repeat;
}

.cards-container-of-season-netflix {
  position: relative;
}
</style>
