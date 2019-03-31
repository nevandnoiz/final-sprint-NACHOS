<template>
  <section>
    <div class="page-container">
      <div class="bcg">
        <div class="container">
          <div class="sign-up">
            <div class="head">
              <h4>There`s always something to watch</h4>
              <p>Join us now - it's free.</p>
            </div>
            <section class="form">
              <label for="first-name">First name</label>
              <input type="text">
              <label for="last-name">Last name</label>
              <input type="text">
              <label for="email">Email</label>
              <input type="email">
              <label for="password">password</label>
              <input type="password">
              <span>By clicking Join now, you agree to the Nachos User Agreement, Privacy Policy, and Cookie Policy.</span>
              <button @click="route">Join now</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  methods: {
    route() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.bcg {
  position: absolute;
  background-image: url(https://www.apple.com/v/tv/home/g/images/home/apple_tv_plus_image_04__um68d3u24tei_large.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
}
.container {
  top: 200px;
  .sign-up {
    width: 400px;
    margin: 0 auto;
    border-radius: 2px;
    background: rgb(237, 240, 243);
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);

    @media (max-width: 450px) {
      width: 90vw;
    }
    @media (max-width: 400px) {
      width: 100%;
    }
    .head {
      background-color: rgb(246, 248, 250);
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      h4 {
        padding-top: 20px;
        text-align: center;
        font-size: 23px;
        color: black;
        font-weight: 100;
      }
      p {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: black;
        padding-top: 5px;
        padding-bottom: 20px;
      }
    }
    .form {
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 24px;
      display: flex;
      flex-flow: column;
      :first-child {
        margin-top: 16px;
      }
      label {
        margin-top: 8px;
        margin-bottom: 4px;
        color: black;
      }
      input {
        margin: 0;
        padding-left: 8px;
        height: 32px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.15);
      }
      span {
        font-size: 12px;
        line-height: 1.33333;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        text-align: center;
        display: block;
        margin-top: 16px;
        margin-bottom: 16px;
      }
      button {
        height: 42px;
        font-size: 20px;
        border: 0;
        color: white;
        border-radius: 2px;
        background-color: #ffc108;
        font-weight: 500;
        margin: 0;
        outline: 0;
        transition-duration: 165ms;
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
      button:hover {
        background-color: #e4ae0d;
      }
    }
  }
}
</style>

<style scoped>
/* #app {
  display: block;
} */
/* 
.search-bar-container {
  display: none;
} */
</style>
