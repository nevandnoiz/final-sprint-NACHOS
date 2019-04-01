<template>
  <section class="feed" v-if="doneLoadingUser">
    <select-defualt v-if="!user && !articles" @generateFeed="generateFeed"/>

    <feed-content
      v-if="(articles || user)"
      :articles="articles"
      :activities="activities"
      :user="user"
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
      articles: null
      // ready: false
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
        const favoriteItems = list.items.map(function(item) {
          const title = item.type === "tv" ? item.name : item.title;
          return { name: title, id: item.id, item_type: item.type };
        });
        return favoriteItems;
      }
    },
    doneLoadingUser() {
      return this.$store.getters.doneLoadingUser;
    }
  },
  watch: {
    user: function() {
      if (this.user) {
        this.$store.dispatch("getFollowedActivities");
        this.generateFeed(this.userFavoriteItems, 1);
      }
    }
  },
  async created() {
    if (this.user) {
      let activities = await this.$store.dispatch("getFollowedActivities");
      // this.ready = true;
      this.generateFeed(this.userFavoriteItems, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.feed {
  margin-top: 100px;
  height: 400px;
  display: flex;
  justify-content: center;
  pre {
    text-align: center;
  }
}
</style>
