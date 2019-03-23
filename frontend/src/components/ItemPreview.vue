<template>
  <div
    @click="pushToDetails(item.id)"
    class="item-preview"
    :style="{'background-image':'url(\''+img+'\')'}"
    @mouseenter="toggleIsHovered"
    @mouseleave="toggleIsHovered"
    :class="{'hover-buttons': isHovered}"
  >
    <div class="item-hover-controls" v-if="isHovered">
      <div class="hover-controls-btns">
        <i class="fas fa-plus"></i>
        <i class="fas fa-check" :class="{'checked': isChecked}"  @click.stop="toggleCheckMark"></i>
      </div>
      <a href>Play Trailer</a>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["item", "click"],
  components: {},
  data() {
    return {
      img: null,
      isHovered: false,
      isChecked: false,
      itemTypeRoute: null
    };
  },
  methods: {
    imgURL() {
      return UtilityService.imgURL(this.item.poster_path, 500);
    },
    pushToDetails(itemId) {
      this.$store.commit("setSelectedItem", this.item);
      this.$router.push(`${this.itemTypeRoute}/details/${itemId}`);
    },
    toggleIsHovered() {
      this.isHovered = !this.isHovered;
    },
    toggleCheckMark() {
      this.isChecked = !this.isChecked;
    }
  },
  computed: {},
  created() {
    this.itemTypeRoute=this.$route.path
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
  transition: 0.5s;
  .item-hover-controls {
    height: inherit;
    display: grid;
    grid-template: 20px 1fr 40px/1fr;
    .hover-controls-btns {
      grid-area: 1/1/1/1;
      justify-self: flex-end;
    }
    i {
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
    a {
      color: inherit; /* blue colors for links too */
      text-decoration: inherit; /* no underline */
      grid-area: 3/1/3/1;
      text-align: center;
      font-size: 20px;
      color:lightgray;
      text-shadow: 0 0 3px darkslategray;
    }
  }
}
.hover-buttons {
  box-shadow: inset 0 0 90px #000000;
}
</style>
