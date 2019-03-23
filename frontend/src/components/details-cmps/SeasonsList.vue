<template>
  <div class="seasons-container" v-if="seasonsDeatails">
    <template v-for="(season,index) in seasonsDeatails">
      <div class="season-title" @click="selectSeason(index)" :key="index">
        <h3>{{season.name}}</h3>
      </div>
      <transition name="fade" :key="index">
        <episodes-preview v-if="index===currPreviewIdx" :episodes="season.episodes"></episodes-preview>
      </transition>
    </template>
  </div>
</template>

<script>
import EpisodesPreview from "@/components/details-cmps/EpisodesPreview.vue";

export default {
  props: ["seasons", "tvShowId"],
  components: {
    EpisodesPreview
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
      seasonsDeatails.push(details);
    }
    this.seasonsDeatails = seasonsDeatails;
  },
  methods: {
    selectSeason(idx) {
      if (this.currPreviewIdx === idx) return (this.currPreviewIdx = null);
      this.currPreviewIdx = idx;
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
