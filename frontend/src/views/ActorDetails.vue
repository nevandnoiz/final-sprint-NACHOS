<template>
  <div class="tv-details-container" v-if="tvShow.details && dominantColor">
    <item-container v-if="this.tvShow.details" :item="tvShow" :dominantColor="dominantColor"></item-container>
    <div class="sub-container">
      <!-- <netflix-slide-main
        :seasons="tvShow.seasons"
        :tvShowId="tvShow.details.id"
        class="netflix-container"
      ></netflix-slide-main> -->
      <nav-bar class="nav-bar"></nav-bar>
      <actor-card :item="tvShow.credits"></actor-card>
    </div>

    <!-- <review-container
    <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list>
    <review-container
      v-for="(review, index) in tvShow.reviews.results"
      :key="index"
      :review="review" item.details.id item.seasons
    ></review-container>-->
    <!-- <review-form></review-form> -->

    <!-- <i class="fab fa-facebook"></i> -->
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
// import SeasonsList from "../components/details-cmps/SeasonsList.vue";
// import NetflixSlideMain from "@/components/details-cmps/NetflixSlideMain.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import AvgColorService from "@/services/AvgColorService.js";
import ActorCard from "@/components/details-cmps/ActorCard.vue";

export default {
  data() {
    return {
      dominantColor: null,
      tvShow: {
        seasons: null,
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
    const tvShowId = this.$route.params.tvShowId;
    const [
      details,
      externalIds,
      tvShowCredits,
      tvShowVideos
    ] = await Promise.all([
      this.$store.dispatch("getTvShowDetails", tvShowId),
      this.$store.dispatch("getTvShowExternalIds", tvShowId),
      this.$store.dispatch("getTvShowCredits", tvShowId),
      this.$store.dispatch("getTvShowVideos", tvShowId)
    ]);
    this.tvShow.details = details;
    this.tvShow.seasons = details.seasons;
    this.tvShow.externalIds = externalIds;
    this.tvShow.credits = tvShowCredits;
    this.setDominantColor();
  },
  destroyed() {
    domcolor = null;
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    async setDominantColor() {
      this.dominantColor = await AvgColorService.domColor(
        `http://image.tmdb.org/t/p/w92${this.tvShow.details.poster_path}`
      );
    },
    setReviews() {
      this.tvShow.reviews = {
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
    }
  },
  components: {
    ActorCard,
    ItemContainer,
    // SeasonsList,
    // NetflixSlideMain,
    ReviewContainer,
    ReviewForm,
    NavBar
  },
  watch: {
    "$route.params.tvShowId": function() {
      this.getTvShowDetails();
    }
  }
};
</script>

<style scoped>
.tv-details-container {
  display: flex;
  flex-direction: column;
}
.sub-container{
      margin: 214px auto;

    display: block;
       width: 76vw;

}
@media only screen and (max-width: 850px) {
}
</style>