<template>
  <div
    @click="pushToDetails(movie.id)"
    class="item-preview"
    :style="{'background-image':'url(\''+img+'\')'}"
    @mouseenter="toggleIsHovered"
    @mouseleave="toggleIsHovered"
    :class="{'hover-buttons': isHovered}"
  ></div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["movie", "click"],
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
      if (!this.click) return;
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
.hover-buttons {
  border: 10px solid gray;
}
</style>
