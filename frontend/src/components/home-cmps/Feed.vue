<template>
  <section class="feed">
      <select-defualt @generateFeed="generateFeed"/>
  </section>
</template>


<script>
import selectDefualt from '@/components/home-cmps/selectDefualt'
import FeeSdervice from '@/services/FeedService'
export default {
    props: {
        activities: Array
    },
    components: {selectDefualt},
    methods: {
        generateFeed(items){
            FeeSdervice.getNewsByArr(items)
        }
    }
};
</script>

<style lang="scss" scoped>
.feed{
    height: 400px;
    pre {
        text-align: center
    }
}
</style>
