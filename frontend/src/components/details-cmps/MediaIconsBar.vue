<template>
  <section>
    <!-- <div class="icons-container"> -->
      <!-- <div class="netflix-icon"> -->
        <a  v-if="netflix" :href="netflix"><img class="netflix" src="@/imgs/logos/netflix.svg"></a>
        <img  class="amazon" src="@/imgs/logos/amazon.svg">
        <!-- <img src="@/imgs/logos/amazon.eps"> -->
      <!-- </div> -->
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  props: ['watchLinks'],
  created() {
    console.log('i got the itme!',this.watchLinks )
  },
  computed: {
    netflix(){
      // console.log(this.watchLinks.locations.filter(res=>res.display_name === 'Netflix')[0].url)
      return this.watchLinks.locations.filter(res=>res.display_name === 'Netflix')[0].url
    }
  },
};
</script>

<style scoped>
.amazon{
       padding: 5px;
    border-radius: 5px;
    background-color: white; 
}
.netflix{
    margin: 0 5px;
           padding: 5px;
    border-radius: 5px;
    background-color: black; 
}




</style>
