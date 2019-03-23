<template>
  <header>
    <div class="header-container">
      <img @click="pushToHome" src="@/imgs/Nachos-icon.svg" alt="App-Logo">
     <router-link to="/movies">Movies</router-link>
      <router-link to="/tv">Tv Shows</router-link>
      <router-link to="/actors">Actors</router-link>
      <router-link v-if="user" to="/profile">Profile</router-link>
      <router-link v-else to="/login">login</router-link>
    </div>
    <search-bar></search-bar>
  </header>
</template>

<script>
import searchBar from "@/components/header-cmps/SearchBar1.vue";
export default {
  components: {
    searchBar
  },
  methods: {
    pushToHome() {
      this.$router.push("/");
    }
  },
  props: ["user"]
};
</script>


<style lang="scss" scoped>
header {
  height: 60px;
  background-color: rgb(45, 45, 45);
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:0 20px;
    img {
      height: 60px;
      cursor: pointer;
    }
    a {
      color: white;
      margin: 10px;
      font-size: 24px;
      text-decoration: none;
      font-family: sans-serif;
    }
  }
}
</style>
