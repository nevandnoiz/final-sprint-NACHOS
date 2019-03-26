<template>
  <section class="slider-main-container">

    <carousel :paginationEnabled="false" :navigationEnabled="true" :per-page="5">
      <slide
        class="slider-card"
        :style="{'background-image':'url(\''+imgURL(eposide.still_path)+'\')'}"
        v-for="(eposide, index) in season.episodes"
        :key="index"
      ></slide>
    </carousel>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
import UtilityService from "@/services/UtilityService.js";

export default {
  async created() {
     eventBus.$on("onSeasonClick", index => this.onEmit(index));
    this.seasonsDetails = await this.$store.dispatch({
      type: "getSeasonDetails",
      id: this.tvShowId,
      seasons: this.seasons
    });
    console.log(this.seasonsDetails);
    this.season = this.seasonsDetails[0].data;
    console.log(this.season, " this season");
    // console.log("swiper,", Swiper);
  },
  components: {},
  data() {
    return {
      season: null,
      seasonsDetails: null
    };
  },
  methods: {
        onEmit(index) {
      // this.season = null;
      this.season = this.seasonsDetails[index].data;
    },
    imgURL(stillPath) {
      return UtilityService.imgURL(stillPath, 780);
    },
 
  },
  props: ["seasons", "tvShowId"]
};
</script>

<style scoped>
.slider-main-container {
  z-index: 3423423423;
}
.swiper-container {
  width: 600px;
  height: 300px;
}
.slider-card {
  background-color: black;
  background-size: 287px;
  height: 161px;
  border: 1px solid;
  background-repeat: no-repeat;
}

.cards-container-of-season-netflix {
  position: relative;
}
</style>
