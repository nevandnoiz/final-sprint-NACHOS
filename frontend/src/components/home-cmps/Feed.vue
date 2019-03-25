<template>
  <section class="feed">
    <select-defualt v-if="!articles" @generateFeed="generateFeed"/>
    <feed-content v-if="articles" :articles="articles"/>
  </section>
</template>


<script>
import selectDefualt from "@/components/home-cmps/selectDefualt";
import feedContent from "@/components/home-cmps/feedContent";
import FeedService from "@/services/FeedService";
export default {
  props: {
    activities: Array
  },
  components: {
    selectDefualt,
    feedContent
  },
  data() {
    return {
      articles: null
    };
  },
  methods: {
    generateFeed(items) {
      this.articles = FeedService.getNewsByArr(items);
    }
  }
};
</script>

<style lang="scss" scoped>
.feed {
  height: 400px;
  display: flex;
  justify-content: center;
  pre {
    text-align: center;
  }
}
</style>
