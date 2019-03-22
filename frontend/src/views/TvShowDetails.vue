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

    <!-- <i class="fab fa-facebook"></i> -->
  </section>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import SeasonsList from "../components/details-cmps/SeasonsList.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import clr from '@/services/average-color.js'


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
    
    console.log(UtilityService);
    this.getTvShowDetails();
console.log('tvshowdetalis',this.tvShow.details)
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
  destroyed() {
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
          setDominantColor() {
             // Check if color background is light and convert it to darker
            // if (UtilityService.lightOrDark(domcolor) === "light")domcolor = `#${UtilityService.LightenDarkenColor(domcolor.replace(/#/gm, ""),-60)}`;
           this.dominantColor = domcolor;
                              },
    async getDominantColor(url) {
                console.log('go!!')
     clr.domColor(`http://image.tmdb.org/t/p/w92${this.tvShow.details.poster_path}`)
      // var hex = domColor.colors.dominant.hex + "";
      // // Check if color background is light and convert it to darker
      // if (UtilityService.lightOrDark(hex) === "light")
      //   hex = `#${UtilityService.LightenDarkenColor(
      //     hex.replace(/#/gm, ""),
      //     -60
      //   )}`;
      // this.dominantColor = hex;
    },
    async getTvShowDetails() {
      const tvShowId = this.$route.params.tvShowId;
      let details = await this.$store.dispatch("getTvShowDetails", tvShowId);
      // if (details) console.log("tvShow details IS on storage doesnt get from API");
      // if (!details) {
      //   console.log("tvShow details not in sotrage GETTING FROM API");
      //   details = await this.$store.dispatch("getTvShowDetails", tvShowId);
      // }
      const externalIds = await this.$store.dispatch(
        "getTvShowExternalIds",
        tvShowId
      );
      const tvShowCredits = await this.$store.dispatch(
        "getTvShowCredits",
        tvShowId
      );
      const tvShowVideos = await this.$store.dispatch(
        "getTvShowVideos",
        tvShowId
      );
      const tvShowTest = await this.$store.dispatch(
        "getTvShowWatchLinksByKeyword",
        "prison break"
      );
      console.log(tvShowTest);
      console.log("tvShow videos are:", tvShowVideos);
      this.tvShow.seasons = details.seasons;
      this.tvShow.videos = tvShowVideos;
      this.tvShow.credits = tvShowCredits;
      this.tvShow.externalIds = externalIds;
      this.tvShow.details = details;
      console.log('this tv show',this.tvShow)
      console.log(this.tvShow.credits);
      this.getDominantColor();
         setTimeout(() => {
        this.setDominantColor()
      }, 500);
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