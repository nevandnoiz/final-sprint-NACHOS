<template>
  <section class="main-container-of-season-netflix">
    <div class="cards-container-of-season-netflix">
      <el-select @change="onSelectSeason" v-model="seasonIdx">
        <el-option
          v-for="(season,index) in seasonsList"
          :key="index"
          :label="season.name"
          :value="index"
        ></el-option>
      </el-select>
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(eposide, index) in season.episodes" :key="index">
          <netflix-epo-card
            :epoImg="eposide.still_path"
            :title="eposide.name"
            :description="eposide.overview"
            :eposideNum="eposide.episode_number"
          />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </section>
</template>

<script>
import NetflixEpoCard from "@/components/details-cmps/netflixEpoCard.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
 import { eventBus } from "@/main.js";
// import UtilityService from "@/services/UtilityService.js";
export default {
  components: {
    NetflixEpoCard,
    swiper,
    swiperSlide
  },
  props: ["item", "season","seasons", "tvShowId"],
  async created() {
        if (this.seasons[0].name === "Specials") {
      this.seasonsList = this.seasons.slice(1);
    } else this.seasonsList = this.seasons;
     
  },
methods: {
  onSelectSeason() {
    console.log(this.seasonIdx)
      eventBus.$emit("onSeasonClick", this.seasonIdx);
    }
},
  data() {
    return {
      seasonsList:null,
      seasonIdx: 0,
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 1,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      seasonsDetails: null
    };
  }
};
</script>

<style>
.cards-container-of-season-netflix {
  position: relative;
}
.el-input__inner {
  color: white !important;
  background-color: #2d2d2d !important;
}
.el-select-dropdown__list{
 /* padding: 0 !important */
 background-color: #2d2d2d !important;
 border: 0 !important
 
}
.el-select-dropdown__item{
  color: white !important;
  background-color: #2d2d2d !important
}
.el-select-dropdown{ 
  border: 0 !important
}
.el-select {
      box-shadow: 0px 0px 12px #000000;

      position: absolute;
    /* color: black; */
    /* background-color: black; */
    z-index: 20;
    width: 200px;
    /* top: 0; */
    /* left: 0; */
    top: -40px;
    right: 0;
    /* z-index: 111111111; */
}
.el-input__inner {
  border: none !important;
  border-radius: 0 !important
}
* {
  margin: 0;
  padding: 0;
}
.main-container-of-season-netflix {
  z-index: 10;
  grid-row: 2;
  /* margin-top: 3rem; */
  grid-column: 1/5;
}
.swiper-button-prev {
  top: auto;
}
.swiper-button-next {
  top: auto;
}

.swiper-container {
  margin-top: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


