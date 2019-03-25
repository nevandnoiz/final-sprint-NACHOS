<template>
  <div class="review-container">
    <img src="https://via.placeholder.com/185.jpg">
    <div class="review-text">
      <section>
        <h1>A Review by {{review.author}}</h1>
        <h2>Writted by{{review.author}} in 01 in March 2019</h2>
      </section>

      <p>{{review.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["review"],
  data() {
    return {};
  }
};
</script>

<style scoped>
section {
  margin-bottom: 10px;
}
section > h1 {
  font-size: 1.6rem;
}
section > h2 {
  font-size: 1.2rem;
}
.review-container {
  margin: 25px auto;
  display: flex;
  width: 60%;
}
.review-text {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}



@media only screen and (max-width: 850px) {
section {
  margin-bottom: 10px;
}
section > h1 {
  font-size: 1.6rem;
}
section > h2 {
  font-size: 1.2rem;
}
.review-container {
  margin: 25px auto;
  display: flex;
  width: 60%;
}
.review-text {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}




  
}
</style>