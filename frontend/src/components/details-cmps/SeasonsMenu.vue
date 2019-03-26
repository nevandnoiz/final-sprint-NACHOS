<template>
  <el-select @change="onSelectSeason" v-model="seasonIdx">
    <el-option
      v-for="(season,index) in seasonsList"
      :key="index"
      :label="season.name"
      :value="index"
    ></el-option>
  </el-select>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
    
  data() {
    return {
        seasonIdx: 0,
      season: null,
      seasonsDetails: null,
      seasonsList: null
    };
  },
  async created() {

             if (this.seasons[0].name === "Specials") {
              this.seasonsList = this.seasons.slice(1);
                 } else this.seasonsList = this.seasons;
                  this.season = this.seasonsList[0];

      
        this.seasonsDetails = await this.$store.dispatch({
        type: "getSeasonDetails",
        id: this.tvShowId,
        seasons: this.seasons
    });
 

  },
  props: ["seasons", "tvShowId"],
  methods: {
    onSelectSeason(index) {
        console.log(index)
      eventBus.$emit("onSeasonClick", index);
      // this.season = null;
      this.season = null;
      this.season = this.seasonsList[index];
    },

  }
};
</script>
<style>
.el-input__inner {
  color: white !important;
  background-color: #2d2d2d !important;
}
.el-select-dropdown__list {
  /* padding: 0 !important */
  background-color: #2d2d2d !important;
  border: 0 !important;
}
.el-select-dropdown__item {
  color: white !important;
  background-color: #2d2d2d !important;
}
.el-select-dropdown {
  border: 0 !important;
}
.el-select {
-webkit-box-shadow: 0px 0px 12px #000000;
    box-shadow: 0px 0px 12px #000000;
    position: absolute;
    z-index: 20;
    width: 200px;
    top: 185px;
    right: 0;
}
.el-input__inner {
  border: none !important;
  border-radius: 0 !important;
}
</style>
