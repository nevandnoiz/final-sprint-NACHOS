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
    eventBus.$on("onSeasonClick",index=>this.onEmit(index));
    let seasonsDetails = [];
    for (let season of this.seasons) {
      let details = await this.$store.dispatch({
        type: "getSeasonDetails",
        id: this.tvShowId,
        seasonNum: season.season_number
      });
      if (details.name !== "Specials") seasonsDetails.push(details);
    }
    this._seasonDetalis = seasonsDetails;
 this.season = this._seasonDetalis[0]

console.log('do we have season?', this.seasons, seasonsDetails)
  },
  components: {
    NetflixSlideSeason
  },
  data() {
    return {
      season: null,
      _seasonDetalis: null,
    };
  },
  methods: {
    onEmit(index){
      console.log('emit',index)
        // this.season = null;
        this.season = this._seasonDetalis[index]
    
        
        console.log('season?', this.season)
      }
  },
  // computed:{

  // }
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
