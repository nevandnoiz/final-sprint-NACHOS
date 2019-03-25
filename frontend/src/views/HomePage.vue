<template>
  <div class="home-container">
    <backdrop-cmp v-if="!user" :topItems="headerItems"></backdrop-cmp>
    <watch-next v-if="user" :watchNextList="watchNextList"></watch-next>
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
  created() {
    this.$store.dispatch(`loadPopularMovies`);
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
    popularItems() {
      return this.$store.getters.moviesToDisplay;
    },
    headerItems() {
      let topFiveItems = this.popularItems.slice(0, 5);
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
  grid-template: 500px 1fr/1fr;
}
</style>
