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
    generateFeed(items, numOfArticles) {
      this.articles = FeedService.getNewsByArr(items, numOfArticles);
    }
  },
  computed: {
    activities() {
      const activities = this.$store.getters.activities;
      return activities;
    },
    userFavoriteItems() {
      if (this.user) {
        const list = this.user.lists.find(list => list.name === "favorites");
        const favoriteItems = list.items.map(item => item.name);
        return favoriteItems;
      }
    }
  },
  watch: {
    user: function() {
      if (this.user) {
        this.$store.dispatch("loadActivities");
        this.generateFeed(this.userFavoriteItems, 1);
      }
    },
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
