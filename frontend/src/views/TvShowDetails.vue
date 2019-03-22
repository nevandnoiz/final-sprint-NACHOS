<template>
  <section v-if="tvShow.details && dominantColor">
    <item-container v-if="this.tvShow.details" :item="tvShow" :dominantColor="dominantColor"></item-container>
    <nav-bar></nav-bar>
    <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list>
    <review-container
      v-for="(review, index) in tvShow.reviews.results"
      :key="index"
      :review="review"
    ></review-container>
    <review-form></review-form>
  </section>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import SeasonsList from "../components/details-cmps/SeasonsList.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
const sightengine = require("sightengine")(
  "1163479865",
  "rQZS3hEBvZSJ9Nqbc5qu"
);

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
    const tvShowId = this.$route.params.tvShowId;
    let details = await this.$store.dispatch("getTvShowDetails", tvShowId);
    this.tvShow.details = details;
    this.tvShow.seasons = details.seasons;
    const externalIds = await this.$store.dispatch(
      "getTvShowExternalIds",
      tvShowId
    );
    this.tvShow.externalIds = externalIds;
    const tvShowCredits = await this.$store.dispatch(
      "getTvShowCredits",
      tvShowId
    );
    this.tvShow.credits = tvShowCredits;
    const tvShowVideos = await this.$store.dispatch(
      "getTvShowVideos",
      tvShowId
    );
    this.setReviews();
    this.getDominantColor();
  },
  destroyed() {
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    async getDominantColor(url) {
      var domColor = await sightengine
        .check(["properties"])
        .set_url(
          `http://image.tmdb.org/t/p/w92${this.tvShow.details.poster_path}`
        );
      this.dominantColor = "#d39f4c";
      // var hex = domColor.colors.dominant.hex + "";
      // // Check if color background is light and convert it to darker
      // if (UtilityService.lightOrDark(hex) === "light")
      //   hex = `#${UtilityService.LightenDarkenColor(
      //     hex.replace(/#/gm, ""),
      //     -60
      //   )}`;
      // this.dominantColor = hex;
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
    },
    async getTvShowDetails() {
      // this.tvShow.videos = tvShowVideos;
      // const tvShowTest = await this.$store.dispatch(
      //   "getTvShowWatchLinksByKeyword",
      //   "prison break"
      // );
    }
  },
  components: {
    ItemContainer,
    SeasonsList,
    ReviewContainer,
    ReviewForm,
    NavBar
  },
  watch: {
    "$route.params.tvShowId": function() {
      console.log("route tvShow id");
      this.getTvShowDetails();
    }
  }
};
</script>

<style scoped>
</style>