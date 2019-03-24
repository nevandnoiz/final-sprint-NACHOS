<template>
  <section class="feed">
      <select-defualt/>
  </section>
</template>


<script>

import selectDefualt from '@/components/home-cmps/selectDefualt'
export default {
    props: {
        activities: Array
    },
    components: {selectDefualt}
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
