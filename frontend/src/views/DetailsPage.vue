<template>
  <div class="details">
    <h1>Nachos details</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
movieDetails:null
    }
  },
  components: {
    
  },
   async created() {
    //  const movieId = this.$route.params.movieId
    const movieId=297802
   const details = await this.$store.dispatch("getDetailsById",movieId);
    this.movieDetails=details
  },
}
</script>
