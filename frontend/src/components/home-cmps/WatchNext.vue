<template>
  <div class="watch-next">
    <h3>watch next</h3>
    <div class="items-preview" v-if="watchNextList">
      <div class="item" v-for="item in watchNextList.items" :key="item.id">
        <item-preview class="watch-next-item" :movie="item"/>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import itemPreview from "@/components/ItemPreview";

export default {
  props: {
    watchNextList: Object
  },
  components: { itemPreview }
};
</script>

<style lang="scss" scoped>
.watch-next {
  display: flex;
  flex-direction: column;
    width: 100vw;
    background-color: #ececec;  height: 320px;

  margin: 0 auto;
  margin-top: 40px;

  h3 {
    font: 2em sans-serif;
    color: gray;
    margin-left: 25px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
}
.items-preview {
  display: flex;
  align-content: center;

  .item {
    margin-left: 15px;
  }

  p {
    text-overflow: ellipsis;
    width: 170px;
    white-space: nowrap;
    overflow: hidden;
  }
}

.item-preview.watch-next-item {
  width: 170px;
  height: 250px;
}
</style>
