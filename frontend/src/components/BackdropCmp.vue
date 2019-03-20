<template>
  <div class="backdrop-container">
    <button @click="next" class="btn btn-primary mb-3">Next</button>

    <div class="backdrop-carousel">
      <template v-for="(movie, index) in topFive">
        <transition name="fade">
            <div v-if="current === index">
          <img :src="imgURL(movie.backdrop_path)">
            </div>
        </transition>
      </template>
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
      // currImgIdx: 0,
      current: 0
    };
  },
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 1280);
    },
    next() {
      this.current = (this.current + 1) % 5;
    }
  },
  computed: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.backdrop-container {
  overflow: hidden;
}
.backdrop-carousel {
  display: flex;
}
img {
//   display: inline-block;
  width: 100vw;
  height: 480px;
  object-fit: cover;
  object-position: center top;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 500ms;
}
.fade-enter {
  transform: translateX(100%);
}
.fade-leave-to {
  transform: translateX(-100%);
}
</style>
