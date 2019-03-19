<template>
<movie-container v-if="this.movie.details" :movie="movie"></movie-container>
</template>

<script>
import movieContainer from './components/details-cmps/movie-container.vue'
const utility = require("../services/UtilityService.js");
export default {
  data() {
    return {
      movie: {
        details: null,
        img: {
          poster: null
        }
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
      this.movie.img.poster = utility.imgURL(imgs.posters[0].file_path);
      this.movie.details = details;
      console.log(details);
    }
  },
  components: {
  movieContainer
}
};

</script>

<style scoped>

</style>