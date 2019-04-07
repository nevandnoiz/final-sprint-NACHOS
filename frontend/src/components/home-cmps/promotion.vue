<template>
  <div class>
    <div class="promotion">
      <h1>Join today!</h1>
      <h3>Save your favorite TV shows and get daily updates</h3>
      <h3>Explore and find new TV shows and movies!</h3>
      <h3>Follow your freinds and find out what they are watching</h3>
      <h3>it's free!</h3>
      <button @click="route">Join Now!</button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    route() {
      this.$router.push("/signup");
    }
  }
};
</script>


<style lang="scss" scoped>
.promotion {
  width: 50vw;
  height: 240px;
  background-color: orange;
  border-radius: 8px;
  text-align: center;
  color: white;

  h1 {
    padding-top: 10px;
    font-size: 32px;
    font-weight: 200;
  }

  :nth-child(2) {
    margin-top: 12px;
  }
  h3 {
    margin-top: 6px;
    font-size: 1.2em;
    font-weight: 400;
  }

  button {
    width: 200px;
    height: 35px;
    border: 0;
    color: white;
    border-radius: 2px;
    background-color: #dbdbdb;
    color: #4a4a4a;
    font-weight: 500;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  button:focus {
    outline: 0;
  }
  button:hover {
    color: white;
    background-color: #4a4a4a;
    cursor: pointer;
  }
}
</style>

