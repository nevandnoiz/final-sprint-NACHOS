<template>
  <section class="feedContent">
    <component v-for="(item, idx) in feedItems" :key="idx" :is="item.type" :item="item"/>
  </section>
</template>

<script>
import FeedArticle from "@/components/home-cmps/FeedArticle";
import activity from "@/components/home-cmps/FeedActivity";
export default {
  components: {
    FeedArticle,
    activity
  },
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    activities: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    feedItems: function() {
      if (!this.activities) return this.articles.flat();
      if (!this.articles) return this.activities;
      else return this.activities.concat(this.articles.flat());
    }
  }
};
</script>

<style lang="scss" scoped>
.feedContent {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
