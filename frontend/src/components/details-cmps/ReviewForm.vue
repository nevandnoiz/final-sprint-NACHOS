<template>
  <section v-if="setReview">
    <div class="review-form-container">
      <el-input type="textarea" autosize placeholder="Name" v-model="textarea2"></el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Text"
        v-model="textarea3"
      ></el-input>
      <button>send</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      textarea2: "",
      textarea3: "",
      setReview: true
    };
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



@media only screen and (max-width: 850px) {


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

  
}
</style>
