<template>
  <div class="home">
    <watch-next :watchNext="watchNext"></watch-next>
    <feed :activities="activities"></feed>
  </div>
</template>

<script>
import WatchNext from "@/components/home-cmps/WatchNext.vue";
import feed from "@/components/home-cmps/Feed.vue";

export default {
   components: {
    WatchNext,
    feed
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    this.$store.dispatch("loadPopularMovies");
    this.$store.dispatch("loadActivities");
  },
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    },
    activities() {
      return this.$store.getters.activities;
    }
  }
};
</script>
