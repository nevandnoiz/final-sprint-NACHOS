<template>
  <div class="browse">
    <backdrop-cmp :topFive="topFiveItems"></backdrop-cmp>
    <div class="grid-container">
      <item-preview v-for="(item, index) in popularItems" :key="index" :item="item"></item-preview>
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
      let sectionRoute = this.$route.params.section;
      this.sectionKey = sectionRoute;
      this.SectionKey =
        sectionRoute.charAt(0).toUpperCase() + sectionRoute.slice(1);
      console.log(this.sectionKey, this.SectionKey);
      let items = "";
      if (sectionRoute === "movies")
        items = this.$store.getters.moviesToDisplay;
      else if (sectionRoute === "tv")
        items = this.$store.getters.showsToDisplay;
      if (!items) {
        this.$store.dispatch(`loadPopular${this.SectionKey}`);
      }
    }
  },
  computed: {
    popularItems() {
      if (this.sectionKey === "movies")
        return this.$store.getters.moviesToDisplay;
      else if (this.sectionKey === "tv")
        return this.$store.getters.showsToDisplay;
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
  padding: 20px 0;
}
.grid-container {
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  grid-area: 2/1/2/1;
}
</style>
