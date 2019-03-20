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
        img: {
          poster: null
        },
        externalIds: null,
      }
    };
  },
  async created() {
    this.testInit();
    //  const movieId = this.$route.params.movieId
  },
  methods: {
    async testInit() {
      const movieId = 299537;
      const details = await this.$store.dispatch("getMovieDetails", movieId);
      const imgs = await this.$store.dispatch("getMovieImages", movieId);
      const externalIds = await this.$store.dispatch("getMovieExternalIds", movieId);
      // TO DO - TRY TO GET IMGS URLS FROM THE DETAILS INSTEAD OF REQUESTING ANOTHER API
      this.movie.img.poster = utility.imgURL(imgs.posters[0].file_path);
      this.movie.externalIds = externalIds
      this.movie.details = details;
      console.log(externalIds)
      console.log(details);
      console.log(imgs);
    }
  },
  components: {
    movieContainer
  }
};
</script>

<style scoped>
</style>