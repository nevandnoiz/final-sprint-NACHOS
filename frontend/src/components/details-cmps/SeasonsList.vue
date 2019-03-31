<template>
  <div class="seasons-container" v-if="seasonsDeatails">
    <template v-for="(season,index) in seasonsDeatails">
      <div
        class="season-title"
        @click="selectSeason(index)"
        :key="index"
        :style="{'background-image':'url(\''+imgURL(season.data.poster_path)+'\')'}"
      >
        <h3>{{season.data.name}}</h3>
      </div>
      <transition name="fade" :key="index">
        <episodes-list v-if="index===currPreviewIdx" :episodes="season.data.episodes"></episodes-list>
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
    this.seasonsDeatails = await this.$store.dispatch({
        type: "getSeasonsDetails",
        id: this.tvShowId,
        seasons: this.seasons
      });
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
.season-title:hover {
  cursor: pointer;
}
.seasons-container {
    width: 100%;
    margin: 0;
    background-color: #2d2d2d;
    text-align: center;
  .season-title {
    background-size: cover;
    background-position: 50% 35%;
    margin: 0.2rem 0;
        padding: 0.2rem;
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



</style>
