<template>
  <section class="watch-next">
    <pre>{{watchNextList.items}}</pre>
  </section>
</template>


<script>
export default {
  props: {
    watchNextList: Object
  }
};
</script>

<style lang="scss" scoped>
.watch-next {
  display: flex;
  width: 90%;
  height: 200px;
  background-color: lightblue;
  margin: 0 auto;
}
</style>
