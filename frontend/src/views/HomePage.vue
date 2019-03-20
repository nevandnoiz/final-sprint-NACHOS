<template>
  <div class="home">
    <h1>Nachos home</h1>
    <search-bar></search-bar>
    <!-- <div v-for="(movie, index) in popularMovies" :key="index">{{movie.title}}</div> -->
  </div>
</template>

<script>
import SearchBar from "../components/header-cmps/SearchBar.vue";
export default {
  created() {
   this.$store.dispatch("loadPopularMovies");
  },
  components: {
    SearchBar
  },
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    }
  }
};
</script>
