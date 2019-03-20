<template>
  <div class="browse">
    <h1>Nachos browse</h1>
    <div v-for="(movie, index) in popularMovies" :key="index">
      {{movie.title}}
      <img :src="imgURL(movie.poster_path)">
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  created() {
    this.$store.dispatch("loadPopularMovies");
  },
  components: {},
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath);
    }
  },
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    }
  }
};
</script>
