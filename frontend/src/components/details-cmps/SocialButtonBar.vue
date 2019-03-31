<template>
                  <div class="icons-container">
              <a 
                target="_blank"
                v-if="item.externalIds.twitter_id"
                :href="`https://twitter.com/${item.externalIds.twitter_id}`" 
              > 
                <i class="fab fa-twitter"></i>
              </a>
               <a 
                 target="_blank"
                v-if="item.externalIds.facebook_id"
                :href="`https://www.facebook.com/${item.externalIds.facebook_id}`" 
               > 
                <i class="fab fa-facebook"></i>
               </a> 
               <a 
                 target="_blank"
                v-if="item.externalIds.instagram_id"
                :href="`https://www.instagram.com/${item.externalIds.instagram_id}`" 
               > 
                <i class="fab fa-instagram"></i>
               </a> 
               <a 
                 target="_blank"
                v-if="item.externalIds.imdb_id"
                :href="`https://www.imdb.com/title/${item.externalIds.imdb_id}`" 
               > 
                <i class="fab fa-imdb"></i>
               </a> 
            </div>
</template>

<script>
export default {
props:['item']
}
</script>

<style scoped>
.fa-instagram {
    color: white
}
.fa-facebook{
    color: white
    /* background-color: white */
}
.fa-imdb {
    color: white
}

.fa-twitter {
    color:white
}
.icons-container {
      width: 100%;
    display: flex;
    justify-content: flex-end;
    z-index: 35;
     /* background: black; */
       /* background: black; */
}
i{
        font-size: 1.3rem;
    padding: 0.5rem 0;
    margin: 0 0.3rem;
}


@media only screen and (max-width: 750px) { 


i{
  font-size: 2rem;
  /* color: black !important; */
}


}
</style>
