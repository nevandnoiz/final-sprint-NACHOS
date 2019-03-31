<template>
  <section class="feed">
    <select-defualt v-if="!user && !articles" @generateFeed="generateFeed"/>
    <feed-content
      v-if="(articles || user) && ready"
      :articles="articles"
      :activities="activities"
      @addLike="addLike"
      @removeLike="removeLike"
      @addComment="addComment"
    />
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
      articles: null,
      ready: false
    };
  },
  methods: {
    generateFeed(items, numOfArticles) {
      this.articles = FeedService.getNewsByArr(items, numOfArticles);
    },
    addLike(item) {
      this.$store.dispatch("addLikeToActivity", item);
    },
    removeLike(item){
      this.$store.dispatch("removeLikeToActivity", item);
    },
    addComment(details) {
      this.$store.dispatch("addCommentToActivity", details);
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
        const favoriteItems = list.items.map(function(item) {
          const title = item.type === "tv" ? item.name : item.title;
          return { name: title, id: item.id, item_type: item.type };
        });
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
    }
  },
  async created() {
    let activities = await this.$store.dispatch('getFollowedActivities')
    this.ready = true
    if (this.user) {
      this.generateFeed(this.userFavoriteItems, 1);
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
