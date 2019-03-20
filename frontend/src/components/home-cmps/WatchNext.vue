<template>
  <section class="watch-next">
      <pre>
          {{watchNext}}
      </pre>
  </section>
</template>


<script>
export default {
    props: {
        watchNext: Array
    }
};
</script>

<style lang="scss" scoped>
.watch-next {
    width: 90%;
    height: 200px;
    background-color: red;
    margin: 0 auto;
}
</style>
