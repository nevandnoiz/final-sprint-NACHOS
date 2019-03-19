
<template>
  <div class="details">
    <h1>Nachos details</h1>
    <div class="movie-container">
      <img :src="movie.img.poster">
      <div class="movie-details">
        <h1>{{movie.details.title}}</h1>
        <p>{{movie.details.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
    //  const movieId = this.$route.params.movieId
    const movieId = 299537;
    const details = await this.$store.dispatch("getMovieDetails", movieId);
    const imgs = await this.$store.dispatch("getMovieImages", movieId);
    this.movie.img.poster = utility.imgURL(imgs.posters[0].file_path)
    this.movie.details = details;
    // this.movie.img.poster = utility.imgURL(
    //   details.belongs_to_collection.poster_path
    // );
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.movie-container {
    margin: 10% auto;
    border-radius: 5px;
    padding: 20px;
    max-width: 60%;
    background-color: lightslategray;
    display: flex;
}
.movie-container > img {
  margin-right: 20px;
}
.movie-details {
  display: flex;
  flex-direction: column;
}
.movie-details > p {
  margin-top: 20px;
}
</style>

