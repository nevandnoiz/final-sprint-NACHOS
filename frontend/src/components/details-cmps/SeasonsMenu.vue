<template>
  <el-select class="netflix-menu" @change="onSelectSeason" v-model="seasonIdx">
    <el-option
      class="episoide-btn-container"
      v-for="(season,index) in seasonsList"
      :key="index"
      :label="season.name"
      :value="index"
    >
      <p>{{season.name}}</p>
      <check-season @checkSeasonClicked="onCheckSeasonClicked" v-if="currUser" :season="season"></check-season>
    </el-option>
  </el-select>
</template>

<script>
import CheckSeason from "@/components/details-cmps/CheckSeason.vue";
import { eventBus } from "@/main.js";

export default {
  components: {
    CheckSeason
  },
  data() {
    return {
      seasonIdx: 0,
      seasonsList: null
    };
  },
  async created() {
    if (this.seasons[0].name === "Specials") {
      this.seasonsList = this.seasons.slice(1);
    } else this.seasonsList = this.seasons;
  },
  props: ["seasons", "tvShowId"],
  methods: {
    async onSelectSeason(index) {
      await eventBus.$emit("onSeasonClick", this.seasonIdx);
    },
    async onCheckSeasonClicked(index) {
      this.seasonIdx = index;
      await this.onSelectSeason(index);
      eventBus.$emit("ok", index+1);
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    }
  }
};
</script>
<style>
.episoide-btn-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.check-button-season-menu {
  font-size: 10px;
  margin: 9px 9px 9px 0;
  background-color: white;
  opacity: 0.5;
  color: darkslategray;
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: center;
  border-radius: 50%;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.check-button-season-menu:hover {
  cursor: pointer;
  opacity: 0.75;
}
.checked-season {
  background-color: rgb(104, 255, 104);
}
.netflix-menu {
  z-index: 33773;
}
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
  height: auto !important;
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
      bottom: 0;
      border-radius: 3px;
  right: 0;
}
.el-input__inner {
  border: none !important;
  border-radius: 0 !important;
}
</style>
