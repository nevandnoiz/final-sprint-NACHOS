<template>
  <section class="main-container">
    <div class="cards-container">
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
import NetflixEpoCard from "@/components/details-cmps/NetflixEpoCard.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import UtilityService from "@/services/UtilityService.js";
export default {
  components: {
    NetflixEpoCard,
    swiper,
    swiperSlide
  },
  props: ["item", "season", "tvShowId"],
  async created() {
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 1,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      seasonsDeatails: null
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.swiper-button-prev {
  top: auto;
}
.swiper-button-next {
  top: auto;
}
.main-container {
  z-index: 10;
  grid-row: 2;
  /* margin-top: 3rem; */
  grid-column: 1/5;
}
.swiper-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


