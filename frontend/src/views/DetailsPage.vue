<template>
  <section>
    <movie-container v-if="this.movie.details" :movie="movie"></movie-container>
  </section>
</template>

<script>
import MovieContainer from "../components/details-cmps/MovieContainer.vue";

export default {
  data() {
    return {
      movie: {
        details: null,
        credits: null,
        externalIds: null
      }
    };
  },
  async created() {
    this.getMovieDetails();
  },
  destroyed(){
    this.$store.commit('setSelectedMovie', null)
  },
  methods: {
    async getMovieDetails() {
      let details = this.$store.getters.selectedMovie;
        const movieId = this.$route.params.movieId;
      if (!details) {
        details = await this.$store.dispatch("getMovieDetails", movieId);
      }
      const externalIds = await this.$store.dispatch(
        "getMovieExternalIds",
        movieId
      );
      const movieCredits = await this.$store.dispatch(
        "getMovieCredits",
        movieId
      );
      this.movie.credits = movieCredits;
      this.movie.externalIds = externalIds;
      this.movie.details = details;
      console.log(this.movie.credits);
    }
  },
  components: {
    MovieContainer
  },
  watch: {
    "$route.params.movieId": function() {
      this.getMovieDetails();
    }
  }
};
</script>

<style scoped>
</style>