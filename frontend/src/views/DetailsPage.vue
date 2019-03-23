<template>
  <section v-if="movie.details && dominantColor">
    <item-container v-if="this.movie.details" :item="movie" :dominantColor="dominantColor"></item-container>
    
    <!-- <div class="reviews-container">
      <review-container
        v-for="(review, index) in movie.reviews.results"
        :key="index"
        :review="review"
      ></review-container>
    </div>
    <review-form></review-form> -->

    <!-- <i class="fab fa-facebook"></i> -->
  </section>
</template>

<script>
import UtilityService from '@/services/UtilityService.js'
import ItemContainer from "../components/details-cmps/ItemContainer.vue";
import NavBar from "../components/details-cmps/NavBar.vue";
import ReviewContainer from "../components/details-cmps/ReviewContainer.vue";
import ReviewForm from "../components/details-cmps/ReviewForm.vue";
import clr from '@/services/average-color.js'

export default {
  data() {
    return {
      dominantColor: null,
      movie: {
        details: null,
        videos: null,
        credits: null,
        reviews: null,
        externalIds: null
      }
    };
  },

  async created() {
   
    // console.log($)
    console.log(UtilityService);
    this.getMovieDetails();
    

    this.movie.reviews = {
      id: 297761,
      page: 1,
      results: [
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        },
        {
          id: "57a814dc9251415cfb00309a",
          author: "NeoBrowser",
          score: "8",
          content:
            "Brooking no argument, history should quickly regard Peter Jackson’s The Fellowship Of The Ring as the first instalment of the best fantasy epic in motion picture history. This statement is worthy of investigation for several reasons.\r\n\r\nFellowship is indeed merely an opening salvo, and even after three hours in the dark you will likely exit the cinema.",
          url: "https://www.themoviedb.org/review/57a814dc9251415cfb00309a"
        }
      ]
    };
  },
  destroyed() {
    domcolor = null;
    this.$store.commit("setSelectedItem", null);
  },
  methods: {
    setDominantColor() {
      // Check if color background is light and convert it to darker
      // if (UtilityService.lightOrDark(domcolor) === "light")domcolor = `#${UtilityService.LightenDarkenColor(domcolor.replace(/#/gm, ""),-60)}`;
      this.dominantColor = domcolor;
      // document.querySelectorAll('body')[0].style.background =  `-webkit-linear-gradient(top, ${UtilityService.hexToRgb(domcolor,0.1)}, rgba(255,255,255, 1))`
    },
    getDominantColor() {
              console.log('go!!')
     clr.domColor(`http://image.tmdb.org/t/p/w92${this.movie.details.poster_path}`)
    },
    async getMovieDetails() {
      let details = this.$store.getters.selectedItem;
      const movieId = this.$route.params.movieId;
      if (details)
        console.log("movie details IS on storage doesnt get from API");
      if (!details) {
        console.log("movie details not in sotrage GETTING FROM API");
        details = await this.$store.dispatch("getMovieDetails", movieId);
      }
      const externalIds = await this.$store.dispatch("getMovieExternalIds",movieId);
      const movieCredits = await this.$store.dispatch("getMovieCredits",movieId);
      const movieVideos = await this.$store.dispatch("getMovieVideos", movieId)
      const tvShowTest = await this.$store.dispatch("getTvShowWatchLinksByKeyword", 'prison break')
      console.log(tvShowTest)
      console.log('movie videos are:', movieVideos)
      this.movie.videos = movieVideos
      this.movie.credits = movieCredits;
      this.movie.externalIds = externalIds;
      this.movie.details = details;
      console.log(this.movie.credits);

      this.getDominantColor();
      setTimeout(() => {
        this.setDominantColor()
      }, 500);
      
    }
  },
  components: {
    ItemContainer,
    ReviewContainer,
    ReviewForm,
    NavBar
  },
  watch: {
    domcolor: function() {
      console.log('DOM HAS WATCHED AND CHANGED')
    },
    "$route.params.movieId": function() {
      console.log("route movie id");
      this.getMovieDetails();
    }
  }
};
</script>

<style scoped>

.reviews-container {
  display: block
}
</style>