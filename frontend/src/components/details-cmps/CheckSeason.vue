<template>
  <div class="check-container">
    <i
      class="fas fa-check check-button-season-menu"
      @click.stop="emitCheckSeasonClicked"
      :class="{'checked': isChecked}"
    ></i>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  created() {
    eventBus.$on("ok", this.toggleWatchedSeason);
    eventBus.$on("isSeasonChecked", isSeasonCheckedArr => {
      let idx = this.season.season_number - 1;
      if (isSeasonCheckedArr[idx]) this.isChecked = true;
    });
  },
  components: {},
  data() {
    return {
      isChecked: false
    };
  },
  methods: {
    emitCheckSeasonClicked() {
      this.$emit("checkSeasonClicked", this.season.season_number - 1);
    },
    toggleWatchedSeason(seasonNum) {
      if (this.season.season_number !== seasonNum) return;
      if (!this.isChecked)
        eventBus.$emit("watchedSeason", this.season.season_number);
      else eventBus.$emit("unwatchedSeason", this.season.season_number);
      this.isChecked = !this.isChecked;
    }
  },
  computed: {},
  props: ["season"]
};
</script>

<style scoped>
.checked {
  background-color: rgb(104, 255, 104);
}
</style>
