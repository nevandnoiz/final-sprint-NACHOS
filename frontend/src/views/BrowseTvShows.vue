<template>
  <div class="browse">
    <backdrop-cmp :topItems="topFiveItems"></backdrop-cmp>
    <div class="grid-container">
      <item-preview v-for="(tvShow, index) in popularItems" :key="index" :item="tvShow"></item-preview>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import BackdropCmp from "@/components/BackdropCmp.vue";
import ItemPreview from "@/components/ItemPreview.vue";

export default {
  created() {
    this.loadItems();
  },
  components: {
    BackdropCmp,
    ItemPreview
  },
  data() {
    return {
      sectionKey: null,
      SectionKey: null
    };
  },
  methods: {
    posterImgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 300);
    },
    loadItems() {
           let tvShows = this.$store.getters.tvShowsToDisplay;
      if (!tvShows) {
        console.log('Loaded from api')
        this.$store.dispatch(`loadPopularTvShows`);
      } else console.log('Loaded from store')
    }
  },
  computed: {
    popularItems() {
        return this.$store.getters.tvShowsToDisplay;
    },
    topFiveItems() {
      let topFiveItems = this.popularItems.slice(0, 5);
      return topFiveItems;
    }
  },
  watch: {
    "$route.params.section": function() {
      this.loadItems();
    }
  }
};
</script>

<style lang="scss" scoped>
.browse {
  display: grid;
  grid-template: 500px 1fr/1fr;
}
.grid-container {
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  grid-area: 2/1/2/1;
}
@media only screen and (max-width: 850px) {



  
}
</style>
