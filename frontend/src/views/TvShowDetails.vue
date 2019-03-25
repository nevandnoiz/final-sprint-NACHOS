<template>
  <div class="tv-details-container" v-if="tvShow.details && dominantColor">
    <item-container v-if="this.tvShow.details" :item="tvShow" :dominantColor="dominantColor"></item-container>
    <div class="sub-container">
      <!-- <pannel-heading class="pannel-heading-epo" :title="'Episodes'" :dominantColor="dominantColor"></pannel-heading> -->
      <netflix-slide-main
        :style="{'background':''+dominantColor+''}"
        :seasons="tvShow.seasons"
        :tvShowId="tvShow.details.id"
        class="netflix-container"
      ></netflix-slide-main>
      <div class="content-info-container">
        <div class="Actors">
          <pannel-heading class="pannel-heading" :title="'Actors'" :dominantColor="dominantColor"></pannel-heading>
        </div>

        <div class="reviews">
          <pannel-heading class="pannel-heading" :title="'Reviews'" :dominantColor="dominantColor"></pannel-heading>
          <review-container
            v-for="(review, index) in tvShow.reviews"
            :key="index"
            :review="review"
            item.details.id
            item.seasons
          ></review-container>
        </div>
      </div>
      <!-- <nav-bar class="nav-bar"></nav-bar> -->
      <!-- <actor-card :item="tvShow.credits"></actor-card> -->
    </div>
    <!-- <seasons-list :seasons="tvShow.seasons" :tvShowId="tvShow.details.id"></seasons-list> -->

    <review-form type="tv" :itemId="tvShow.details.id"></review-form>

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
    console.log(this.tvShow.reviews);
    const tvShowId = this.$route.params.tvShowId;
    const [
      details,
      externalIds,
      tvShowCredits,
      tvShowVideos,
      tvShowReviews
    ] = await Promise.all([
      this.$store.dispatch("getTvShowDetails", tvShowId),
      this.$store.dispatch("getTvShowExternalIds", tvShowId),
      this.$store.dispatch("getTvShowCredits", tvShowId),
      this.$store.dispatch("getTvShowVideos", tvShowId),
      this.$store.dispatch({
        type: "loadReviewsByType",
        itemType: "tv",
        itemId: tvShowId
      })
    ]);
    this.tvShow.details = details;
    this.tvShow.seasons = details.seasons;
    this.tvShow.externalIds = externalIds;
    this.tvShow.credits = tvShowCredits;
    this.tvShow.reviews = tvShowReviews;
    // this.setReviews();
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
    addReview(review) {
      console.log(this.tvShow.reviews);
      this.tvShow.reviews.push(review);
    },
    setReviews() {
      this.tvShow.reviews = [
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
      ];
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
  margin-top: 2rem;
  grid-template-columns: 1fr 2fr;
  height: 800px;
}
.reviews {
}

.pannel-heading-epo {
  margin-top: 1.3rem;
}
.netflix-container {
  /* padding-bottom: 1.5rem; */
}
.tv-details-container {
  display: flex;
  flex-direction: column;
}
.sub-container {
  margin: 290px auto;
  display: block;
  width: 967px;
}
@media only screen and (max-width: 850px) {
}
</style>