<template>
  <section class="feed">
    <select-defualt v-if="!articles" @generateFeed="generateFeed"/>
  </section>
</template>


<script>
import selectDefualt from "@/components/home-cmps/selectDefualt";
import FeeSdervice from "@/services/FeedService";
export default {
  props: {
    activities: Array,
  },
  components: { selectDefualt },
  data(){
      return {
          articles: null
      }
  },
  methods: {
    generateFeed(items) {
      this.articles = FeeSdervice.getNewsByArr(items);
    }
  }
};
</script>

<style lang="scss" scoped>
.feed {
  height: 400px;
  pre {
    text-align: center;
  }
}
</style>
