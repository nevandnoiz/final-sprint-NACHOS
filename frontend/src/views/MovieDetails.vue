<template>

  <div class="tv-details-container" v-if="movie.details && dominantColor">
    <item-container v-if="this.movie.details" :item="movie" :dominantColor="dominantColor"></item-container>
    <!-- <review-container
      v-for="(review, index) in movie.reviews.results"
      :key="index"
      :review="review"
    ></review-container>-->
    <!-- <review-form></review-form> -->
<<<<<<< HEAD
    <div class="sub-container">
    </div>
          <actor-card :item="movie.credits"></actor-card>
=======
        <div class="sub-container">
    <!-- <actor-card :item="movie.credits"></actor-card> -->
        </div>
>>>>>>> parent of d6a7827... css

  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import AvgColorService from "@/services/AvgColorService.js";
import ActorCard from "@/components/details-cmps/ActorCard.vue";

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
    const [details, externalIds, movieCredits, movieVideos] = await Promise.all(
      [
        this.$store.dispatch("getMovieDetails", movieId),
        this.$store.dispatch("getMovieExternalIds", movieId),
        this.$store.dispatch("getMovieCredits", movieId),
        this.$store.dispatch("getMovieVideos", movieId)
      ]
    );
    this.movie.details = details;
    this.movie.externalIds = externalIds;
    this.movie.credits = movieCredits;
    this.movie.videos = movieVideos;
    this.setDominantColor();
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
    async setDominantColor() {
      this.dominantColor = await AvgColorService.domColor(
        `http://image.tmdb.org/t/p/w92${this.movie.details.poster_path}`
      );
    }
  },
  components: {
    ActorCard,
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

<<<<<<< HEAD
<style>
/* body,html  {
  background-color: rgb(230, 230, 230)
} */
div.ytp-chrome-top.ytp-show-watch-later-title.ytp-share-button-visible.ytp-show-share-title.ytp-show-cards-title{
  display: none !important
}
div[data-layer="1"]{
  display: none
}
.youtube-close-btn {
      z-index: 201;
    /* right: 0; */
    right: 0;
    top: 0;
    position: absolute;
}
.main-youtube-container {
    position: fixed;
    z-index: 200;
        top: 60px;
            width: 100vw;
=======
<style scoped>
>>>>>>> parent of d6a7827... css


<<<<<<< HEAD
.youtube-container > iframe {
      width: 100%;
    height: 93vh;
}
.sub-container {
  margin: 0 auto;
  display: block;
  width: 956px;
=======
.sub-container{
    margin: 290px auto;
    display: block;
    width: 956px

>>>>>>> parent of d6a7827... css
}
.tv-details-container {
  display: flex;
  flex-direction: column;
}
</style>