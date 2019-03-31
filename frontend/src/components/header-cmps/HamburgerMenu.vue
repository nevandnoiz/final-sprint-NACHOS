<template>
    <!--Navbar-->
<nav class="navbar navbar-light light-blue lighten-4">
    <div class="logo-contaier">
        <img @click="pushToHome" src="@/imgs/Nachos-icon.svg" alt="App-Logo">
      </div>

  <search-bar1 class="search-bar"></search-bar1>
  <button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
    aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-blue-text"><i
        class="fas fa-bars fa-1x"></i></span></button>
  <!-- Navbar brand -->
  <!-- <a class="navbar-brand" href="#">Navbar</a> -->

  <!-- Collapse button -->


  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="navbarSupportedContent1">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
         <router-link to="/actors">ACTORS</router-link>
      </li>
      <li class="nav-item">
     <router-link to="/movies">MOVIES</router-link>
      </li>
      <li class="nav-item">
           <router-link to="/tv">TV SHOWS</router-link>
      </li>
    </ul>
    <!-- Links -->

  </div>
  <!-- Collapsible content -->

</nav>
<!--/.Navbar-->
</template>

<script>
import SearchBar1 from './SearchBar1.vue' 
export default {
components: {

SearchBar1},
methods: {
      pushToHome() {
      this.$router.push("/");
    },
},
}
</script>

<style scoped>
.navbar-toggler  {
  height: 36px;
  background: white !important
}
.dark-blue-text {
  color: black;
}
nav>* {
  margin: 0 0.2rem;
}
nav {
      display: flex;
    justify-content: center;
}
img {
      width: 40px;
    height: 40px;
}
.search-bar{
     max-width: 500px;
    flex-grow: 1;
}
</style>
