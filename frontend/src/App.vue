<template>
  <div id="app">
    <app-header></app-header>
   
    <div class="routes-container">
      <router-view/>
    </div>
  <footer></footer>
  </div>

</template>

<script>

import AppHeader from "./components/header-cmps/AppHeader";
import buefy from "./buefy.css";
import reset from "./reset.css";
import global from "./global.css";

export default {
  components: {
    AppHeader,

  },
  created(){
    this.$store.dispatch('loadUser')
  }
};
</script>


<style lang="scss">
#app {
  display: grid;
  grid-template: 65px 40px 1fr/1fr;
}
.routes-container {
  // background: black;
  grid-area: 3/1/3/1;
}

footer{
  height: 200px;
}

</style>
