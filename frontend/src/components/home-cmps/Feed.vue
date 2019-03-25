<template>
  <section class="feed">
    <select-defualt v-if="!user && !articles" @generateFeed="generateFeed"/>
    <feed-content v-if="articles || user" :articles="articles" :activities="activities"/>
  </section>
</template>


<script>
import selectDefualt from "@/components/home-cmps/selectDefualt";
import feedContent from "@/components/home-cmps/feedContent";
import FeedService from "@/services/FeedService";
export default {
  props: {
    user: Object
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
  },
  computed: {
    activities() {
      const activities = this.$store.getters.activities;
      return activities
    }
  },
  wtach: {
    user: function() {
      if (this.user) {
        this.$store.dispatch("loadActivities");
      }
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
