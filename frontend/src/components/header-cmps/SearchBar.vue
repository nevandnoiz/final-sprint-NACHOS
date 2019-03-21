<template>
  <section>
    <div class="search-bar-container">
      <input v-model="keyword" ref="searchInput" v-on:blur="unFocused" @focus="focusChanged" @input="searchMovies" type="text" placeholder="Search...">
      <!-- <ul v-if="movies && focus"> -->
      <ul v-if="movies && focus">
        <a
          @mousedown="moveToMovieDetailsURL(movie.id)"
          class="movies-result"
          v-for="(movie, index) in movies.results"
          :key="index"
        >{{movie.original_title}}
        </a>
      </ul>
    </div>
  </section>
</template>
<script>
const _ = require("underscore");
export default {
  created() {
  },
  data() {
    return {
      keyword: null,
      movies: null,
      focus: null,
    };
  },
  methods: {
    moveToMovieDetailsURL(id) {
      window.location.href = `#/details/${id}`;
      this.keyword = ''
    },
    unFocused() {
      //TODO problem is on click on links of the search is unfocusing the input and deleting them before the click occur use other method instead of settimeout
        this.focus = false
      console.log('unfocused')
    },
    searchMovies() {
      if(!this.keyword) return
      // if(val.target.value === '') return this.movies = null
      (_.debounce(this.initSearchMovies, 800))();
    },
    async initSearchMovies() {
      var movies = await this.$store.dispatch("getMoviesByKeyword",this.keyword);
      this.movies = movies;
    },
      focusChanged (event) {
      this.focus = true
      console.log('input is focusing')
    } 
    // do something with the element.
  
  },
  watch: {
    keyword: function(){
      if(!this.keyword) this.movies = null
    }
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
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
input {
  font-size: 1.2rem;
  width: 100%;
  height: 2rem;
}
</style>
