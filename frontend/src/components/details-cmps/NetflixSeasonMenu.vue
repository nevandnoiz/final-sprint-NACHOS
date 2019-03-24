<template>
  <section>
<div class="menu--main">
  <li>
    {{this.season.name}}
    <ul class='sub-menu'>
      <li v-for="(seasonList, index) in this.seasons" :key="index" @click="onSelectSeason(index)">{{seasonList.name}}</li>
    </ul>
  </li>
  
</div>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  async created() {
      this.season = this.seasons[0]
  },
  data() {
    return {
      season: null,
      seasons: null,
    };
  },
  methods: {
    onSelectSeason(index) {
        eventBus.$emit("onSeasonClick", index);
        // console.log(index)
      this.season = null;
      setTimeout(() => {
        this.season = this.seasons[index];
        console.log('season picked:', this.season)
      }, 0);
    }
  },
  props: ["seasons", "tvShowId"]
};
</script>

<style scoped>
.menu--main {
}
.menu--main li {
    width: 100%;
    color: white;
    background-color: black;
    text-align: center;
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding: 15px 20px;
    /* background-color: rgba(255, 255, 255, 0.74); */
    margin-right: -4px;
}
.menu--main li:hover {
  /* background-color: #dde2e7; */
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
    /* display: block; */
    visibility: hidden;
    background-color: #00000096;
    position: absolute;
    left: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    max-height: 0;
    /* width: 150px; */
    overflow: hidden;
}
.menu--main .sub-menu li {
       width: 100%;
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding: 15px 20px;
    /* background-color: #f8f9fa; */
    margin-right: -4px;
    background-color: #00000096;
}
</style>
