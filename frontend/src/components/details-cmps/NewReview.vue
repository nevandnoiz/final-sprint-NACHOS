<template>
  <section>
    <div class="container new-review-container" :ref="id">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid">
              <p class="text-secondary text-center">15 Minutes Ago</p>
            </div>
            <div class="col-md-10">
              <div class="card-review-header">
                <h2 v-if="!review.user_id">
                  <strong>{{review.author}}</strong>
                </h2>
                <a v-else href="#">
                  <strong>{{review.author}}</strong>
                </a>

                <div class="stars">
                  <span v-for="(star, index) in 5" :key="index" class="float-right">
                    <i :class="{ nostar: isGrey(index) }" class="text-warning fa fa-star"></i>
                  </span>
                </div>
              </div>

              <!-- <p>
        	            <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>    	            

              </p>-->
              <div class="clearfix"></div>
              <p>{{review.content}}</p>
              <p>
                <a class="float-right btn text-white btn-danger">
                  <i class="fa fa-heart"></i> Like
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  props: ["review", "reviewIdx"],
  created() {
    eventBus.$on("finishAddReview", this.goto);
  },
  computed: {
    id() {
      return `review-${this.reviewIdx + 1}`;
    }
  },
  data() {
    return {
      isNewReview: false
    };
  },
  methods: {
    isGrey(index) {
      if (index >= this.review.rating) return true;
    },
    goto() {
      let ref = `review-${this.reviewIdx + 1}`;
      let element = this.$refs[ref];
      let top = element.offsetTop;

      window.scrollTo(0, top);
    }
  }
};
</script>

<style scoped>

h2 {
  font-weight: 700;
}
.card-review-header {
  justify-content: space-between;
  margin-bottom: 1rem;
  display: flex;
}
.nostar {
  opacity: 0.32;
  color: gray !important;
}
.stars {
  display: flex;
}
.new-review-container {
  width: auto !important;
  width: auto !important;
  padding: 20px;
  /* max-width: 51vw !important; */
}
.card-inner {
  display: none;
  margin-left: 4rem;
}
@media only screen and (max-width: 767px) { 
.img-fluid{
  width: 20% !important;
}
}


</style>
