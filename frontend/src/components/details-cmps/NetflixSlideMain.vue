<template>
  <section>
    <netflix-slide-season v-if="season" :season="season"></netflix-slide-season>
  </section>
</template>

<script>
import NetflixSlideSeason from "@/components/details-cmps/NetflixSlideSeason.vue";
import { eventBus } from "@/main.js";
export default {
  async created() {
    eventBus.$on("onSeasonClick", index => this.onEmit(index));
    this.seasonsDetails = await this.$store.dispatch({
      type: "getSeasonDetails",
      id: this.tvShowId,
      seasons: this.seasons
    });
    this.season = this.seasonsDetails[0].data;
  },
  components: {
    NetflixSlideSeason
  },
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
    }
  },
  props: ["seasons", "tvShowId"]
};
</script>

<style scoped>
.btn-container {
  position: absolute;
  top: 0;
  order: 2;
  margin-top: 0.5rem;
  z-index: 2;
}
</style>
