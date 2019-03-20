<template>
  <div class="backdrop-container">
    <button @click="next">Next</button>
    <div class="backdrop-carousel-item" v-for="(movie, index) in topFive" :key="index">
      <transition name="slide">
        <div v-if="currImgIdx === index" style="position: absolute">
          <img :src="imgURL(movie.backdrop_path)">
        </div>
      </transition>
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
      currImgIdx: 0,
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
  computed: {},
  created() {}
};
</script>

<style lang="scss" scoped>
img {
  height: 480px;
  width: 100vw;
  display: inline-block;
  object-fit: cover;
  object-position: center top;
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
