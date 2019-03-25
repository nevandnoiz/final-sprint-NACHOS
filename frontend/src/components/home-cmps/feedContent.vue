<template>
  <section class="feedContent">
      <feed-article v-for="(item, idx) in feedItems" :key="idx" :article="item"/>
  </section>
</template>

<script>
import FeedArticle from '@/components/home-cmps/FeedArticle'
export default {
    components: {FeedArticle},
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
      return this.activities.concat(this.articles.flat());
    },
  }
};
</script>

<style lang="scss" scoped>
.feedContent {
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center
}
</style>
