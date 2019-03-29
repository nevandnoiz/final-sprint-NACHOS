<template>
  <section v-if="season" class="slider-main-container">
    <carousel :paginationEnabled="false" :navigationEnabled="true" :per-page="5" :initialSlide="0">
      <slide
        class="slider-card"
        :style="{'background-image':'url(\''+imgURL(eposide.still_path)+'\')'}"
        v-for="(eposide, index) in season.episodes"
        :key="index"
      >
        <!-- <div class="color-fill" :style="{'background':''+dominantColor+'66'}"></div> -->
        <check-episode :key="key" v-if="currUser" :episode="eposide"></check-episode>
        <h1>{{eposide.episode_number}}</h1>
        <p>{{eposide.name}}</p>
      </slide>
    </carousel>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
import UtilityService from "@/services/UtilityService.js";
import CheckEpisode from "@/components/swiper-cmps/CheckEpisode.vue";

export default {
  async created() {
    eventBus.$on("onSeasonClick", index => this.onEmit(index));
    this.seasonsDetails = await this.$store.dispatch({
      type: "getSeasonsDetails",
      id: this.tvShowId,
      seasons: this.seasons
    });
    let isSeasonCheckedArr = this.isSeasonWatched();
    eventBus.$emit('isSeasonChecked',isSeasonCheckedArr)
    this.onEmit(0);
  },
  components: {
    CheckEpisode
  },
  data() {
    return {
      key: 1,
      fillColor: true,
      season: null,
      seasonsDetails: null,
      isChecked: false,
      checkedEpisodes: null
    };
  },
  methods: {
    onEmit(index) {
      this.key += 1;
      this.season = this.seasonsDetails[index].data;
    },
    imgURL(stillPath) {
      return UtilityService.imgURL(stillPath, 780);
    },
    isSeasonWatched() {
      return this.seasonsDetails.map(season => {
        let episodesCheck = season.data.episodes.map(episode => {
          if (this.isEpisodeWatched(episode)) return true;
          else return false;
        });
        if (episodesCheck.includes(false)) return false;
        else return true;
      });
    },
    isEpisodeWatched(episode) {
      if (this.$store.getters.currUser) {
        let watched = this.$store.getters.currUserWatchedEpisodes;
        if (!watched) return false;
        let show = watched.find(show => show.id === episode.show_id);
        if (!show) return false;
        let watchedEpisode = show.episodes.some(watchedEpisode => {
          return watchedEpisode.epId == episode.id;
        });
        return watchedEpisode;
      }
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    }
  },
  props: ["seasons", "tvShowId", "dominantColor"]
};
</script>

<style scoped>
.color-fill {
  z-index: 2434;
  height: 100%;
  position: absolute;
  width: 100%;
}
.color-fill:hover {
  background-image: none;
  background-color: none !important;
}

h1 {
  z-index: 434134;
  color: white;
  margin: 0.1rem 0.5rem;
  align-self: flex-start;
  order: -1;
  font-size: 1.8rem;
}

p {
  z-index: 434134;
  color: white;
  align-self: end;
  margin: 0.2rem;
}

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
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  /* padding: 0 3px; */
  /* border: 1px solid; */
  border-left: 2px solid;
  border-right: 2px solid;
  background-repeat: no-repeat;
}

.cards-container-of-season-netflix {
  position: relative;
}
</style>
