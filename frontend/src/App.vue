<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './components/header-cmps/AppHeader';
import reset from './reset.css'

export default {
  components: {AppHeader}
}
</script>


<style lang="scss">
</style>
