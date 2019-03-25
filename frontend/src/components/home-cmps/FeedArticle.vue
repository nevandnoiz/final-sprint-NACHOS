<template>
  <div class="article" v-show="ready">
    <img ref="imgTest" :src="article.urlToImage" alt>
    <div class="article-text">
      <h2>
        <a :href="article.url" target="/">{{article.title}}</a>
      </h2>
      <h4>{{article.description}}</h4>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: ["article"],
  data() {
    return {
      ready: false
    };
  },
  mounted() {
    var imgTest = this.$refs.imgTest;
    imgTest.onload = () => (this.ready = true);
  }
};
</script>

<style lang="scss" scoped>
.article {
  width: inherit;
  display: flex;
  margin-top: 25px;
}

.article-text {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  h4 {
    margin-top: 10px;
  }
}

h2 {
  font-size: 2em;
}
a {
  color: gray;
}
img {
  height: 250px;
  width: 400px;
  object-fit: cover;
}
</style>
