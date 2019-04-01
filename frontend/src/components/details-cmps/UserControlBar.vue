<template>
  <section>
    <div class="control-bar">
      <i @click="playTrailer" class="far fa-play-circle"></i>
      <div class="user-control-btns" v-if="currUser">
        <el-tooltip class="item" effect="dark" content="Watch List" placement="bottom">
          <i
            @click="toggleWatchList"
            class="fas fa-list-ul"
            :class="{'on-watch-list': isOnWatchList}"
          ></i>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Favorites" placement="bottom">
          <i
            class="fas fa-heart"
            :class="{'on-favorites': isFavorite}"
            @click.stop="toggleFavorite"
          ></i>
        </el-tooltip>
      </div>
      <!-- <i class="fas fa-bookmark"></i> -->
      <!-- <i class="fas fa-star"></i> -->
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  props: ["item", "itemType"],
  data() {
    return {
      isOnWatchList: false,
      isFavorite: false,
      isHovered: false,
      isOnWatchList: false
    };
  },
  created() {
    let isOnWatchList = this.isItemInList("watchList");
    if (isOnWatchList) {
      this.isOnWatchList = true;
    }
    let isFavorite = this.isItemInList("favorites");
    if (isFavorite) {
      this.isFavorite = true;
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    }
  },
  methods: {
    playTrailer() {
      eventBus.$emit("playTrailer");
    },
    async toggleWatchList() {
      if (!this.isOnWatchList) {
        await this.$store.dispatch({
          type: "addToListByType",
          addedItem: this.item,
          listType: "watchList"
        });
        await this.$store.dispatch({
          type: "addActivityByType",
          item: this.item,
          itemType: this.itemType,
          activityType: "add to list",
          value: "Watch List"
        });
      } else
        this.$store.dispatch({
          type: "removeFromListByType",
          itemId: this.item.id,
          listType: "watchList"
        });
      this.isOnWatchList = !this.isOnWatchList;
    },
    async toggleFavorite() {
      if (!this.isFavorite) {
        await this.$store.dispatch({
          type: "addToListByType",
          addedItem: this.item,
          listType: "favorites"
        });
        await this.$store.dispatch({
          type: "addActivityByType",
          item: this.item,
          itemType: this.itemType,
          activityType: "add to list",
          value: "Favorites"
        });
      } else {
        this.$store.dispatch({
          type: "removeFromListByType",
          itemId: this.item.id,
          listType: "favorites"
        });
      }
      this.isFavorite = !this.isFavorite;
    },
    isItemInList(listType) {
      if (this.$store.getters.currUser) {
        let lists = this.$store.getters.currUserLists;
        let list = lists.find(list => list.name === listType);
        let item = list.items.some(item => {
          return item.id === this.item.id;
        });
        return item;
      }
    }
  }
};
</script>

<style scoped>
.active {
  color: green !important;
}
i:hover {
  cursor: pointer;
}
i {
  margin: 0 0.7rem;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.863);
}
.on-watch-list {
  color: rgb(1, 221, 1);
}
.on-favorites {
  color: rgb(255, 89, 89);
}
.fa-play-circle {
  font-size: 4rem;
  margin-right: 1rem;
}
.control-bar {
  z-index: 4534534565464567546;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.user-control-btns {
  display: flex;
  justify-content: space-evenly;
  width: 150px;
}
</style>
