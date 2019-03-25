<template>
  <div>
    <section>
      <h2 class="section-header">Choose tv shows you like</h2>
      <div v-if="items" class="selector">
        <div class="select-item" v-for="item in itemToShow" :key="item.id">
          <div class="choose"></div>
          <item-preview
            class="select-item-poster"
            :item="item"
            :click="false"
            :selectMode="true"
            @toggleItem="toggleItem(item.name)"
          />
          <p>{{item.name}}</p>
        </div>
      </div>
    </section>
    <button v-if="likedItems.length > 2" @click="$emit('generateFeed', likedItems)">go</button>
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
    toggleItem(itemName) {
      const itemIdx = this.likedItems.indexOf(itemName);
      if (itemIdx >= 0) this.likedItems.splice(itemIdx, 1);
      else this.likedItems.push(itemName);
    }
  },
  computed: {
    itemToShow: function() {
      const itemsToShow = [];
      for (let i = 0; i < 10; i++) {
        const randomNum = Math.floor(Math.random() * this.items.length);
        itemsToShow.push(this.items[randomNum]);
        this.items.splice(randomNum, 1);
      }
      return itemsToShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .select-item {
    margin: 10px;
  }
  .select-item-poster {
    width: 130px;
    height: 200px;
  }
}
.section-header {
  text-align: center;
  font-size: 40px;
  font-family: sans-serif;
}

section {
  margin-top: 25px
}
</style>
