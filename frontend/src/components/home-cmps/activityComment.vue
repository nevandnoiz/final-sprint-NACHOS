<template>
  <section>
    <div class="container">
      <div class="user">
        <img src alt>
        <p class="user-name">{{userName}}</p>
      </div>

      <div>
        <p class="comment">{{comment.comment}}</p>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  props: ["comment"],
  computed: {
    userName: function() {
      return (
        this.comment.user.name.firstName + " " + this.comment.user.name.lastName
      );
    }
  }
};
</script>



<style lang="scss" scoped>
.container {
    margin-top: 15px;
  .user {
    display: flex;
    align-items: center;
    img {
      min-width: 25px;
      min-height: 25px;
      border: 1px solid gray;
      border-radius: 50%;
    }
    .user-name {
      text-transform: capitalize;
      margin-left: 5px;
      font-weight: 500
    }
  }

  .comment {
    margin-left: 45px;
  }
}
</style>
