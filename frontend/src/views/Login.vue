<template>
  <section>
    <div class="page-container">
      <div class="bcg">
        <div class="container">
          <div class="login-modal center-column" :class="{'wrong-credent': wrongCredent }">
            <div class="content">
              <h1>Login</h1>
              <div class="inputs center-column">
                <input
                  type="text"
                  name
                  id
                  placeholder="Email"
                  v-model="loginDetails.email"
                  @keyup.enter="login"
                >
                <input
                  @keyup.enter="login"
                  type="password"
                  placeholder="Password"
                  v-model="loginDetails.password"
                >
              </div>
              <div class="login center-column">
                <button
                  :class="{'wrong-credent': wrongCredent }"
                  @click="login"
                  @keyup.enter="login"
                >Login</button>
                <p @click="route">or Sign up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      loginDetails: {
        email: "",
        password: ""
      },
      wrongCredent: false
    };
  },
  methods: {
    async login() {
      let login = await this.$store.dispatch("loginUser", this.loginDetails);
      if (login._id) {
        this.mail = "";
        this.password = "";
        this.$emit("logged-in");
        this.$router.push("/");
      } else {
        this.wrongCredent = true;
        setTimeout(() => (this.wrongCredent = false), 800);
      }
    },
    route() {
      this.$emit("toggleModal");
      this.$router.push("/signup");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  top: 200px;
  .login-modal {
    position: absolute;
    top: 40%;
    width: 300px;
    height: 240px;
    right: 10%;
    background-color: white;
    border-radius: 2px;
    border: 1px solid lightgray;
    box-shadow: 0 0 8px 0px #c0c4cc;
    transition: 0.3s;
    margin:0 auto;

    .content {
      h1 {
        text-align: center;
      }
    }
    .inputs {
      margin-top: 20px;
      input {
        height: 35px;
        width: 250px;
        border-radius: 2px;
        border: 1px solid lightgray;
        outline: 0;
        padding-left: 8px;
        margin-bottom: 10px;
      }
      :focus {
        box-shadow: 0 0 3px 1px lightblue;
      }
    }
    .login {
      margin-top: 10px;
      button {
        width: 200px;
        height: 35px;
        border: 0;
        color: white;
        border-radius: 2px;
        background-color: #ffc108;
        font-weight: 500;
        margin: 0;
        margin-bottom: 5px;
        transition: 0.3s;
      }
      button:focus {
        outline: 0;
      }
      button:active {
        background-color: #e2aa05;
      }
      p {
        color: gray;
        font-weight: 500;
      }
      p:hover {
        color: rgb(246, 194, 68);
        cursor: pointer;
      }
    }
  }
}

.wrong-credent {
  box-shadow: 1px 1px 5px rgba(246, 71, 71, 1) !important;
  border: 1px solid red !important;
}

.center-column {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.bcg {
  // position: absolute;
  background-image: url(https://www.apple.com/v/tv/home/g/images/home/apple_tv_plus_image_04__um68d3u24tei_large.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 88vh;
  width: 100vw;
}
</style>
