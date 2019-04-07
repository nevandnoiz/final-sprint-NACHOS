<template>
  <!--Navbar-->
  <nav class="navbar navbar-light light-blue lighten-4">
    <div class="logo-contaier">
      <img @click="pushToHome" src="@/imgs/Nachos-icon.svg" alt="App-Logo">
    </div>
    <button
      ref="hamburger"
      class="navbar-toggler toggler-example"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent1"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="dark-blue-text">
        <i class="fas fa-bars fa-1x"></i>
      </span>
    </button>
    <!-- Navbar brand -->
    <!-- <a class="navbar-brand" href="#">Navbar</a> -->

    <!-- Collapse button -->

    <!-- Collapsible content -->
    <div v-if="isExpanded" class="collapse navbar-collapse" id="navbarSupportedContent1">
      <!-- Links -->
      <ul class="navbar-nav mr-auto">
        <li>
          <search-bar1 class="search-bar"></search-bar1>
        </li>
        <div class="links-hamburger-inside">
          <li class="nav-item active">
            <router-link to="/actors">ACTORS</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/movies">MOVIES</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tv">TV SHOWS</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login">LOGIN</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup">SIGNUP</router-link>
          </li>
        </div>
      </ul>
      <!-- Links -->
    </div>
    <!-- Collapsible content -->
  </nav>
  <!--/.Navbar-->
</template>

<script>
import SearchBar1 from "./SearchBar1.vue";
import { eventBus } from "@/main.js";

export default {
  components: {
    SearchBar1
  },
  data() {
    return {
      isExpanded: true
    };
  },
  methods: {
    pushToHome() {
      this.$router.push("/");
    },
    toggleModal() {
      eventBus.emit("signed");
    }
  },
  created() {
    const fnmap = {
      toggle: "toggle",
      show: "add",
      hide: "remove"
    };
    let selector = this.$refs.hamburger;
    const collapse = (selector, cmd) => {
      const targets = Array.from(document.querySelector(selector));
      targets.forEach(target => {
        target.classList[fnmap[cmd]]("show");
      });
    };
  },
  watch: {
    $route(to, from) {
      this.isExpanded = false;
      setTimeout(() => (this.isExpanded = true), 300);
    }
  }
};
</script>

<style scoped>
.links-hamburger-inside {
  /* margin-top: 0.6rem; */
}
.nav-item {
  border-bottom: 1px solid #f57f16;
  padding: 0.3rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
}
.nav-item > a {
  color: #f57f16;
}
.fa-bars {
  color: white;
}
.navbar-toggler {
  height: 36px;
  outline: none;
  padding: 0;
  font-size: 31px;
}
.dark-blue-text {
  color: black;
}
nav > * {
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
.search-bar {
  max-width: 500px;
  flex-grow: 1;
}
</style>
