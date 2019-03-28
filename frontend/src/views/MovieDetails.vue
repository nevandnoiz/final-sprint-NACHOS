<template>
  <div class="tv-details-container" v-show="movie.details && dominantColor">
    <div class="main-youtube-container" v-if="isTrailerPlaying">
      <button class="youtube-close-btn" @click="closeTrailer">TO CLOSE</button>
      <youtube
        class="youtube-container"
        :video-id="this.movie.videos.results[0].key"
        :player-vars="{ autoplay: 1 }"
      ></youtube>
    </div>

    <item-container v-if="this.movie.details" :item="movie" :dominantColor="dominantColor"></item-container>
    <div class="sub-container">
            <div class="content-info-container">
                      <div class="reviews">
    <review-container
      v-for="(review, index) in movie.reviews.results"
      :key="index"
      :review="review"
    ></review-container>
    <review-form></review-form>
     </div>
      <!-- <actor-card :item="movie.credits"></actor-card> -->
    </div>
    </div>
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
import { eventBus } from "@/main.js";
export default {
  data() {
    return {
      isTrailerPlaying: false,
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
    eventBus.$on("playTrailer", () => this.isTrailerPlaying = true)
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
    closeTrailer() {
      this.isTrailerPlaying = false;
    },
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

<style>
/* lol */
/* html, body,div {
   cursor: url(./Untitled-23.gif), auto;
} */


div *::-webkit-scrollbar{
  width: 10px;
  height: 1px;
}
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
}
::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}
html, body {
  background: #f5f5f5
}
div.ytp-chrome-top.ytp-show-watch-later-title.ytp-share-button-visible.ytp-show-share-title.ytp-show-cards-title{
  display: none !important
}
div[data-layer="1"]{
  display: none
}

.main-youtube-container {
    position: fixed;
    z-index: 200;
        top: 60px;
            width: 100vw;

    background-color: black;
}
.youtube-container {
    height: 100%;
  position: fixed;
  width: 100%;
  z-index: 200;
}
.content-info-container {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
    grid-template-columns: 1fr 2fr;
    height: 800px;
}
.youtube-container > iframe {
      width: 100%;
    height: 93vh;
}
.sub-container {
    margin: 226px auto;

    display: block;
       width: 76vw;
    z-index: 3;
}
.tv-details-container {
  display: flex;
  flex-direction: column;
}
</style>