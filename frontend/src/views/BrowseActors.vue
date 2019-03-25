<template>
  <div class="browse">
    <!-- <backdrop-cmp :topItems="topFiveItems"></backdrop-cmp> -->
    <div v-for="(actor, index) in popularItems" :key="index">
      <item-preview :item="actor"></item-preview>
      <h2>{{actor.name}}</h2>
      <h3>{{knownFor(actor)}}</h3>
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
      let actors = this.$store.getters.actorsToDisplay;
      if (!actors) {
        console.log("Loaded from api");
        this.$store.dispatch(`loadPopularActors`);
      } else console.log("Loaded from store");
    },
    knownFor(actor) {
      let str = "";
      actor.known_for.forEach(knownItem => (str += knownItem.title + ", "));
      return str;
    }
  },
  computed: {
    popularItems() {
      return this.$store.getters.actorsToDisplay;
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
  padding: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  grid-area: 2/1/2/1;
  div{
      border:0.5px solid darkslategray;
  }
}
h2 {
  font-weight: bold;
  font-size:22px;
}
h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}
</style>
