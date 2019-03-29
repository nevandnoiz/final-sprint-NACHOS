<template>
  <section>
    <div class="section-div-main-container">


    <!-- <div class="nav-bar-filler"></div> -->
    <!-- <pannel-heading :title="'Header'" :dominantColor="'#2d2d2d'" class="nav-bar-filler"></pannel-heading> -->
<!-- ['dominantColor','title'] -->
<div class="nav-bar-filler">
<h1>Known for</h1>
</div>





    <div class="actor-detalis-main-container">
      <h1>Hello</h1>
      <div class="biography-container">
        <div class="text-container">
          <h1>{{actor.name}}</h1>
          <div class="bio">
            <h2>Biography</h2>
            <p>{{actor.biography}}</p>
          </div>
        </div>

        <div class="actors-movies-container">
          <div v-for="(movie, index) in actorMovies.cast" :key="index" class="movie-img-container">
            <img :src="`http://image.tmdb.org/t/p/w300${movie.poster_path}`">
          </div>
        </div>
      </div>

      <div class="personal-info-container">
        <img :src="`http://image.tmdb.org/t/p/w300${actor.profile_path}`">
        <div v-if="actor" class="personal-info">
          <h1>Personal Info</h1>
          <div class="info">
   <h3>Known for:</h3>
          <p>{{actor.known_for_department}}</p>
          </div>
       
          <div class="info">
            <h2>Gender</h2>
            <p>{{actor.gender}}</p>
          </div>

          <div class="info">
            <h2>Birthday</h2>
            <p>{{actor.birthday}}</p>
          </div>
          <div class="info">
            <h2>Place of Birth</h2>
            <p>{{actor.place_of_birth}}</p>
          </div>
          <div class="info">
            <h2 v-if="actor.homepage">Official Site</h2>
            <p v-if="actor.homepage">{{actor.homepage}}</p>
          </div>
        </div>
      </div>
    </div>

    </div>
  </section>
</template>

<script>
import PannelHeading from "@/components/general-cmps/PannelHeading.vue"
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
  },
  components: {
    PannelHeading
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Arvo");

body {
  background: #e4e4e4;
}
section {
  background: linear-gradient(to bottom right, #eee, #fff);
}
.section-div-main-container {
      padding-top: 2rem;
}
h1 {
  color: black;
  font-size: 1.5rem
}
h2 {
  color: black;
  font-size: 1.2rem;
  font-weight: 700;
}
p {
  color: black;
  font-size: 1.2rem;
}
.info {
  margin: 1.7rem 0
}
.personal-info {
  
      margin-top: 2rem;
   padding-right: 2rem;
}
.personal-info-container {
  grid-column: 1;
  z-index: 3;
  grid-row: 1;
}
.actor-detalis-main-container {
  grid-template-columns: 300px 1fr;
  /* background: */
  z-index: 2;
  display: grid;
  width: 75vw;
  margin: 0 auto;
  /* display: grid; */
  /* grid-template-columns: 15vw 1fr 1fr 15vw; */
  /* grid-template-rows: 700px 1fr 1fr; */
}
.bio {
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 180px;
}
.biography-container {
  flex-direction: column;
  /* padding-left: 2rem; */
  display: flex;
  grid-column: 2;
  grid-row: 1;
  /* grid-column: 3; */
  /* grid-row: 1; */
  width: 52vw;
  z-index: 2;
  /* margin: 0 auto; */
}
.text-container {
      background: white;
  display: flex;
  height: 355px;
  padding-top: 2rem;
  padding-left: 2rem;
  flex-direction: column;
}
.actors-movies-container {
  display: grid;
  /* grid-row: 2; */
  /* grid-column: 1/333; */
      padding: 2rem;
    background: white;
  grid-template-columns: repeat(4, 1fr);
  /* width: 50vw; */
  margin: 0 auto;
  gap: 0.5rem;
}
.personal-info-container>img {
/* border-radius: 5px */
}
.nav-bar-filler {
      display: flex;
    align-items: center;
  z-index: 3;
  background: #2d2d2d;
  /* height: 70px; */
  position: absolute;
  top: 435px;

  width: 100vw;
}

.nav-bar-filler>h1 {
    height: 100%;
       font-family: Arvo;

    padding:  0 1rem;
    display: flex;
    margin-left: 32rem;
    /* padding-left: 30rem; */
    background-color: white;
    align-items: center;
}
</style>
