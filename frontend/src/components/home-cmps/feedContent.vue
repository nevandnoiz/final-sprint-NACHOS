<template>
  <section class="feedContent">
 <promotion v-if="!user"/>
    <component
      v-for="(item, idx) in feedItems"
      :key="idx"
      :is="item.type"
      :item="item"
      @addLike="$emit('addLike', item)"
      @removeLike="$emit('removeLike', item)"
      @addComment="$emit('addComment', $event)"
    />
  </section>
</template>

<script>
import util from "@/services/UtilityService.js";
import FeedArticle from "@/components/home-cmps/FeedArticle";
import activity from "@/components/home-cmps/FeedActivity";
import promotion from "@/components/home-cmps/promotion"
export default {
  components: {
    FeedArticle,
    activity,
    promotion
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
    ,
    user:{
      type: Object
    }
  },
  computed: {
    feedItems: function() {
      if (!this.activities) return this.articles.flat();
      if (!this.articles) return this.activities;
      else {
        const combArr = this.activities.concat(this.articles.flat());
        return combArr;
        // util.shuffleArray(combArr)
      }
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
