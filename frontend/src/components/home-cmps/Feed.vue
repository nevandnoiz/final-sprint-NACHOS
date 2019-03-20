<template>
  <section class="feed">
      <pre>
          {{activities}}
      </pre>
  </section>
</template>


<script>
export default {
    props: {
        activities: Array
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
