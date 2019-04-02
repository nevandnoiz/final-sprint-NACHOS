<template>
  <div class="home-container">
    <watch-next v-if="user" :watchNextList="watchNextList"></watch-next>
    <backdrop-cmp v-else :topItems="headerItems"></backdrop-cmp>
    <feed :user="user"></feed>
  </div>
</template>

<script>
import WatchNext from "@/components/home-cmps/WatchNext.vue";
import feed from "@/components/home-cmps/Feed.vue";
import BackdropCmp from "@/components/BackdropCmp.vue";

export default {
  components: {
    BackdropCmp,
    WatchNext,
    feed
  },
  data() {
    return {};
  },
  async created() {
    this.$store.dispatch(`getTrendingMovies`);
  },
  computed: {
    activities() {
      return this.$store.getters.activities;
    },
    user() {
      return this.$store.getters.currUser;
    },
    trendingItems() {
      return this.$store.getters.moviesToDisplay;
    },
    headerItems() {
      let topFiveItems = this.trendingItems.slice(0, 5);
      return topFiveItems;
    },
    watchNextList() {
      if (this.user) {
        const lists = this.user.lists.find(list => list.name === "watchList");
        return lists;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.home-container {
  display: grid;
  grid-template: 400px 1fr/1fr;
}
</style>
