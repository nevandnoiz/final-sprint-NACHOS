<template>
  <section class="feedContent">
    <feed-article v-for="(item, idx) in feedItems" :key="idx" :article="item"/>
    <feed-activity :activities="activities" v-if="activities"/>
    <!-- <component v-for="(item, idx) in feedItems" :key="idx" :is="item.type"/> -->
  </section>
</template>

<script>
import FeedArticle from "@/components/home-cmps/FeedArticle";
import FeedActivity from "@/components/home-cmps/FeedActivity";
export default {
  components: {
    FeedArticle,
    FeedActivity
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
