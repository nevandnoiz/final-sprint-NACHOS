<template>
  <section class="main-container">
    <div class="cards-container">
      <div class="card-container" v-for="(actor, index) in actorToRender" :key="index">
        <img :src="'http://image.tmdb.org/t/p/w300'+actor.profile_path">
        <h1>{{actor.name}}</h1>
        <p>{{actor.character}}</p>
      </div>
    </div>
    <button @click="nextActors">+</button>
    <button @click="prevActors">-</button>
  </section>
</template>

<script>
// import UtilityService from "@/services/UtilityService.js";
export default {
  props: ["item"],
  created() {
    console.log("that actors", this.item);
  },
  data() {
    return {
      prevGalleryPos: 0,
      nextGalleryPos: 4
    };
  },
  methods: {
    nextActors() {
      if (this.prevGalleryPos === this.item.cast.length) {
        this.prevGalleryPos = 0;
        this.nextGalleryPos = 4;
        return;
      }
      this.prevGalleryPos = this.nextGalleryPos;
      this.nextGalleryPos += 4;

      for (let i = this.prevGalleryPos; this.nextGalleryPos < this.item.cast.length ? this.nextGalleryPos : this.item.cast.length; i++) {
        if (!this.item.cast[i]) {
          this.prevGalleryPos = 0;
          this.nextGalleryPos = 4;
        }
      }
    },
    // prevActors() {}
  },
  computed: {
    actorToRender: function() {
      var res = [];
      for (let i = this.prevGalleryPos; i < this.nextGalleryPos; i++) {
        if (!this.item.cast[i]) return;
        res.push(this.item.cast[i]);
      }
      return res;
    }
  }
};
</script>

<style scoped>
.main-container {
  grid-column: 1/3;
}
img {
  width: 185px;
}
.cards-container {
  display: -webkit-box;
  overflow: hidden;
  grid-template-rows: 1;
  grid-template-columns: repeat(4, 25%);
  display: grid;
  display: -ms-flexbox;
  /* display: flex; */
  -ms-flex-pack: distribute;
  justify-content: space-around;
  grid-column: 1/3;
  justify-items: center;
}
</style>
