<template>
  <header>
    <div class="container">
      <img src="@/imgs/Nachos-icon.svg" alt="App-Logo">
      <router-link to="/browse/movies">Movies</router-link>
      <router-link to="/browse/TvShows">Tv Shows</router-link>
      <router-link to="/browse/Actors">Actors</router-link>
      <router-link v-if="user" to="/profile">Profile</router-link>
      <router-link v-else to="/login">login</router-link>
    </div>
    <search-bar></search-bar>
  </header>
</template>

<script>
import searchBar from '@/components/header-cmps/SearchBar.vue'
export default {
  components: {
    searchBar
  },
    props: ['user']
};
</script>


<style lang="scss" scoped>
header {
  height: 100px;
  background-color: rgb(45, 45, 45);
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
    img {
      height: 100px;
    }
    a {
      color: white;
      margin: 10px;
      font-size: 30px;
      text-decoration: none;
      font-family: sans-serif;
    }
  }
}
</style>
