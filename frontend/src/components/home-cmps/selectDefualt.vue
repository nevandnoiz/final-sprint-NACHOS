<template>
  <div>
    <section>
      <h2>Choose tv shows you like</h2>
      <div class="selector">
        <div class="select-item" v-for="item in items" :key="item.id">
          <div class="choose"></div>
          <item-preview
            class="select-item-poster"
            :item="item"
            :click="false"
            :select= "true"
            @click="add(item.name)"
          />
          <p>{{item.name}}</p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "axios";
import itemPreview from "@/components/ItemPreview";
export default {
  components: { itemPreview },
  data() {
    return {
      items: null,
      likedItems: []
    };
  },
  created() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=fd807ad0f521ce282a03431f7288592d&language=en-US&page=1`
      )
      .then(res => (this.items = res.data.results));
  },
  methods: {
    add(itemName) {
      this.likedItems.push(itemName);
    }
  }
};
</script>

<style lang="scss" scoped>
.selector {
  display: flex;
  width: 100vh;
  flex-wrap: wrap;

  .select-item {
    margin: 10px;
  }
  .select-item-poster {
    width: 130px;
    height: 200px;
  }
}
</style>
