<template>
  <div class="backdrop-container">
    <!-- <button @click="next">Next</button> -->
    <div v-for="(movie, index) in topFive" :key="index">
      <transition name="slide">
        <div
          class="backdrop-carousel-img"
          v-if="currImgIdx === index"
          :style="{'background-image':'url(\''+imgURL(movie.backdrop_path)+'\')'}"
        ></div>
      </transition>
    </div>
    <div class="backdrop-num-btns">
      <button @click="currImgIdx=index" v-for="(movie, index) in topFive" :key="index"></button>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["topFive"],
  components: {},
  data() {
    return {
      currImgIdx: 0
    };
  },
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 1280);
    },
    next() {
      this.currImgIdx = (this.currImgIdx + 1) % 5;
    }
  },
};
</script>

<style lang="scss" scoped>
.backdrop-container {
  grid-area: 1/1/1/1;
  height: 600px;
}
.backdrop-carousel-img {
  height: 600px;
  width: 100vw;
  position: absolute;
  background-size: cover;
  background-position: center 20%;
  z-index: -1;
}
.backdrop-num-btns {
  display: flex;
  justify-content: space-evenly;
  padding: 2px;
  width:200px;
  position:absolute;
  left:10%;
  bottom:10%;
  button {
    height: 20px;
    color: white;
    background:none;
    border-radius:50%;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter,
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
