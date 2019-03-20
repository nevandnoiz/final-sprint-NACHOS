<template>
  <div class="browse">
    <h1>Nachos browse</h1>
    <backdrop-cmp :topFive='topFiveMovies'></backdrop-cmp>
    <div v-for="(movie, index) in popularMovies" :key="index">
      {{movie.title}}
      <img :src="posterImgURL(movie.poster_path)">
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import BackdropCmp from "@/components/BackdropCmp.vue";

export default {
  created() {
    this.$store.dispatch("loadPopularMovies");
  },
  components: {
    BackdropCmp
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
</style>
