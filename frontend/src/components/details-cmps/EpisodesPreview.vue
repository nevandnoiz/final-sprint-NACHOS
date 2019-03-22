<template>
  <div class="episodes-container">
    <div class="episode-item" v-for="(episode,index) in episodes" :key="index">
      <span>{{episode.name}}</span>
      <i class="fas fa-check"></i>
      </div>
  </div>
</template>

<script>
export default {
  props: ["episodes"],
  data() {
    return {
      isChecked: false,
    };
  },
  created() {

  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.episodes-container{
  max-height:100vh;
  .episode-item{
    display:flex;
    justify-content: space-between;
    border:1px solid darkslategray;
  }
}
    i {
      border:1px solid gray;
      font-size: 18px;
      margin: 6px 6px 6px 0;
      background-color: white;
      opacity: 0.5;
      color: darkslategray;
      padding: 6px;
      border-radius: 50%;
      transition: 0.25s;
    }
    .checked {
      background-color: rgb(1, 221, 1);
    }
</style>
