<template>
  <div
    @click="pushToDetails(movie.id)"
    class="browse-item"
    :style="{'background-image':'url(\''+img+'\')'}"
  ></div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["movie"],
  components: {},
  data() {
    return {
      img: null
    };
  },
  methods: {
    imgURL() {
      return UtilityService.imgURL(this.movie.poster_path, 300);
    },
    pushToDetails(movieId) {
      this.$router.push(`/details/${movieId}`);
    }
  },
  computed: {},
  created() {
    this.img = this.imgURL();
  }
};
</script>

<style lang="scss" scoped>
.browse-item {
  width: 200px;
  height: 300px;
  background-size: cover;
  cursor: pointer;
}
</style>
