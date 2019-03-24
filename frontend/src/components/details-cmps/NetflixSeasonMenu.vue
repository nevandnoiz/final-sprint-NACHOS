<template>
  <section>
    <div class="menu--main">
      <li>
        {{season.name}}
        <ul class="sub-menu">
          <li
            v-for="(kaka, index) in seasonsList"
            :key="index"
            @click="onSelectSeason(index)"
          >{{kaka.name}}</li>
        </ul>
      </li>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  created() {
    if (this.seasons[0].name === "Specials") {
      this.seasonsList = this.seasons.slice(1);
    } else this.seasonsList = this.seasons;
    this.season = this.seasonsList[0];
  },
  data() {
    return {
      season: null,
      seasonsList: null
    };
  },
  methods: {
    onSelectSeason(index) {
      eventBus.$emit("onSeasonClick", index);
      // console.log(index)
      // this.season = null;
      this.season = this.seasonsList[index];
      console.log("season picked:", this.season);
    }
  },
  props: ["seasons", "tvShowId"],
  computed: {}
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.menu--main {
}
.menu--main li {
  box-shadow: inset 0 0 9px #ffffff;
  width: 100%;
  color: white;
  background-color: black;
  text-align: center;
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 15px 0;
  /* background-color: rgba(255, 255, 255, 0.74); */
  margin-right: -4px;
}
.menu--main li:hover {
  /* box-shadow:         inset 0 0 10px #000000; */
  /* background-color: #dde2e7; */
  border: 3px solid white;
}
.menu--main li:hover .sub-menu {
  max-height: 300px;
  visibility: visible;
  bottom: 100%;
  transition: all 0.4s linear;
}
.menu--main .sub-menu {
  display: -webkit-box;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -ms-flex-direction: column-reverse;
  flex-direction: column-reverse;
  visibility: hidden;
  position: absolute;
  left: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  max-height: 0;
}
.menu--main .sub-menu li {
  width: 100%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 15px 0;
  /* background-color: #f8f9fa; */
  margin-right: -4px;
  background-color: #00000096;
}
</style>
