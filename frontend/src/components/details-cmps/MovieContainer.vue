<template>
  <div class="details">
   
    <div v-if="isTrailer">
        <youtube class="youtube-container" :video-id="this.movie.videos.results[0].key" player-vars="{ autoplay: 1 }"></youtube>
    </div>

    <!-- <h1>Nachos details</h1> -->
    <div v-if="!isTrailer" class="detalis-sections">
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
          <i @click="onTrailer" class="far fa-play-circle"></i>
          <a
            target="_blank"
            v-if="movie.externalIds.twitter_id"
            :href="`https://twitter.com/${movie.externalIds.twitter_id}`"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a
            target="_blank"
            v-if="movie.externalIds.facebook_id"
            :href="`https://www.facebook.com/${movie.externalIds.facebook_id}`"
          >
            <i class="fab fa-facebook"></i>
          </a>
          <a
            target="_blank"
            v-if="movie.externalIds.instagram_id"
            :href="`https://www.instagram.com/${movie.externalIds.instagram_id}`"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            target="_blank"
            v-if="movie.externalIds.imdb_id"
            :href="`https://www.imdb.com/title/${movie.externalIds.imdb_id}`"
          >
            <i class="fab fa-imdb"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
   <button v-if="isTrailer" @click="onTrailer">Trailer</button>
    </div>
</template>
<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  data() {
    return {
      isTrailer: false
    }
  },
  props: ["movie"],
  methods: {
    onTrailer() {
      console.log('on trailer click')
      this.isTrailer = !this.isTrailer
    }
  },
  computed: {
    imgURL() {
      return UtilityService.imgURL(this.movie.details.poster_path, 185);
    }
  }
};
</script>

<style scoped>
button {
  position: relative;
}
* {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
iframe {
  width: 80vw;
  height: 80vw;
}
.movie-container {
  margin: 50px auto 0 auto;
  border-radius: 5px;
  padding: 70px;
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
.details {
  background-color: lightslategray;
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

.youtube-container {
  /* position: fixed; */
  right: 0;
  left: 0;
  top: 10vw; 
   margin: 50px auto 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 50px;
  background-color:lightgray;
}
</style>
