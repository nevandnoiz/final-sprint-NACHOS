<template>
  <div class="home">
    <h1>Nachos home</h1>
    <div v-for="(movie, index) in popularMovies" :key="index">{{movie.title}}</div>
  </div>
</template>

<script>
export default {
  created() {
   this.$store.dispatch("loadPopularMovies");
  },
  components: {},
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    }
  }
};
</script>
