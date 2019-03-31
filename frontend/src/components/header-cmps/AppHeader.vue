<template>
<section>
          <hamburger-menu class="hamburger"></hamburger-menu>

  <header class="desktop-header">
    <div class="header-container">

      <div class="logo-contaier">
        <img @click="pushToHome" src="@/imgs/Nachos-icon.svg" alt="App-Logo">
      </div>

      <div class="links-section">
        <div class="links">
<router-link to="/movies">MOVIES</router-link>
        <router-link to="/tv">TV SHOWS</router-link>
        <router-link to="/actors">ACTORS</router-link>
        </div>
        <search-bar class="search-bar"></search-bar>
       
      </div>
      <div class="login">
 <h3 class="username" v-if="user">{{user.name.firstName}} {{user.name.lastName}}</h3>
        <a class="username" v-else @click="login">LOGIN</a>
      </div>
      
    </div>
  </header>
  </section>
</template>

<script>
import HamburgerMenu from './HamburgerMenu.vue' 
    
 
import searchBar from "@/components/header-cmps/SearchBar1.vue";
export default {
  components: {
    searchBar
  ,  HamburgerMenu},
  methods: {
    pushToHome() {
      this.$router.push("/");
    },
    login() {
      this.$store
        .dispatch("loginUser")
        .then(() => this.$store.dispatch("loadActivities"));
      this.$router.push("/");
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

.hamburger {
  display: none;
}
@media only screen and (max-width: 1032px) { 
   .hamburger {
  display: flex;
  background: black;
  ;
}
.desktop-header{
  display: none;
}
}
@import url("https://fonts.googleapis.com/css?family=Montserrat");
*{
  font-family: 'Montserrat', sans-serif;
  font-weight: 700
}
search-bar{
      height: 0;
}
section {
      box-shadow: 0px 0px 5px #000000;
  background: black;
    top: 0;
    // height: 105px;
    width: 100vw;
    /* z-index: 2131123123123124234234234; */
        z-index: 333333333;
    position: fixed;
}
.logo-contaier{
  
  margin-right: 1rem;

}
  
.username {
  
         border-left: 4px solid white;
    /* padding: 1.5rem; */
    padding-left: 1.5rem;
    /* margin-right: 1rem; */
    height: 80%;
    align-items: center;
    /* justify-content: center; */
    display: flex;
    text-transform: uppercase;
}
.search-bar {    margin-right: 2rem;
    box-shadow: none;
    order: -1;
    width: 400px !important;
    display: flex;
    align-items: center;
    background: none !important;
    height: 105px !important;
    z-index: 333333333;
    position: unset;
    position: auto !important;
}
.login {
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 10px;
    font-size: 22px;
    text-decoration: none;
    -webkit-transition: 0.175s;
    transition: 0.175s;
}
.links {
      // margin-left: 3rem;
}
header {
  
position: fixed;
    height: 105px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    width: 100vw;
    grid-area: 1/1/1/1;
  .header-container {
        /* width: 475px; */
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    background: black;
    display: -webkit-box;
        justify-content: center;
    display: -ms-flexbox;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    // justify-content: space-between;
    display: flex;
    img {
      height: 60px;
      cursor: pointer;
    }
    .links-section {
    // width: 800px;
    display: -webkit-box;
    display: -ms-flexbox;
        align-items: center;
    display: flex;
    -webkit-box-pack: space-evenly;
    -ms-flex-pack: space-evenly;
    justify-content: space-evenly;
        height: 100%;
      a {
        color: white;
        margin: 10px;
        font-size: 22px;
        text-decoration: none;
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
      }
    }
  }
}
</style>
