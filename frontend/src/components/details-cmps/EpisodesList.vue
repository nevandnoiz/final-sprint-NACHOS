<template>
  <div class="episodes-container">
   <episode-preview v-for="(episode,index) in episodes" :key="index" :episode="episode">
  </episode-preview>
  </div>
</template>

<script>
import EpisodePreview from "@/components/details-cmps/EpisodePreview.vue";

export default {
  props: ["episodes"],
  components: {
    EpisodePreview
  },
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
