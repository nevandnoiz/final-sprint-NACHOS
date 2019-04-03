<template>
  <section class="main-container">
    <div class="cards-container">
      <!-- <div @click="nextActors" class="left">
        <i class="fas fa-arrow-left"></i>
      </div>-->

      <div
        class="card-container"
        v-for="(actor, index) in item.cast"
        :key="index"
        v-if="actor.profile_path"
      >
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
import UtilityService from "@/services/UtilityService.js";
export default {
  props: ["item"],
  created() {},
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
  margin-top: 1.4rem;
  grid-row: 2;
  justify-content: center;
  display: flex;
  width: 76vw;
  margin: 0 auto;
  direction: ltr;
  overflow: scroll;
  height: auto;
  display: block;
}
.card-container {
  box-sizing: content-box;
  flex-direction: column;
  display: flex;
  margin: 2rem 0;
  border-radius: 3px;
  padding: 0.5rem 0;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 200px;
}
img {
  height: 217px;
  width: auto;
  overflow: scroll;
}
.cards-container {
  display: flex;
  width: fit-content;
  align-items: baseline;
  margin-left: 1rem;
  margin: 0 auto;
}

@media only screen and (max-width: 1000px) {
  .main-container {
    width: 100vw;
  }
}
@media only screen and (max-width: 750px) {
  .main-container {
    margin-top: 1.4rem;
    -ms-flex-pack: center;
    justify-content: center;
    height: auto;
    display: flex;
    direction: ltr;
    overflow: scroll;
  }
  .cards-container {
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    margin: 0 auto;
    display: flex;
    width: fit-content;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    /* flex-direction: row; */
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
  }
  .card-container {
    display: flex;
    /* -webkit-box-orient: vertical; */
    /* -webkit-box-direction: normal; */
    -ms-flex-direction: column;
    /* flex-direction: column; */
    margin: 2rem 0;
    /* background: white; */
    border-radius: 3px;
    padding: 0.5rem 0;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    /* padding: 1rem; */
    /* width: 224px; */
    /* flex-direction: column; */
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* height: 217px; */
    width: 200px;
    /* width: 159px; */
    /* width: auto; */
    /* -webkit-box-shadow: 0px 0px 4px #000000; */
    /* box-shadow: 0px 0px 4px #000000; */
  }
  img {
    height: 217px;
    width: auto;
    overflow: scroll;
  }
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
