<template>
  <div class="tv-details-container" v-if="item.details && dominantColor">
    <div class="main-youtube-container" v-if="isTrailerPlaying">
      <div class="youtube-close-btn" @click="closeTrailer"><i class="fas fa-times-circle"></i></div>
      <youtube
        v-if="isTrailerPlaying"
        crossorigin="anonymous"
        class="youtube-container"
        :video-id="this.item.videos.results[0].key"
        :player-vars="{ autoplay: 1 }"
      ></youtube>
    </div>
    <item-container v-if="this.item.details" :item="item" :itemType="itemType" :dominantColor="dominantColor">
      
    </item-container>
        <seasons-list v-if="itemType==='tv'" class="mobile-season-list" :seasons="item.seasons" :tvShowId="item.details.id"></seasons-list>

    <div class="sub-container">
      <episodes-swiper
        v-if="itemType==='tv'"
        class="netflix-container"
        :seasons="item.seasons"
        :tvShowId="item.details.id"
      ></episodes-swiper>
      <div class="content-info-container">
        <div class="Actors">
          <actor-card :item="item.credits"></actor-card>

          <pannel-heading class="pannel-heading" :title="'Actors'" :dominantColor="dominantColor"></pannel-heading>
        </div>

        <div class="reviews-section">
          <pannel-heading class="pannel-heading" :title="'Reviews'" :dominantColor="dominantColor"></pannel-heading>
          <div class="reviews-conatier">
            <new-review
              v-for="(review, index) in item.reviews"
              :reviewIdx="index"
              :key="index"
              :review="review"
            ></new-review>
            <review-form @addReview="addReview" :itemId="item.details.id"></review-form>
          </div>
          <!-- <twitter-feed :keyword="item.details.name"></twitter-feed> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeasonsList from '../components/details-cmps/SeasonsList.vue' 
import TwitterService from "@/services/TwitterService.js";
import UtilityService from "@/services/UtilityService.js";
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import EpisodesSwiper from "@/components/swiper-cmps/EpisodesSwiper.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import AvgColorService from "@/services/AvgColorService.js";
import ActorCard from "@/components/details-cmps/ActorCard.vue";
import NewReview from "@/components/details-cmps/NewReview.vue";
import PannelHeading from "@/components/general-cmps/PannelHeading.vue";
import TwitterFeed from "@/components/general-cmps/TwitterFeed.vue";
import { eventBus } from "@/main.js";
import moment from "moment";

export default {
  data() {
    return {
      itemType: null,
      isTrailerPlaying: false,
      dominantColor: null,
      item: {
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
    let type = this.$route.params.itemType;
    this.itemType = type;
    eventBus.$on("playTrailer", () => (this.isTrailerPlaying = true));
    if (type === "tv") {
      const itemId = this.$route.params.itemId;
      const [
        details,
        externalIds,
        itemVideos,
        itemCredits,
        itemReviews,
        
      ] = await Promise.all([
        this.$store.dispatch("getTvShowDetails", itemId),
        this.$store.dispatch("getTvShowExternalIds", itemId),
        this.$store.dispatch("getTvShowVideos", itemId),
        this.$store.dispatch("getTvShowCredits", itemId),
        this.$store.dispatch({type: "loadReviewsByType",itemType: "tv",itemId: itemId}),
      ]);
      console.log(details.name)
      const itemWatchLinks = await this.$store.dispatch("getTvShowWatchLinksByKeyword", details.name)
      this.item.watchLinks = itemWatchLinks.results.filter(res=>res.name == details.name)[0]
      this.item.details = details;
      this.item.seasons = details.seasons;
      this.item.externalIds = externalIds;
      this.item.videos = itemVideos;
      this.item.credits = itemCredits;
      await itemReviews.forEach(async review => {
        if (!review.date) return (review.date = await this.genRandTimestamp());
      });
      itemReviews.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
      this.item.reviews = itemReviews;
      
      
      this.setDominantColor();
    } else {
      const itemId = this.$route.params.itemId;
      const [
        details,
        externalIds,
        itemVideos,
        itemCredits,
        itemReviews
      ] = await Promise.all([
        this.$store.dispatch("getMovieDetails", itemId),
        this.$store.dispatch("getMovieExternalIds", itemId),
        this.$store.dispatch("getMovieVideos", itemId),
        this.$store.dispatch("getMovieCredits", itemId),
        this.$store.dispatch({
          type: "loadReviewsByType",
          itemType: "movies",
          itemId: itemId
        })
      ]);
      this.item.details = details;
      this.item.externalIds = externalIds;
      this.item.videos = itemVideos;
      this.item.credits = itemCredits;
      await itemReviews.forEach(async review => {
        if (!review.date) return (review.date = await this.genRandTimestamp());
      });
      itemReviews.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
      this.item.reviews = itemReviews;
      this.setDominantColor();
    }
  },
  destroyed() {
    this.$store.commit("setSelectedItem", null);
    this.$store.commit("setCurrItemReviews", null);
  },
  methods: {
    closeTrailer() {
      this.isTrailerPlaying = false;
    },
    async setDominantColor() {
      this.dominantColor = await AvgColorService.domColor(
        `http://image.tmdb.org/t/p/w92${this.item.details.poster_path}`
      );
    },
    async addReview(newReview) {
      await this.$store.dispatch({
        type: "addReview",
        newReview: JSON.parse(JSON.stringify(newReview)),
        itemType: "tv",
        itemId: this.item.details.id
      });
      // eventBus.$emit('finishAddReview')
    },
    async genRandTimestamp() {
      let relDate =
        this.itemType === "movies"
          ? this.item.details.release_date
          : this.item.details.first_air_date;
      let relDateTimestamp = moment(relDate).unix() * 1000;
      if (relDateTimestamp < 1286698210000) relDateTimestamp = 1286698210000;
      let currDateTimestamp = Date.now();
      return Math.floor(
        Math.random() * (currDateTimestamp - relDateTimestamp + 1) +
          relDateTimestamp
      );
    }
  },
  components: {
    EpisodesSwiper,
    TwitterFeed,
    NewReview,
    PannelHeading,
    ActorCard,
    ItemContainer,
    ReviewContainer,
    ReviewForm,
    NavBar
  ,  SeasonsList},
  watch: {
    "$route.params.itemId": function() {
      this.$router.go();
    }
  }
};
</script>

<style scoped>
.mobile-season-list {
  display: none
}
.Actors {
  /* margin-left: 1rem; */
  /* box-shadow: 0px 0px 12px #000000; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 1fr;
}
.content-info-container {
  /* display: grid; */
  width: 100vw;
  /* gap: 2rem; */
  
  margin-top: 2rem;
  /* grid-template-columns: 1fr 2fr; */
  height: 800px;
      /* display: flex; */
          display: block;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
     display: block;
    width: 100vw;
    z-index: 3;
}
.tweet {
  position: absolute;
  min-width: 220px;
  z-index: 4234234234;
  top: 1081px;
  left: 457px;
}

@media only screen and (max-width: 1000px) {
  .sub-container{
    width: 95vw;
  }
  .content-info-container{
    width: 100vw;
  }
}

@media only screen and (max-width: 750px) { 
.netflix-container {
  display: none;
}
.sub-container {
  display: flex;
      /* margin-top: 600px; */
width: 100vw;
}
.content-info-container{
          /* display: flex; */
    flex-direction: column;
    /* gap: none; */
    width: 100vw;
    margin: 0 auto;
    margin-top: 2rem;
    /* grid-template-columns: 1fr 2fr; */
    height: 800px;
}
.mobile-season-list{
  width: 100vw;
  margin: 0 auto;
  display: block
}

}
</style>