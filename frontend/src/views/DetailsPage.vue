<template>
  <section>
    <movie-container v-if="this.movie.details" :movie="movie"></movie-container>
    <!-- <i class="fab fa-facebook"></i> -->
  </section>
</template>

<script>
import movieContainer from "./components/details-cmps/movie-container.vue";
const utility = require("../services/UtilityService.js");
export default {
  data() {
    return {
      movie: {
        details: null,
        externalIds: null,
      }
    };
  },
  async created() {
    this.getMovieDetails();
  },
  methods: {
    async getMovieDetails() {
      const movieId = this.$route.params.movieId
      const details = await this.$store.dispatch("getMovieDetails", movieId);
      const externalIds = await this.$store.dispatch("getMovieExternalIds", movieId);
      this.movie.externalIds = externalIds
      this.movie.details = details;
    }
  },
  components: {
    movieContainer
  }
};
</script>

<style scoped>
</style>