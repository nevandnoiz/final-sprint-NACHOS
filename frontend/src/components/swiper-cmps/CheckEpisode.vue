<template>
  <div class="check-container" @click="showEpDetails(episode)">
    <i class="fas fa-check" :class="{'checked': isChecked}" @click="toggleMarkWatched()"></i>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  created() {
    eventBus.$on("watchedSeason", seasonNum => {
      if (this.episode.season_number === seasonNum)
        return this.markWatched();
    });
    eventBus.$on("unwatchedSeason", seasonNum => {
      if (this.episode.season_number === seasonNum)
        return this.unmarkWatched();
    });
    this.init();
  },
  components: {},
  data() {
    return {
      isChecked: false
    };
  },
  methods: {
    toggleMarkWatched() {
      if (!this.isChecked) this.markWatched();
      else this.unmarkWatched();
    },
    markWatched() {
      this.$store.dispatch({
        type: "markWatched",
        showId: this.episode.show_id,
        epId: this.episode.id
      });
      this.isChecked = true;
    },
    unmarkWatched() {
       this.$store.dispatch({
            type: "unmarkWatched",
            showId: this.episode.show_id,
            epId: this.episode.id
          });
                showEpDetails(ep){
      // console.log()
      console.log('this is the eposide that clicked:',ep) 
      
    },
      this.isChecked = false;
    },
    init() {
      let isWatched = this.isWatched();
      if (isWatched) {
        this.isChecked = true;
      }
    },
    isWatched() {
      if (this.$store.getters.currUser) {
        let watched = this.$store.getters.currUserWatchedEpisodes;
        if (!watched) return;
        let show = watched.find(show => show.id === this.episode.show_id);
        if (!show) return;
        let episode = show.episodes.some(episode => {
          return episode.epId == this.episode.id;
        });
        return episode;
      }
    }
  },
  computed: {},
  props: ["episode"]
};
</script>

<style scoped>
i {
  font-size: 42px;
  margin: 9px 9px 9px 0;
  background-color: white;
  opacity: 0.5;
  color: darkslategray;
  padding: 8px;
  /* height: 57px; */
  border-radius: 50%;
  flex-grow: 0;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
i:hover {
  cursor: pointer;
  opacity: 0.75;
}
.check-container {
  position: absolute;
  /* margin: 50%; */
  top: 0;
  /* left: 0; */
  /* right: 0; */
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  /* flex-grow: unset; */
  bottom: 0;
}
.checked {
  background-color: rgb(104, 255, 104);
}
</style>
