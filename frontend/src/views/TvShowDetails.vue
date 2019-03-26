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
    <div class="sub-container">

         <actors-swiper 
         class="netflix-container"
    :seasons="tvShow.seasons" 
    :tvShowId="tvShow.details.id"></actors-swiper>
      <!-- <pannel-heading class="pannel-heading-epo" :title="'Episodes'" :dominantColor="dominantColor"></pannel-heading> -->
      <!-- <netflix-slide-main
        :style="{'background':''+dominantColor+''}"
        :seasons="tvShow.seasons"
        :tvShowId="tvShow.details.id"
        class="netflix-container"
      ></netflix-slide-main> -->
      <div class="content-info-container">
        <div class="Actors">
          <actor-card :item="tvShow.credits"></actor-card>

          <pannel-heading class="pannel-heading" :title="'Actors'" :dominantColor="dominantColor"></pannel-heading>
        </div>

        <div class="reviews">
          <pannel-heading class="pannel-heading" :title="'Reviews'" :dominantColor="dominantColor"></pannel-heading>

          <twitter-feed :keyword="tvShow.details.name"></twitter-feed>

          <!-- <review-container
            v-for="(review, index) in tvShow.reviews"
            :key="index"
            :review="review"
            item.details.id
            item.seasons
          ></review-container>-->
        </div>
      </div>
      <!-- <nav-bar class="nav-bar"></nav-bar> -->
    </div>
    <!-- <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list> -->

    <new-review></new-review>
    <review-form @addReview="addReview" :itemId="tvShow.details.id"></review-form>

    <!-- <i class="fab fa-facebook"></i> -->
 
  </div>
</template>

<script>
import TwitterService from "@/services/TwitterService.js";
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import ActorsSwiper from "@/components/swiper-cmps/ActorsSwiper.vue";
import SeasonsList from "../components/details-cmps/SeasonsList.vue";
import NetflixSlideMain from "@/components/details-cmps/NetflixSlideMain.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import AvgColorService from "@/services/AvgColorService.js";
import ActorCard from "@/components/details-cmps/ActorCard.vue";
import NewReview from "@/components/details-cmps/NewReview.vue";
import PannelHeading from "@/components/general-cmps/PannelHeading.vue";
import TwitterFeed from "@/components/general-cmps/TwitterFeed.vue";
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
    eventBus.$on("playTrailer", () => (this.isTrailerPlaying = true));
    const tvShowId = this.$route.params.tvShowId;
    const [
      details,
      externalIds,
      tvShowVideos,
      tvShowCredits,
      tvShowReviews
    ] = await Promise.all([
      this.$store.dispatch("getTvShowDetails", tvShowId),
      this.$store.dispatch("getTvShowExternalIds", tvShowId),
      this.$store.dispatch("getTvShowVideos", tvShowId),
      this.$store.dispatch("getTvShowCredits", tvShowId),
      this.$store.dispatch({
        type: "loadReviewsByType",
        itemType: "tv",
        itemId: tvShowId
      })
    ]);
    this.tvShow.details = details;
    this.tvShow.seasons = details.seasons;
    this.tvShow.externalIds = externalIds;
    this.tvShow.videos = tvShowVideos;
    this.tvShow.credits = tvShowCredits;
    this.tvShow.reviews = tvShowReviews;
    this.setDominantColor();
    // console.log(this.tvShow.details.name)
  },
  destroyed() {
    domcolor = null;
    this.$store.commit("setSelectedItem", null);
    this.$store.commit("setCurrItemReviews", null);
  },
  methods: {
    closeTrailer() {
      this.isTrailerPlaying = false;
    },
    async setDominantColor() {
      this.dominantColor = await AvgColorService.domColor(
        `http://image.tmdb.org/t/p/w92${this.tvShow.details.poster_path}`
      );
    },
    addReview(newReview) {
      this.$store.dispatch({
        type: "addReview",
        newReview: newReview,
        itemType: "tv",
        itemId: this.tvShow.details.id
      });
    }
  },
  components: {
    ActorsSwiper,
    TwitterFeed,
    NewReview,
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
.Actors {
  box-shadow: 0px 0px 12px #000000;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 1fr;
}
.content-info-container {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
  grid-template-columns: 210px 2fr;
  height: 800px;
}
.reviews {
  box-shadow: 0px 0px 12px #000000;
}

.pannel-heading-epo {
  margin-top: 1.3rem;
}
.netflix-container {
  box-shadow: 0px 0px 12px #000000;
  /* padding-bottom: 1.5rem; */
}
.tv-details-container {
  display: flex;
  flex-direction: column;
}
.sub-container {
  margin: 256px auto;
  display: block;
  width: 977px;
  z-index: 1;
}
.tweet {
  position: absolute;
  min-width: 220px;
  z-index: 4234234234;
  top: 1081px;
  left: 457px;
}
</style>