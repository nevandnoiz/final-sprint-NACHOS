<template>
  <section class="main-container">
    <div class="cards-container">
      <!-- <div @click="nextActors" class="left">
        <i class="fas fa-arrow-left"></i>
      </div>-->

      <div class="card-container" v-for="(actor, index) in item.cast" :key="index">
        <img :src="'http://image.tmdb.org/t/p/w300'+actor.profile_path">
        <h1>{{actor.name}}</h1>
        <p>{{actor.character}}</p>
      </div>

      <!-- <div @click="nextActors" class="right">
        <i class="fas fa-arrow-right"></i>
      </div>-->
    </div>
  </section>
</template>

<script>
// import UtilityService from "@/services/UtilityService.js";
export default {
  props: ["item"],
  created() {
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>

h1 {
  margin-top: 0.5rem;
  font-weight: 700;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}
p {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  padding-bottom: 0.2rem;
}
.main-container {
  grid-row: 2;
  justify-content: center;
  height: 1000px;
  display: flex;
  direction:rtl;
  overflow: scroll;
  /* grid-template-columns: 50px 1fr 50px; */
}
.card-container {
      display: flex;
    flex-direction: column;
 margin: 2rem 0;
    /* background: white; */
    border-radius: 3px;
       padding: 0.5rem 0;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    /* padding: 1rem; */
    /* width: 224px; */
   
    flex-direction: column;

    align-items: center;

    justify-content: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* width: auto; */
    /* -webkit-box-shadow: 0px 0px 4px #000000; */
    /* box-shadow: 0px 0px 4px #000000; */
}
img {
    width: 145px;
}
.cards-container {
}
/* div {
    display: none;
} */
/* .cards-container:hover + .right {
  display: block
} */

/* a:hover + div {
    display: block;
} */
</style>
