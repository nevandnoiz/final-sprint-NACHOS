<template>
  <div class="details">
    <h1>Nachos details</h1>
    <div class="movie-container">
      <img :src="movie.img.poster">
      <div class="movie-details">
        <h1>{{movie.details.title}}</h1>
        <h4>Release date: {{movie.details.release_date}}</h4>
        <p>{{movie.details.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['movie'],
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.movie-container {
  margin: 10% auto;
  border-radius: 5px;
  padding: 20px;
  max-width: 60%;
  background-color: lightslategray;
  display: flex;
}
.movie-container > img {
  margin-right: 20px;
}
.movie-details {
  display: flex;
  flex-direction: column;
}
.movie-details > p {
  margin-top: 20px;
}
</style>
