<template>
  <section>
    <div class="search-bar-container">
      <div class="input-container">
        <i class="fas fa-search"></i>
        <input
          v-model="keyword"
          ref="searchInput"
          v-on:blur="unFocused"
          @focus="focusChanged"
          @input="searchMovies"
          type="text"
          placeholder="Search..."
        >
      </div>

      <!-- <ul v-if="movies && focus"> -->
      <ul v-if="movies && focus">
        <a
          @mousedown="moveToMovieDetailsURL(movie.id)"
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
  created() {},
  data() {
    return {
      keyword: null,
      movies: null,
      focus: null
    };
  },
  methods: {
    moveToMovieDetailsURL(id) {
      window.location.href = `#/details/${id}`;
      this.keyword = "";
    },
    unFocused() {
      //TODO problem is on click on links of the search is unfocusing the input and deleting them before the click occur use other method instead of settimeout
      this.focus = false;
    },
    searchMovies() {
      if (!this.keyword) return;
      // if(val.target.value === '') return this.movies = null
      _.debounce(this.initSearchMovies, 800)();
    },
    async initSearchMovies() {
      var movies = await this.$store.dispatch(
        "getMoviesByKeyword",
        this.keyword
      );
      this.movies = movies;
    },
    focusChanged(event) {
      this.focus = true;
    }
    // do something with the element.
  },
  watch: {
    keyword: function() {
      if (!this.keyword) this.movies = null;
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
i {
  color: rgba(0, 0, 0, 0.5);
  width: auto;
}
a {
  cursor: pointer;
}
ul {
  border: 1px solid black;
}
.movies-result {
  display: block;
  margin: 5px;
  font-size: 1.1rem;
}
.search-bar-container {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  background-color: white;
}
.input-container {
    width: 60%;
}
input {
  outline: none;
  z-index: 20;
  font-size: 1rem;
  width: 80%;
  border: none;
  padding: 1.5rem;
  height: 2rem;
}
</style>

