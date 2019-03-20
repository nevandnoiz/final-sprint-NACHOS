<template>
  <div class="home">
    <pre>
      <!-- {{activities}} -->
      </pre>
    <watch-next></watch-next>
  </div>
</template>

<script>
  import WatchNext from '@/components/home-cmps/WatchNext.vue';
  export default {
  data() {
    return {
      user: null,
      // activities: null,
    };
  },
  created() {
    this.$store.dispatch("loadPopularMovies");
    this.$store.dispatch("loadActivities");
  },
  components: {WatchNext},
  computed: {
    popularMovies() {
      return this.$store.getters.moviesToDisplay;
    },
    activities() {
      return this.$store.getter.activities;
    }
  }
};
</script>
