<template>
    <section>
        <div class="main-twitter-feed-container">
<masonry
  :cols="1"
  :gutter="20"
  >
  <Tweet v-for="(idx, index) in searchResults" :key="index" class="tweet" :id="idx" :options="{ theme: 'light' }"/>
</masonry>
        </div>



         
    </section>
</template>

<script>
import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
import { eventBus } from "@/main.js";
export default {
    components: {
        Tweet
    },
props:['keyword'],
async created() {

    const [
      searchRes,
    ] = await Promise.all([
      this.$store.dispatch("getSeachTwitter", 'Avengers'),
    ]);
    this.searchResults = searchRes;

},
data() {
    return {
        searchResults: null,
    }
},
}
</script>

<style scoped>
.main-twitter-feed-container{
width: 60%;
    margin: 0 auto;
    background: #e1e1e1;
}

</style>
