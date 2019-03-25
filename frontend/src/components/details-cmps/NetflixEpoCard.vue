<template>
  <div class="movie">
<img :src="`${imgURL(this.epoImg)}`">
<h1>{{this.title}}</h1>
<h2>{{epNum}}</h2>

    <!-- <div class="content"> -->
      <!-- <h1 class="title">{{ title }}</h1> -->
      <!-- <p class="description">{{ description }}</p> -->
      <!-- <p class="duration">{{ duration }}</p> -->
    <!-- </div> -->
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
export default {
  created() {
  },
  name: "Movie",
  props: ["epoImg", "title", "description", "duration","eposideNum"],
  methods: {
    imgURL(stillPath) {
      return UtilityService.imgURL(stillPath, 780);
    }
  },
  computed: {
    epNum(){
      if(this.eposideNum < 10) return `0${this.eposideNum}`
      return this.eposideNum
    }
  },
};
</script>

<style scoped>
h2{
        position: absolute;
    left: 0;
    top: 0;
   font-size: 1.5rem;
    /* font-weight: 700; */
    padding: 0.2rem 0.4rem;
    margin: 0.5re 0.5rem 1rem 1rem;
    color: rgb(232, 232, 232);
}
 h1{     font-weight: normal;
    position: absolute;
    color: #e6e6e6;
    margin: 0.4rem;
    bottom: 0;
    font-size: 0.9rem;
    /* top: 0; */
    /* text-shadow: 3px 3px 6px black; */
}
img {
  width: 100%;
}
.movie {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  /* padding: 10px; */
  /* width: 200px; */
  /* height: 112px; */
  background-color: rgba(255, 255, 255, 0.7);
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-size: cover;
}
</style>
