<template>
  <div class="login-modal center-column">
    <div class="content">
      <h1>Login</h1>
      <div class="inputs center-column">
        <input type="text" name id placeholder="Email" v-model="mail">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="login center-column">
        <button @click="login">Login</button>
        <p @click="route">or Sign up</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mail: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$emit("login", { mail: this.mail, password: this.password });
      this.$router.push("/");
      this.mail = "";
      this.password = "";
    },
    route() {
      this.$router.push("/signup");
      this.$emit("toggleModal");
    }
  }
};
</script>


<style lang="scss" scoped>
.login-modal {
  
  position: absolute;
  top: 104px;
  width: 300px;
  height: 240px;
  right: 40px;
  background-color: white;
  border-radius: 2px;
  border: 1px solid lightgray;
  box-shadow: 0 0 8px 0px #c0c4cc;

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

.center-column {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>

