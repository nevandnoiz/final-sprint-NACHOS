<template>
  <div id="app">
    <app-header class="header"></app-header>
   
    <div class="routes-container">
      <router-view/>
    </div>
  <!-- <footer></footer> -->
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
};
</script>


<style lang="scss">



#app {
  display: grid;
  grid-template: 105px 1fr/1fr;
}
.routes-container {
  // background: black;
  grid-area: 2/1/2/1;
}

footer{
  height: 200px;
}

@media only screen and (max-width: 1032px) { 
#app {
  display: grid;
  grid-template: 60px 1fr/1fr;
}
}

</style>
