<template>
  <div class="browse">
    <backdrop-cmp :topItems="topFiveItems"></backdrop-cmp>
    <!-- <div class="categories">
      <a
        v-for="(category,index) in categories"
        :key="index"
        @click="changeCategory(category)"
      >{{category}}</a>
    </div>-->
    <div class="grid-container">
      <item-preview
        v-for="(tvShow, index) in popularItems"
        :key="index"
        :item="tvShow"
        :showBtns="true"
      />
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import BackdropCmp from "@/components/BackdropCmp.vue";
import ItemPreview from "@/components/ItemPreview.vue";

export default {
  created() {
    this.$store.dispatch(`getTrendingShows`);
  },
  components: {
    BackdropCmp,
    ItemPreview
  },
  data() {
    return {
      // categories: ["Trending", "Top Rated", "Popular"],
      currCategory: "Trending",
      sectionKey: null,
      SectionKey: null
    };
  },
  methods: {
    posterImgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 300);
    },
    changeCategory(category) {
      if (category === "Trending") this.$store.dispatch(`getTrendingShows`);
      else if (category === "Top Rated")
        this.$store.dispatch(`getTopRatedShows`);
      else if (category === "Popular") this.$store.dispatch(`getPopularShows`);
      this.currCategory = category;
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
  // background: #000000bf;
  display: grid;
  grid-template: 500px 0 1fr/1fr;
}
.grid-container {
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  grid-area: 3/1/3/1;
}
.categories {
  grid-area: 2/1/2/1;
  display: flex;
  justify-content: space-evenly;
}
</style>
