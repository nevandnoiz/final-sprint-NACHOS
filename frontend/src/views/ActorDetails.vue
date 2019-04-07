<template>
  <section v-if="actor && actorMovies">
    <div class="section-div-main-container">
      <!-- <div class="nav-bar-filler"></div> -->
      <!-- <pannel-heading :title="'Header'" :dominantColor="'#2d2d2d'" class="nav-bar-filler"></pannel-heading> -->
      <!-- ['dominantColor','title'] -->
      <div class="nav-bar-filler">
        <h1>Known for</h1>
      </div>

      <div class="actor-detalis-main-container">
        <div class="personal-info-container">
          <img :src="`http://image.tmdb.org/t/p/w300${actor.profile_path}`">
          <div v-if="actor" class="personal-info">
            <h1 class="actor-name">{{actor.name}}</h1>
            <!-- <h1 class="info">Personal Info</h1> -->
            <div class="info">
              <h2>Known for:</h2>
              <p>{{actor.known_for_department}}</p>
            </div>

            <div class="info">
              <h2>Gender</h2>
              <p>{{gender}}</p>
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
        <div class="biography-container">
          <div class="text-container">
            <div class="bio">
              <h2>Biography</h2>
              <p>{{actor.biography}}</p>
            </div>
          </div>

          <div class="nav-bar-filler-mobile">
            <h1>Known for</h1>
          </div>

          <div class="actors-movies-container">
            <div
              v-for="(movie, index) in actorMovies.cast"
              :key="index"
              class="movie-img-container"
            >
              
              <img :src="`http://image.tmdb.org/t/p/w300${movie.poster_path}`">
              <h4>{{movie.original_title}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PannelHeading from "@/components/general-cmps/PannelHeading.vue";
import UtilityService from "@/services/UtilityService.js";
export default {
  data() {
    return {
      actor: null,
      actorMovies: null
    };
  },
  async created() {
    const actorId = this.$route.params.actorId;
    const actor = await this.$store.dispatch("getActorDetails", actorId);
    this.actor = actor;
    var actorMovies = await this.$store.dispatch(
      "getActorMovieCredits",
      actorId
    );
    this.actorMovies = actorMovies;
    // console.log(actorMovies)
  },
  computed: {
    gender() {
      return this.actor.gender === 2 ? "Male" : "Female";
    }
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
  font-size: 1.5rem;
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
.nav-bar-filler-mobile {
  display: none;
}
.actor-name {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    font-weight: 700;
}
.bio>h2 {
  margin-bottom: 1rem;
}
.info {
  margin: 1.7rem 0;
}
.movie-img-container{
    text-align: center;
}

.movie-img-container>img{
  border-radius: 8px;
  /* justify-self: baseline; */

    height: 195px;
}
.personal-info {
  /* margin-top: 2rem; */
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
  padding-right: 1rem;
      padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* height: 180px; */
}
.biography-container {
  flex-direction: column;
  /* padding-left: 2rem; */
  display: flex;
  grid-column: 2;
  grid-row: 1;
  /* grid-column: 3; */
  /* grid-row: 1; */
  /* width: 52vw; */
  z-index: 2;
  /* margin: 0 auto; */
}
.text-container {
  background: white;
  display: flex;
  /* height: 355px; */
  height: 315px;
  overflow: scroll;
  /* padding-top: 2rem; */
  padding-left: 2rem;
  flex-direction: column;
}
.movie-img-container>h4 {
 font-size: 0.8rem;
    color: black;
    /* width: 100%; */
    font-weight: 700;
    margin-top: 0.3rem;
}
.actors-movies-container {
     display: grid;
    padding: 2rem;
    background: white;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    row-gap: 2rem;
    column-gap: 0.7rem;
    margin-top: 2rem;
}
.personal-info-container > img {
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

.nav-bar-filler > h1 {
  height: 100%;
  font-family: Arvo;

  padding: 0 1rem;
  display: flex;
  margin-left: 32rem;
  /* padding-left: 30rem; */
  background-color: white;
  align-items: center;
}
@media only screen and (max-width: 1090px) {
.movie-img-container>img{
  justify-self: center;

}
}

@media only screen and (max-width: 786px) {
  .actor-detalis-main-container {
    /* grid-template-columns: 35vw 1fr; */
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  .nav-bar-filler {
    display: none;
  }
  .nav-bar-filler-mobile {
    display: flex;
    align-items: center;
    z-index: 3;
    /* margin-top: 1.2rem; */
    background: #2d2d2d;
    /* height: 70px; */
    /* position: ; */
    top: 435px;

    width: 100%;
  }
  .nav-bar-filler-mobile > h1 {
    height: 100%;
    font-family: Arvo;

    padding: 0 1rem;
    display: flex;
    margin-left: 3.5rem;
    /* padding-left: 30rem; */
    background-color: white;
    align-items: center;
  }
  .actors-movies-container > img {
    width: 35vw;
  }
  .biography-container {
    width: auto;
  }
  .text-container {
    height: auto;
    overflow: auto;
    /* padding: 2rem; */
    padding-bottom: 1.5rem;
  }
  .personal-info-container {
    display: flex;
    flex-direction: column;
  }
  .personal-info-container > img {
    /* height: 568px; */
    margin: 0 auto;
        width: 90vw;
  }
  .personal-info {
    padding-right: 2rem;
        width: 90vw;
    margin: 1rem auto;
  }
  .info {
    margin: 0.4rem;
  }
}
</style>
