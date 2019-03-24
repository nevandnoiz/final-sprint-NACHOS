<template>
  <section>
    <div class="div">
      <button
        @click="onSelectSeason(index)"
        v-for="(seasonList, index) in this.seasons"
        :key="index"
      >{{seasonList.name}}</button>
    </div>
    <actor-card v-if="this.season" :season="this.season"></actor-card>
  </section>
</template>

<script>
import ActorCard from "@/components/details-cmps/ActorCard.vue";

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
        console.log('do we have season?', this.seasons, seasonsDeatails)
  },
  components: {
    ActorCard
  },
  data() {
    return {
      season: null,
      seasons: null,
    };
  },
  methods: {
    onSelectSeason(index) {
      this.season = this.seasons[index];
              console.log('checkingbtn', this.season)

    }
  },
  props: ["seasons", "tvShowId"]
};
</script>

<style>
</style>
