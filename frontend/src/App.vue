<template>
  <div id="app">
    <app-header></app-header>
    <search-bar></search-bar>
    <div class="routes-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import searchBar from "@/components/header-cmps/SearchBar1.vue";
import AppHeader from "./components/header-cmps/AppHeader";
import buefy from "./buefy.css";
import reset from "./reset.css";

export default {
  components: {
    AppHeader,
    searchBar
  }
};
</script>


<style lang="scss">
#app {
  display: grid;
  grid-template: 65px 40px 1fr/1fr;
}
.routes-container {
  grid-area: 3/1/3/1;
}
</style>
