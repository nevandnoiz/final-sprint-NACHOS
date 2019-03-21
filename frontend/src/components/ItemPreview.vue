<template>
  <div
    @click="pushToDetails(movie.id)"
    class="item-preview"
    :style="{'background-image':'url(\''+img+'\')'}"
    @mouseenter="toggleIsHovered"
    @mouseleave="toggleIsHovered"
    :class="{'hover-buttons': isHovered}"
  >
  <button v-if="isHovered"></button>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["movie"],
  components: {},
  data() {
    return {
      img: null,
      isHovered: false
    };
  },
  methods: {
    imgURL() {
      return UtilityService.imgURL(this.movie.poster_path, 300);
    },
    pushToDetails(movieId) {
      this.$router.push(`/details/${movieId}`);
    },
    toggleIsHovered() {
      if (this.currList === "deleted") return;
      this.isHovered = !this.isHovered;
    }
  },
  computed: {},
  created() {
    this.img = this.imgURL();
  }
};
</script>

<style lang="scss" scoped>
.item-preview {
  width: 200px;
  height: 300px;
  background-size: cover;
  cursor: pointer;
}
.hover-buttons{
  box-shadow: inset 0 0 10px #000000;
}
</style>
