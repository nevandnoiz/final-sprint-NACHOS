<template>
  <div class="episode-item" :style="{'background-image':'url(\''+imgURL(episode.still_path)+'\')'}">
    <h3>Episode {{episode.episode_number}} : {{episode.name}}</h3>
    <i class="fas fa-check check" :class="{'checked': isChecked}" @click="isChecked=!isChecked"></i>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["episode"],
  data() {
    return {
      isChecked: false
    };
  },
  created() {},
  methods: {
    imgURL(stillPath) {
      return UtilityService.imgURL(stillPath, 780);
    }
  }
};
</script>

<style lang="scss" scoped>
.episode-item {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-size: cover;
  background-position: 50% 30%;
  opacity: 0.8;
  h3 {
    opacity: 1;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 4px black;
  }
}
i {
  border: 1px solid gray;
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
.check:hover {
  cursor: pointer;
}
</style>
