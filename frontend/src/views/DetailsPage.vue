<template>
  <section v-if="movie.details && dominantColor">
    <movie-container v-if="this.movie.details" :movie="movie" :dominantColor="dominantColor"></movie-container>
    <nav-bar></nav-bar>
    <review-container
      v-for="(review, index) in movie.reviews.results"
      :key="index"
      :review="review"
    ></review-container>
    <review-form></review-form>

    <!-- <i class="fab fa-facebook"></i> -->
  </section>
</template>

<script>
import MovieContainer from "../components/details-cmps/MovieContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
const sightengine = require("sightengine")("1163479865","rQZS3hEBvZSJ9Nqbc5qu");

export default {
  data() {
    return {
      dominantColor: null,
      movie: {
        details: null,
        videos: null,
        credits: null,
        reviews: null,
        externalIds: null
      }
    };
  },
 
  async created() {   
    this.getMovieDetails();
    
    this.movie.reviews = {
      id: 297761,
      page: 1,
      results: [
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        }
      ]
    };
  },
  destroyed() {
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    async getDomColor(){
        var domColor = await sightengine.check(["properties"]).set_url(`http://image.tmdb.org/t/p/w92${this.movie.details.poster_path}`)
        console.log(domColor)
        var hex = domColor.colors.dominant.hex
        this.dominantColor = hex
    },
    async getMovieDetails() {
      let details = this.$store.getters.selectedItem;
      const movieId = this.$route.params.movieId;
      if (details) console.log("movie details IS on storage doesnt get from API");
      if (!details) {
        console.log("movie details not in sotrage GETTING FROM API");
        details = await this.$store.dispatch("getMovieDetails", movieId);
      }
      const externalIds = await this.$store.dispatch("getMovieExternalIds",movieId);
      const movieCredits = await this.$store.dispatch("getMovieCredits",movieId);
      const movieVideos = await this.$store.dispatch("getMovieVideos", movieId)
      console.log('movie videos are:', movieVideos)
      this.movie.videos = movieVideos
      this.movie.credits = movieCredits;
      this.movie.externalIds = externalIds;
      this.movie.details = details;
      console.log(this.movie.credits);
      this.getDomColor()
    }
  },
  components: {
    MovieContainer,
    ReviewContainer,
    ReviewForm,
    NavBar
  },
  watch: {
    "$route.params.movieId": function() {
      console.log("route movie id");
      this.getMovieDetails();
    },

  }
};
</script>

<style scoped>
</style>