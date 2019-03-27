<template>
  <section>
    <div class="control-bar">
      <i @click="playTrailer" class="far fa-play-circle"></i>
      <div @click="onSeasonsListClick" class="list-btn">
        <i :class="{ 'active': isSeasonsListMode }" class="fas fa-list-ul"></i>
      </div>
      <i class="fas fa-bookmark"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-star"></i>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  data() {
    return {
      isSeasonsListMode: false
    };
  },
  methods: {
    playTrailer() {
      eventBus.$emit("playTrailer");
    },
    onSeasonsListClick() {
      console.log("click");
      eventBus.$emit("onSeasonsListClick");
      this.isSeasonsListMode = !this.isSeasonsListMode;
    }
  }
};
</script>

<style scoped>
.active {
  color: green !important;
}
i:hover {
  cursor: pointer;
}
i {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.863);
}
.fa-play-circle {
  font-size: 4rem;
  margin-right: 1rem;
}
.control-bar {
      z-index: 4534534565464567546;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

</style>
