<template>
  <section class="form-section-review" v-if="setReview">
    <el-rate class="rating" v-model="review.rating"></el-rate>

    <div class="name-main-container">
      <b-field horizontal label="Name" type="is-danger">
        <b-input name="name" v-model="review.author" expanded></b-input>
      </b-field>
    </div>

    <div class="main-text-container">
      <b-field horizontal label="Content">
        <b-input v-model="review.content" type="textarea"></b-input>
      </b-field>
      <b-field horizontal>
        <!-- Label left empty for spacing -->
        <p class="control">
          <button @click="onSendReview()" class="button is-primary">Send message</button>
        </p>
      </b-field>
    </div>

    <!-- 
    <div class="review-form-container">
      <el-input type="textarea" autosize placeholder="Name" v-model="review.author"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Text"
        v-model="review.content"
      ></el-input>
      <div class="block">
        <span class="demonstration">Default</span>
        
    </div>-->
    <!-- <button @click="$emit('addReview',review)">Send</button> -->
    <!-- </div> -->
  </section>
</template>


<script>
export default {
  props: ["type", "itemId"],
  data() {
    return {
      review: {
        id: "123",
        author: "",
        rating: 0,
        content: ""
      },
      setReview: true
    };
  },
  methods: {
    onSendReview() {
      this.review.date = Date.now();
      this.$emit("addReview", this.review);
      this.review = {
        id: "123",
        author: "",
        rating: 0,
        content: ""
      };
    }
  }
};
</script>

<style>
.rating {
  display: flex;
  justify-content: flex-end;
  grid-column: 2;
  margin-bottom: 0.9rem;
}
.main-text-container {
  grid-column: 1/3;
}
.name-main-container {
  margin-bottom: 1rem;
  grid-column: 1/3;
}
.form-section-review {
  width: 80%;
  margin: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.field.is-horizontal {
  grid-column: 1/2;
}
.el-rate__icon {
  font-size: 1.3rem;
}
.name-rating-container {
}
.review-form-container {
  margin: 120px auto;
  width: 60%;
  border-radius: 10px;
  background-color: lightgray;
  padding: 25px;
}
button {
  height: 30px;
  margin: 15px 0;
}
</style>
