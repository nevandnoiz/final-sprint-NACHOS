<template>
  <section class="search-bar-container">
    <b-field>
      <b-autocomplete
        :data="data"
        placeholder="Search"
        field="title"
        :loading="isFetching"
        @typing="getAsyncData"
        @select="pushToDetails"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-left">
              <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
            </div>
            <div class="media-content">
              {{ props.option.title }}
              <br>
              <small>
                Released at {{ props.option.release_date }},
                rated
                <b>{{ props.option.vote_average }}</b>
              </small>
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
const _ = require("underscore");
export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },
  methods: {
    getAsyncData(name) {
      _.debounce(this.initSearchMovies, 800)(name);
    },
    async initSearchMovies(name) {
      if (!name.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      let movies = await this.$store.dispatch("getMoviesByKeyword", name);
      this.data = movies.results;
      this.isFetching = false;
    },
    pushToDetails(movie) {
      this.$router.push(`/movies/details/${movie.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar-container {
  grid-area: 2/1/2/1;
}
</style>
