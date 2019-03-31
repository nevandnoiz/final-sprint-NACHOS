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
  height: 995px;
  display: flex;
  direction: ltr;
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
  margin-left: 1rem;
      margin: 0 auto;
}

@media only screen and (max-width: 2000px) { 
img{
      height: 217px;
    width: auto;
    overflow: scroll;
}
.card-container{
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
    width: 200px /* width: 159px; */ /* width: auto; */ /* -webkit-box-shadow: 0px 0px 4px #000000; */ /* box-shadow: 0px 0px 4px #000000; */;
}
.cards-container{
  display: -webkit-box;
      margin: 0 auto;
    display: -ms-flexbox;
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    /* flex-direction: row; */
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
}
.main-container{
      margin-top: 1.4rem;
    /* grid-row: 2; */
    /* -webkit-box-pack: center; */
    -ms-flex-pack: center;
    -webkit-box-pack: center;
    justify-content: center;
    /* height: 995px; */
    /* display: -webkit-box; */
    /* width: 4000px; */
    height: auto;
    display: block;
    /* display: flex; */
   direction: ltr;
    overflow: scroll;
    /* grid-template-columns: 50px 1fr 50px; */
}

}

@media only screen and (max-width: 750px) {
  .main-container{
margin-top: 1.4rem;
    /* grid-row: 2; */
    /* -webkit-box-pack: center; */
    -ms-flex-pack: center;
    justify-content: center;
    /* height: 995px; */
    /* display: -webkit-box; */
    /* width: 4000px; */
    /* display: -ms-flexbox; */
    height: auto;
    display: flex;
    /* display: flex; */
 direction: ltr;
    overflow: scroll;
    /* grid-template-columns: 50px 1fr 50px; */
  }
  .cards-container {
        margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
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
            width: 200px
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
