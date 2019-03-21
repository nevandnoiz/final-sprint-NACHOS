<template>
  <div class="browse">
    <backdrop-cmp :topFive="topFiveMovies"></backdrop-cmp>
    <div class="grid-container">
      <item-preview v-for="(movie, index) in popularMovies" :key="index" :movie="movie"></item-preview>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import BackdropCmp from "@/components/BackdropCmp.vue";
import ItemPreview from "@/components/ItemPreview.vue";

export default {
  created() {
    this.$store.dispatch("loadPopularMovies");
  },
  components: {
    BackdropCmp,
    ItemPreview
  },
  data() {
    return {};
  },
  methods: {
    posterImgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 300);
    },
  },
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    },
    topFiveMovies() {
      let topFive = this.popularMovies.slice(0, 5);
      return topFive;
    }
  }
};
</script>

<style lang="scss" scoped>
.browse {
  // display:grid;
  // grid-template: 400px 1fr/1fr;
  // padding:20px 0;
}
.grid-container{
  padding: 20px;
  display:grid;
  grid-gap:20px;
  grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
  justify-items: center;
  grid-area:2/1/2/1
}
</style>
