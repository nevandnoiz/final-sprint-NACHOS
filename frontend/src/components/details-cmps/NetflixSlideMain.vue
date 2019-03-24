<template>
  <section>
    <div class="div btn-container">
      <button
        @click="onSelectSeason(index)"
        v-for="(seasonList, index) in this.seasons"
        :key="index"
      >{{seasonList.name}}</button>
    </div>
    <netflix-slide-season v-if="this.season" :season="this.season"></netflix-slide-season>
  </section>
</template>

<script>
import NetflixSlideSeason from "@/components/details-cmps/NetflixSlideSeason.vue";

export default {
  async created() {
    let seasonsDeatails = [];
    for (let season of this.seasons) {
      let details = await this.$store.dispatch({
        type: "getSeasonDetails",
        id: this.tvShowId,
        seasonNum: season.season_number
      });
      if (details.name !== "Specials") seasonsDeatails.push(details);
    }

    this.seasons = seasonsDeatails;
    this.season = this.seasons[0]
        console.log('do we have season?', this.seasons, seasonsDeatails)
  },
  components: {
    NetflixSlideSeason
  },
  data() {
    return {
      season: null,
      seasons: null,
    };
  },
  methods: {
    onSelectSeason(index) {
      this.season = null;
      setTimeout(() => {
        this.season = this.seasons[index];
      }, 0);
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
