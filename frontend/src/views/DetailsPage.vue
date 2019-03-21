<template>
  <section>
    <movie-container v-if="this.movie.details" :movie="movie"></movie-container>
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
export default {
  data() {
    return {
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
    console.log(this.movie)
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
    this.$store.commit("setSelectedMovie", null);
  },
  methods: {
    async getMovieDetails() {
      let details = this.$store.getters.selectedMovie;
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
    }
  }
};
</script>

<style scoped>

</style>