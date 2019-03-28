<template>
  <section>
    <h1>Hello</h1>
    <div class="biography-container">
      <img :src="`http://image.tmdb.org/t/p/w300${actor.profile_path}`">
      <div class="text-container">
        <h1>{{actor.name}}</h1>
        <h2>Biography</h2>
        <p>{{actor.biography}}</p>
      </div>
    </div>
    <div class="nav-bar-filler"></div>
    <div v-if="actor" class="personal-info">
      <h1>Personal Info</h1>

      <h2>Known for:</h2>
      <p>{{actor.known_for_department}}</p>

      <h2>Gender</h2>
      <p>{{actor.gender}}</p>

      <h2>Birthday</h2>
      <p>{{actor.birthday}}</p>
      <h2>Place of Birth</h2>
      <p>{{actor.place_of_birth}}</p>
      <h2 v-if="actor.homepage">Official Site</h2>
      <p v-if="actor.homepage">{{actor.homepage}}</p>
    </div>
    <div class="actors-movies-container">
      <div v-for="(movie, index) in actorMovies.cast" :key="index" class="movie-img-container">
        <img :src="`http://image.tmdb.org/t/p/w300${movie.poster_path}`">
      </div>
    </div>
  </section>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
export default {
  data() {
    return {
      actor: null,
      actorMovies: null
    };
  },
  async created() {
    console.log("hey");

    var actor = await this.$store.dispatch("getActorDetails", "5081");
    this.actor = actor;
    var actorMovies = await this.$store.dispatch(
      "getActorMovieCredits",
      "5081"
    );
    this.actorMovies = actorMovies;
    // console.log(actorMovies)
    console.log(this.actor);
    console.log(this.actorMovies);
  }
};
</script>

<style scoped>
h1{
  font-size: 2.2 srem;
}
p {
  font-size: 1.2rem;
}
.biography-container{
      display: flex;
    width: 70vw;
    margin: 0 auto;
}
.text-container {
  display: flex;
  padding-left: 2rem;
  flex-direction: column;
  width: 327px;
}
.actors-movies-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 50vw;
  margin: 0 auto;
  gap: 0.5rem;
}
.nav-bar-filler {
  height: 70px;
  background-color: black;
}
</style>
