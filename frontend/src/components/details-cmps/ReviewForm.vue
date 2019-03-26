<template>
  <section v-if="setReview">
    <div class="review-form-container">
      <el-input type="textarea" autosize placeholder="Name" v-model="review.author"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Text"
        v-model="review.content"
      ></el-input>
      <button @click="$emit('addReview',review)">Send</button>
    </div>
  </section>
</template>


<script>
export default {
  props:['type','itemId'],
  data() {
    return {
      review: {
        id: "123",
        author: "",
        rating:3.5,
        content: ""
      },
      setReview: true
    };
  },
  methods:{
  }
};
</script>

<style scoped>
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
