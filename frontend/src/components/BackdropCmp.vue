<template>
  <div class="backdrop-container" @click="pushToDetails(topItems[currIdx])">
    <div v-for="(item, index) in topItems" :key="index">
      <transition name="slide">
        <div
          class="backdrop-carousel-img"
          v-if="currIdx === index"
          :style="{'background-image':'url(\''+imgURL(item.backdrop_path)+'\')'}"
        >
          <h1>{{item.title || item.name}}</h1>
        </div>
      </transition>
    </div>
    <div class="backdrop-num-btns">
      <div
        class="backdrop-num-btn"
        @click.stop="currIdx=index"
        v-for="(item, index) in topItems"
        :key="index"
      >
        <button :class="{'selected-btn': currIdx === index}"></button>
      </div>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import { clearTimeout } from "timers";

export default {
  props: ["topItems"],
  components: {},
  data() {
    return {
      currIdx: 0,
      nextImgIntrvl: null,
      itemTypeRoute: null
    };
  },
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 1280);
    },
    nextImg() {
      this.currIdx = (this.currIdx + 1) % 5;
    },
    pushToDetails(item) {
      this.$store.commit("setSelectedItem", item);
      this.$router.push(`${this.itemTypeRoute}/details/${item.id}`);
    }
  },
  computed: {},
  created() {
    this.itemTypeRoute = this.$route.path;
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
  cursor: pointer;
  .backdrop-carousel-img {
    height: 475px;
    width: 100vw;
    position: absolute;
    background-size: cover;
    overflow: hidden;
    background-position: center 20%;
    h1 {
      font-family: Verdana, Geneva, sans-serif;
      font-weight: bold;
      color: rgb(255, 238, 238);
      font-size: 46px;
      position: relative;
      top: 70%;
      left: 3%;
      text-shadow: 3px 3px 6px black;
    }
  }
}

.backdrop-num-btns {
  display: flex;
  justify-content: space-evenly;
  padding: 2px;
  width: 500px;
  position: relative;
  left: 25px;
  top: 452px;
  .backdrop-num-btn {
    height: 36px;
    button {
      cursor: pointer;
      height: 3px;
      width: 90px;
      color: white;
      opacity: 0.5;
      background-color: white;
      border: none;
      border-radius: 2px;
      box-shadow: 0 0 1px black;
      transition: opacity 0.4s, background-color 0.1s;
    }
    button:hover {
      background-color: rgb(226, 226, 226);
    }
    .selected-btn {
      opacity: 0.9;
    }
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
