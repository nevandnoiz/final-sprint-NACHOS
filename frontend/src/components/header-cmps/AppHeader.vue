<template>
  <header>
    <div class="header-container">
      <img @click="pushToHome" src="@/imgs/Nachos-icon.svg" alt="App-Logo">
      <div class="links-section">
        <router-link to="/movies">Movies</router-link>
        <router-link to="/tv">Tv Shows</router-link>
        <router-link to="/actors">Actors</router-link>
        <h3 v-if="user">{{user.name.firstName}} {{user.name.lastName}}</h3>
        <a v-else @click="login">login</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {
    // searchBar 
  },
  methods: {
    pushToHome() {
      this.$router.push("/");
    },
    login() {
      this.$store.dispatch("loadActivities");
      this.$store.dispatch("loadUser");
      setTimeout(() => this.$router.push("/"), 1500);
    }
  },
  computed: {
    user() {
      return this.$store.getters.currUser;
    }
  }
};
</script>


<style lang="scss" scoped>
header {
  position: fixed;
  height: 60px;
  z-index: 100000;
  width: 100vw;
  background-color: rgb(45, 45, 45);
  grid-area: 1/1/1/1;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
      img {
        height: 60px;
        cursor: pointer;
      }
    .links-section{
      width: 475px;
      display:flex;
      justify-content: space-evenly;
      a {
        color: white;
        margin: 10px;
        font-size: 22px;
        text-decoration: none;
        font-family: sans-serif;
        transition: 0.175s;
      }
      a:hover {
        color: rgb(170, 170, 170);
      }
      h3 {
        color: white;
        margin: 10px;
        font-size: 24px;
        text-decoration: none;
        font-family: sans-serif;
      }
    }
  }
}
</style>
