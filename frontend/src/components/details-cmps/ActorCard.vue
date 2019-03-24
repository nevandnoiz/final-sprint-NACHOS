<template>
  <section class="main-container">
    <div class="cards-container">
      <div @click="nextActors" class="left">
        <i class="fas fa-arrow-left"></i>
      </div>
      <div class="card-container" v-for="(actor, index) in setActors" :key="index">
        <img :src="'http://image.tmdb.org/t/p/w300'+actor.profile_path">
        <h1>{{actor.name}}</h1>
        <p>{{actor.character}}</p>
      </div>
      <div @click="nextActors" class="right">
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>
  </section>
</template>

<script>
// import UtilityService from "@/services/UtilityService.js";
export default {
  props: ["item"],
  created() {
    this.nextActors();
    console.log("that actors", this.item);
  },
  data() {
    return {
      actors: [],
      prevGalleryPos: 0,
      nextGalleryPos: 4
    };
  },
  methods: {
    nextActors() {
      this.actors = [];
      for (let i = this.prevGalleryPos; i < this.nextGalleryPos; i++) {
        if (!this.item.cast[i]) {
          this.prevGalleryPos = 0;
          const efresh = this.actors.length - this.item.cast.length;
          for (let i = 0; i < efresh; i++) {
            this.actors.push(this.item.cast[this.prevGalleryPos]);
            // this.prevGalleryPos++
            console.log("OVERAGAIN!");
          }
          this.nextGalleryPos = this.prevGalleryPos + 4;
          if (this.actors.length > 4) {
            var efresh2 = this.actors.length - 4;
            for (let i = 0; i < efresh2; i++) {
              this.actors.length.push(this.item.cast[this.prevGalleryPos]);
              this.prevGalleryPos++;
            }
            this.nextGalleryPos = this.prevGalleryPos + 4;
            return;
          }
          return;
        }
        this.actors.push(this.item.cast[i]);
      }
      this.prevGalleryPos = this.nextGalleryPos;
      this.nextGalleryPos += 4;
    }
  },
  computed: {
    setActors: function() {
      return this.actors;
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  padding: 0 1rem;
}
p {
  font-size: 1rem;
  padding-bottom: 0.2rem;
}
.main-container {
      background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
    grid-column: 1/5;
    grid-row: 23;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: grid;
    grid-template: 1fr;
    /* grid-template-columns: 50px 1fr 50px; */
}
.card-container {
  align-self: flex-start;
  border-radius: 5px;
    grid-row: 1/3;
    display: -webkit-box;
    /* box-shadow: 0px 0px 6px #000000; */
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    text-align: center;
}
img {
  width: 185px;
  /* border-radius: 5px 5px 0 0; */
  height: 277px;
}
.cards-container {
    padding: 1rem 0;
    display: -webkit-box;
    overflow: hidden;
    position: relative;
    /* grid-column: 2; */
    grid-template-rows: 277px 1fr;
    grid-template-columns: repeat(4,1fr);
    display: grid;
    display: -ms-flexbox;
    /* display: flex; */
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    /* grid-column: 2; */
    justify-items: center;
}
.right {
  /* display: none; */
     grid-column: 6;
    position: absolute;
    right: 2rem;
    color: rgba(240, 255, 255, 0.9);
    top: 102.5px;
    grid-row: 1;
    font-size: 3rem;
}
.left {
  /* display: none; */
grid-column: 1;
 color: rgba(240, 255, 255, 0.9);
    position: absolute;
    grid-row: 1;
    top: 102.5px;
    left: 2rem;
    font-size: 3rem;
}
.left:hover {
  cursor: pointer;
}
.right:hover {
  cursor: pointer;
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

@media only screen and (max-width: 850px) {
  h1 {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
    padding: 0 1rem;
  }
  p {
    font-size: 1rem;
    padding-bottom: 0.2rem;
  }
  /* .main-container {
    grid-column: 1/3;
    align-items: center;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
  } */
  .card-container {
    border-radius: 5px;

    display: -webkit-box;
    /* box-shadow: 0px 0px 6px #000000; */
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    text-align: center;
  }
  img {
    width: 185px;
    /* border-radius: 5px 5px 0 0; */
    height: 277px;
  }

  .right {
    grid-column: 3;
    grid-row: 1;
    font-size: 3rem;
  }
  .left {
    grid-column: 1;
    grid-row: 1;
    font-size: 3rem;
  }
  .left:hover {
    cursor: pointer;
  }
  .right:hover {
    cursor: pointer;
  }
}
</style>
