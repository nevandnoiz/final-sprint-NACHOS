<template>
  <div class="article" v-show="ready">
    <div class="source">
      <img src alt>
      <p>
        {{sourceName}} posted an article by {{auther}} about
        <a
          @click="toItem"
          class="link"
        >{{itemName}}</a>
      </p>
    </div>

    <div class="article-preview">
      <h2>
        <a :href="item.url" target="/">{{item.title}}</a>
      </h2>
      <p>
        {{item.description}}
        <a :href="item.url" target="/">Read more...</a>
      </p>
    </div>

    <div class="article-img">
      <img ref="img" :src="item.urlToImage" alt>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      ready: false
    };
  },
  mounted() {
    const img = this.$refs.img;
    img.onload = () => (this.ready = true);
  },
  computed: {
    sourceName: function() {
      return this.item.source.name;
    },
    auther: data => data.item.author,
    itemName: data => data.item.searchTerm.searchTerm,
    itemLink: data => data.item.searchTerm.id
  },
  methods: {
    toItem() {
      const detailsRoute = this.item.searchTerm.type === "tv" ? "tv" : "movies";
      this.$router.push(`/${detailsRoute}/details/${this.item.searchTerm.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  margin-top: 20px;
  width: 50vw;
  border: 1px solid lightgray;
  border-radius: 8px;
  background-color: white;
   @media (max-width: 1000px) {
    width: 70vw;
  }
  @media (max-width: 650px) {
    width: 80vw;
  }
  @media (max-width: 400px) {
    width: 90vw;
  }
}

.source {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
  margin-top: 8px;
  img {
    min-height: 40px;
    min-width: 40px;
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 8px;
  }
  p {
    font-size: 20px;
  }
  a.link {
    color: #f57f16;
  }
  a.link:hover {
    text-decoration: underline;
    color: inherit;
  }
}

.article-preview {
  margin-left: 12px;
  margin-top: 12px;
  h2 {
    a {
      color: black;
      text-decoration: none;
    }
    a:hover {
      color: #f57f16;
    }
    font-size: 28px;
  }

  p {
    margin-top: 8px;
    a {
      color: #f57f16;
    }
    a:hover {
      color: black;
    }
  }
}

.article-img {
  margin-top: 10px;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
}
</style>
