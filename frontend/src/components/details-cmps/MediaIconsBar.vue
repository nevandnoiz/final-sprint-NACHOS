<template>
  <section>
    <!-- <div class="icons-container"> -->
    <!-- <div class="netflix-icon"> -->
    <div class="link-icons">
      <a v-if="netflix" :href="netflix">
        <img src="@/imgs/logos/netflix.svg">
      </a>
      <a v-if="amazon" :href="amazon">
        <img src="@/imgs/logos/amazon.svg">
      </a>
      <a v-if="itunes" :href="itunes">
        <img src="@/imgs/logos/itunes.svg">
      </a>
       <a v-if="blinkbox" :href="blinkbox">
        <img src="@/imgs/logos/blinkbox.svg">
      </a>
      <!-- <a v-if="hbo" :href="hbo">
        <img src="@/imgs/logos/hbo.svg">
      </a> -->
    </div>

    <!-- <img src="@/imgs/logos/amazon.eps"> -->
    <!-- </div> -->
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  props: ["watchLinks"],
  created() {
    console.log(
      typeof this.watchLinks.locations.filter(res => res.name === "Netflix")
    );
    console.log("i got the itme!", this.watchLinks);
  },
  computed: {
    netflix() {
      // console.log(this.watchLinks.locations.filter(res=>res.display_name === 'Netflix')[0].url)
      if (
        this.watchLinks.locations.filter(res => res.name === "Netflix").length >
        0
      ) {
        return this.watchLinks.locations.filter(
          res => res.name === "Netflix"
        )[0].url;
      }
    },
    amazon() {
      if (
        this.watchLinks.locations.filter(res => res.name === "Amazon").length >
        0
      ) {
        return this.watchLinks.locations.filter(res => res.name === "Amazon")[0]
          .url;
      }
    },
    itunes() {
      if (this.watchLinks.locations.filter(res => res.name === "ITunes").length >0) {return this.watchLinks.locations.filter(res => res.name === "ITunes")[0].url;}
    },
    blinkbox() {
      if (this.watchLinks.locations.filter(res => res.name === "BlinkBox").length >0) {return this.watchLinks.locations.filter(res => res.name === "BlinkBox")[0].url;}
    },
    // hbo(){
    //   if (this.watchLinks.locations.filter(res => res.name === "BlinkBox").length >0) {return this.watchLinks.locations.filter(res => res.name === "BlinkBox")[0].url;}
    // }
  }
};
</script>

<style scoped>
.link-icons {
      z-index: 3;
}
img {
  height: 20px;
    background: white;
    /* padding: 1rem; */
    margin: 0 4px;
    box-sizing: content-box;
    padding: 0.5rem 1rem;
    border-radius: 5px;
}
</style>
