<template>
  <div class="backdrop-container" @click="pushToDetails(topFive[currImgIdx].id)">
    <!-- <button @click="next">Next</button> -->
    <div v-for="(movie, index) in topFive" :key="index">
      <transition name="slide">
        <div
          class="backdrop-carousel-img"
          v-if="currImgIdx === index"
          :style="{'background-image':'url(\''+imgURL(movie.backdrop_path)+'\')'}"
        >
          <h1>{{movie.title}}</h1>
        </div>
      </transition>
    </div>
    <div class="backdrop-num-btns">
      <button @click.stop="currImgIdx=index" v-for="(movie, index) in topFive" :key="index"></button>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import { clearTimeout } from "timers";

export default {
  props: ["topFive"],
  components: {},
  data() {
    return {
      currImgIdx: 0,
      nextImgIntrvl: null
    };
  },
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 1280);
    },
    nextImg() {
      this.currImgIdx = (this.currImgIdx + 1) % 5;
    },
    pushToDetails(movieId) {
      console.log("sdf");
      this.$router.push(`/details/${movieId}`);
    }
  },
  computed: {},
  created() {
    this.nextImgIntrvl = setInterval(this.nextImg, 10000);
  },
  destroyed() {
    clearInterval(this.nextImgIntrvl);
  }
};
</script>

<style lang="scss" scoped>
.backdrop-container {
  grid-area: 1/1/1/1;
  // height: 375px;
  cursor: pointer;
  .backdrop-carousel-img {
    height: 375px;
    width: 100vw;
    position: absolute;
    background-size: cover;
    overflow: hidden;
    background-position: center 20%;
    z-index: -1;
    h1 {
      font-family: Verdana, Geneva, sans-serif;
      font-weight: bold;
      color: rgb(255, 238, 238);
      font-size: 46px;
      position: relative;
      top: 46%;
      left: 8%;
      text-shadow: 0 0 3px black;
    }
  }
}

.backdrop-num-btns {
  display: flex;
  justify-content: space-evenly;
  padding: 2px;
  width: 200px;
  position: absolute;
  left: 10%;
  bottom: 40%;
  button {
    cursor: pointer;
    height: 20px;
    color: white;
    background: none;
    border-radius: 50%;
    border: 2px solid rgb(170, 170, 170);
    box-shadow: 0 0 1px black;
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
