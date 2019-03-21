<template>
  <div class="details">
    <!-- <h1>Nachos details</h1> -->
    <div class="movie-container">
      <img :src="imgURL">
      <div class="movie-details">
        <div class="details-text">
          <h1>{{movie.details.title}}</h1>
           <!-- <a href="//www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a> -->
          <!-- <h4>Release date: {{movie.details.release_date}}</h4> -->
          <p>{{movie.details.overview}}</p>
        </div>
        <div class="icons-container">
          <a target="_blank" v-if="movie.externalIds.twitter_id" :href="`https://twitter.com/${movie.externalIds.twitter_id}`"><i class="fab fa-twitter"></i></a>
          <a target="_blank" v-if="movie.externalIds.facebook_id" :href="`https://www.facebook.com/${movie.externalIds.facebook_id}`"><i class="fab fa-facebook"></i></a>
          <a target="_blank" v-if="movie.externalIds.instagram_id" :href="`https://www.instagram.com/${movie.externalIds.instagram_id}`"><i class="fab fa-instagram"></i></a>
          <a target="_blank" v-if="movie.externalIds.imdb_id" :href="`https://www.imdb.com/title/${movie.externalIds.imdb_id}`"><i class="fab fa-imdb"></i></a>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UtilityService from '@/services/UtilityService.js';

export default {
  props: ["movie"],
  computed: {
    imgURL() {
      return UtilityService.imgURL(this.movie.details.poster_path,185)
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  color:inherit;
  text-decoration: none;
 }
 iframe {
  width: 80vw;
  height: 80vw;
 }
.movie-container {
  margin: 10% auto;
  border-radius: 5px;
  padding: 20px;
  max-width: 60%;
  background-color: lightslategray;
  display: flex;
}
.icons-container > * {
  font-size: 2rem;
  margin: 0 0.5rem;
}
.icons-container > *:hover {
  cursor: pointer;
}
.details-text > * {
  margin: 5px 0;
}
.movie-container > img {
  margin-right: 20px;
}
.movie-details {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.movie-details > p {
  margin-top: 20px;
}
</style>
