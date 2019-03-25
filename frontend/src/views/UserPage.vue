<template>
  <div class="user-container" v-if="user">
    <div class="user-section">
      <img :src="profilePicture" alt>
      <div class="user-info">
        <h1>{{user.name.firstName}} {{user.name.lastName}}</h1>
        <h2>Email: {{user.email}}</h2>
        <h2>Following:</h2>
      </div>
      <button>Edit</button>
    </div>
    <h1>Favorites:</h1>
    <div class="list-section">
      <div v-for="(favorite, index) in user.lists[0].items" :key="index">
         <item-preview :item="favorite"></item-preview>
      </div>
    </div>
    <h1>Watch-List:</h1>
    <div class="list-section">
      <div v-for="(watch, index) in user.lists[1].items" :key="index">
         <item-preview :item="watch"></item-preview>
      </div>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";
import ItemPreview from "@/components/ItemPreview.vue";

export default {
  components: {
    ItemPreview
  },
  data() {
    return {
      user: this.user
    };
  },
  async created() {
    let user = await this.$store.dispatch("loadUser");
    this.user = user;
  },
  computed: {
    profilePicture() {
      if (!this.user.img)
        return "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-3.png";
    }
  },
  methods: {
    imgURL(posterPath) {
      return UtilityService.imgURL(posterPath, 185);
    }
  }
};
</script>


<style lang="scss" scoped>
h1 {
  font-weight: strong;
  font-size: 30px;
  text-decoration: underline;
}
.user-container {
  padding: 0 30px;
  .user-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 150px;
      border-radius: 50%;
      border: 1px solid darkslategray;
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
  }
}
.list-section {
  display: flex;
  div{
    margin-right:15px;
  }
}
</style>
