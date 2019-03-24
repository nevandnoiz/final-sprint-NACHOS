<template>
  <section v-if="movie.details && dominantColor">
    <item-container v-if="this.movie.details" :item="movie" :dominantColor="dominantColor"></item-container>
    <!-- <review-container
      v-for="(review, index) in movie.reviews.results"
      :key="index"
      :review="review"
    ></review-container> -->
    <!-- <review-form></review-form> -->
  </section>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";

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
    this.setReviews();
    const movieId = this.$route.params.movieId;
    let details = await this.$store.dispatch("getMovieDetails", movieId);
    this.movie.details = details;
    const externalIds = await this.$store.dispatch(
      "getMovieExternalIds",
      movieId
    );
    this.movie.externalIds = externalIds;
    const movieCredits = await this.$store.dispatch("getMovieCredits", movieId);
    this.movie.credits = movieCredits;
    const movieVideos = await this.$store.dispatch("getMovieVideos", movieId);
    this.movie.videos = movieVideos;
    this.dominantColor="white"
  },
  destroyed() {
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    setReviews() {
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
  },
  components: {
    ItemContainer,
    ReviewContainer,
    ReviewForm,
    NavBar
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