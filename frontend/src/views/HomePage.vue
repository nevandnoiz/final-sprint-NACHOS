<template>
  <div class="home">
    <watch-next :watchNextList="watchNextList"></watch-next>
    <!-- <feed :activities="activities"></feed> -->
    <pre>
      <!-- <a class="twitter-timeline" href="https://twitter.com/spiderman?ref_src=twsrc%5Etfw">Tweet</a> -->
      <!-- {{activities}} -->
      </pre>
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
      // user: null
    };
  },
  created() {
    // this.$store.dispatch("loadPopularMovies");
    this.$store.dispatch("loadActivities");
    this.$store.dispatch("loadUser");
  },
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    },
    activities() {
      return this.$store.getters.activities;
    },
    user() {
      return this.$store.getters.currUser;
    },
    watchNextList() {
      const currUser = this.$store.getters.currUser;
      if (currUser) {
        const lists = currUser.lists.find(list => list.name === "watchList");
        return lists
        
      }
    }
  }
};
</script>
