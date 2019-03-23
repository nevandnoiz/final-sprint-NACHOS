<template>
  <div class="seasons-container" v-if="seasonsDeatails">
    <template v-for="(season,index) in seasonsDeatails">
      <div
        class="season-title"
        @click="selectSeason(index)"
        :key="index"
        :style="{'background-image':'url(\''+imgURL(season.poster_path)+'\')'}"
      >
        <h3>{{season.name}}</h3>
      </div>
      <transition name="fade" :key="index">
        <episodes-list v-if="index===currPreviewIdx" :episodes="season.episodes"></episodes-list>
      </transition>
    </template>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import EpisodesList from "@/components/details-cmps/EpisodesList.vue";

export default {
  props: ["seasons", "tvShowId"],
  components: {
    EpisodesList
  },
  data() {
    return {
      seasonsDeatails: [],
      currPreviewIdx: null
    };
  },
  async created() {
    let seasonsDeatails = [];
    for (let season of this.seasons) {
      let details = await this.$store.dispatch({
        type: "getSeasonDetails",
        id: this.tvShowId,
        seasonNum: season.season_number
      });
      if (details.name !== "Specials") seasonsDeatails.push(details);
    }
    this.seasonsDeatails = seasonsDeatails;
  },
  methods: {
    selectSeason(idx) {
      if (this.currPreviewIdx === idx) return (this.currPreviewIdx = null);
      this.currPreviewIdx = idx;
    },
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 780);
    }
  }
};
</script>

<style lang="scss" scoped>
.seasons-container {
  background-color:#2d2d2d;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 3px;
  margin: 0 200px;
  text-align: center;
  .season-title {
  border-radius: 10px;
    background-size: cover;
    background-position: 50% 35%;
    height: 75px;
    border: 1px solid gray;
    background-color: white;
      h3 {
        opacity: 1;
        color: white;
        font-weight: bold;
        text-shadow: 1px 1px 4px black;
        font-size: 20px;
      }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 100vh;
  overflow: hidden;
}
.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}




@media only screen and (max-width: 850px) {


.seasons-container {
  border: 1px solid gray;
  border-radius:10px;
  padding: 3px;
  margin: 0 200px;
  text-align:center;
  .season-title {
    height: 46px;
  border: 1px solid gray;
    background-color: white;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.fade-enter, .fade-leave-to {
  max-height: 0;
  opacity: 0;
}

  
}
</style>
