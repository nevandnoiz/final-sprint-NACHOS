<template>
  <section>
    <div class="search-bar-container">
      <input v-model="keyword" @keyup="searchMovies" type="text" placeholder="Search...">
      <ul v-if="movies">
        <a
          :href="`#/details/${movie.id}`"
          class="movies-result"
          v-for="(movie, index) in movies.results"
          :key="index"
        >{{movie.original_title}}</a>
      </ul>
    </div>
  </section>
</template>
<script>
const _ = require("underscore");
export default {
  data() {
    return {
      keyword: null,
      movies: null
    };
  },
  methods: {
    searchMovies() {
      (_.debounce(this.initSearchMovies, 800))();
    },
    async initSearchMovies() {
      var movies = await this.$store.dispatch("getMoviesByKeyword",this.keyword);
      this.movies = movies;
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul {
  border: 1px solid black;
}
.movies-result {
  display: block;
  margin: 5px;
  font-size: 1.1rem;
}
input {
  font-size: 1.2rem;
  width: 100%;
  height: 2rem;
}
</style>
