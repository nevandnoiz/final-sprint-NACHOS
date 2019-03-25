<template>
  <div class="tv-details-container" v-if="tvShow.details && dominantColor">
    <div class="main-youtube-container" v-if="isTrailerPlaying">
      <button class="youtube-close-btn" @click="closeTrailer">TO CLOSE</button>
      <youtube
        class="youtube-container"
        :video-id="this.tvShow.videos.results[0].key"
        :player-vars="{ autoplay: 1 }"
      ></youtube>
    </div>
    <item-container v-if="this.tvShow.details" :item="tvShow" :dominantColor="dominantColor"></item-container>
<<<<<<< HEAD
    <div class="_netflix">
  <netflix-slide-main
=======
    <div class="sub-container">
      <pannel-heading class="pannel-heading-epo" :title="'Episodes'" :dominantColor="dominantColor"></pannel-heading>
      <netflix-slide-main
>>>>>>> parent of d6a7827... css
        :style="{'background':''+dominantColor+''}"
        :seasons="tvShow.seasons"
        :tvShowId="tvShow.details.id"
        class="netflix-container"
      ></netflix-slide-main>
    </div>
    <div class="sub-container">
      <!-- <pannel-heading class="pannel-heading-epo" :title="'Episodes'" :dominantColor="dominantColor"></pannel-heading> -->
    
      <div class="content-info-container">
        <div class="Actors">
          <pannel-heading class="pannel-heading" :title="'Actors'" :dominantColor="dominantColor"></pannel-heading>
        </div>
<<<<<<< HEAD

        <div class="reviews">
          <pannel-heading class="pannel-heading" :title="'Reviews'" :dominantColor="dominantColor"></pannel-heading>
          <review-container
            v-for="(review, index) in tvShow.reviews.results"
            :key="index"
            :review="review"
            item.details.id
            item.seasons
          ></review-container>
=======
            
        <div class="reviews" 
          >
          <pannel-heading class="pannel-heading" :title="'Reviews'" :dominantColor="dominantColor"></pannel-heading>
>>>>>>> parent of d6a7827... css
        </div>
      </div>
      <!-- <nav-bar class="nav-bar"></nav-bar> -->
    </div>
<<<<<<< HEAD
    <!-- <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list> -->
        <review-form></review-form>

      <actor-card :item="tvShow.credits"></actor-card>

=======

    <!-- <review-container
    <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list>
    <review-container
      v-for="(review, index) in tvShow.reviews.results"
      :key="index"
      :review="review" item.details.id item.seasons
    ></review-container>-->
    <!-- <review-form></review-form> -->
>>>>>>> parent of d6a7827... css

    <!-- <i class="fab fa-facebook"></i> -->
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import SeasonsList from "../components/details-cmps/SeasonsList.vue";
import NetflixSlideMain from "@/components/details-cmps/NetflixSlideMain.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import AvgColorService from "@/services/AvgColorService.js";
import ActorCard from "@/components/details-cmps/ActorCard.vue";
import PannelHeading from "@/components/general-cmps/PannelHeading.vue";
import { eventBus } from "@/main.js";

export default {
  data() {
    return {
      isTrailerPlaying: false,
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
        eventBus.$on("playTrailer", () => {
      this.isTrailerPlaying = true;
      setTimeout(() => {
        // document.getElementById("youtube-player-1").style.width = "100vw";
        // document.getElementById("youtube-player-1").style.height = "720px";
      }, 2000);
    });
    this.setReviews();
<<<<<<< HEAD
    console.log(this.tvShow.reviews);
=======
>>>>>>> parent of d6a7827... css
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
    this.tvShow.videos = tvShowVideos;
    this.setDominantColor();
  },
  destroyed() {
    domcolor = null;
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    closeTrailer() {
      this.isTrailerPlaying = false
    },
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
    PannelHeading,
    ActorCard,
    ItemContainer,
    SeasonsList,
    NetflixSlideMain,
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
.content-info-container {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
  grid-template-columns: 1fr 2fr;
  height: 800px;
}
.reviews {
}

.pannel-heading-epo {
  margin-top: 1.3rem;
}
.netflix-container {
<<<<<<< HEAD
  /* padding-bottom: 1.5rem; */
=======
      padding-bottom: 1.5rem;
>>>>>>> parent of d6a7827... css
}
.tv-details-container {
  display: flex;
  flex-direction: column;
      width: 100vw;
}

._netflix{
  margin: 290px 0 0;
  display: block;
  /* width: 967px; */
}
@media only screen and (max-width: 850px) {
}
</style>