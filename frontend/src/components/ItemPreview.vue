<template>
  <!-- :style="{'background-image':'url(\''+imgURL+'\')'}" -->

  <div @click="pushToDetails(item.id)" class="item-preview">
    <img :src="imgURL">
    <div class="inset-shadow-filler" :class="{'selected': isSelected}"></div>
    <div class="item-hover-controls" v-if="showBtns && currUser">
      <div class="hover-controls-btns">
        <el-tooltip
          class="item"
          effect="dark"
          content="Remove from Watch List"
          placement="bottom"
          v-if="isOnWatchList"
        >
          <i
            class="fas fa-list"
            :class="{'on-watch-list': isOnWatchList}"
            @click.stop="toggleWatchList"
          ></i>
        </el-tooltip>
        <el-tooltip
          v-else
          class="item"
          effect="dark"
          content="Add to Watch List"
          placement="bottom"
        >
          <i
            class="fas fa-plus"
            :class="{'on-watch-list': isOnWatchList}"
            @click.stop="toggleWatchList"
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
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["item", "selectMode", "showBtns"],
  components: {},
  data() {
    return {
      isOnWatchList: false,
      isFavorite: false,
      isSelected: false,
      itemTypeRoute: null
    };
  },
  methods: {
    pushToDetails(itemId) {
      if (this.selectMode) return this.toggleisSelected();
      this.$store.commit("setSelectedItem", this.item);

      let detailsRoute = this.item.type === "tv" ? "tv" : "movies";
      // TODO REFACTOR
      if (this.item.known_for) return this.$router.push(`actors/${itemId}`);
      this.$router.push(`/${detailsRoute}/details/${itemId}`);
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
          itemType: this.itemTypeRoute,
          activityType: "add to list",
          value: "Watch"
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
          itemType: this.itemTypeRoute,
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
    toggleisSelected() {
      this.$emit("toggleItem");
      this.isSelected = !this.isSelected;
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
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser;
    },
    imgURL() {
      if (this.item.profile_path)
        return UtilityService.imgURL(this.item.profile_path, 500);
      return UtilityService.imgURL(this.item.poster_path, 500);
    }
  },
  created() {
    this.itemTypeRoute = this.$route.path.substring(1);
    let isOnWatchList = this.isItemInList("watchList");
    if (isOnWatchList) {
      // console.log(isOnWatchList);
      this.isOnWatchList = true;
    }
    let isFavorite = this.isItemInList("favorites");
    if (isFavorite) {
      this.isFavorite = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.item-preview {
  position: relative;
  background-size: cover;
  cursor: pointer;
  .inset-shadow-filler {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    transition: 0.3s;
    &.selected {
      box-shadow: inset 0 0 20px 20px #ffc107;
    }
  }
  .item-hover-controls {
    height: inherit;
    display: none;
    grid-template: 20px 1fr 40px/1fr;
    position: absolute;
    top: 0;
    right: 0;
    .hover-controls-btns {
      grid-area: 1/1/1/1;
      justify-self: flex-end;
    }
    i {
      font-size: 18px;
      margin: 9px 9px 9px 0;
      background-color: white;
      opacity: 0.5;
      color: darkslategray;
      padding: 8px;
      border-radius: 50%;
      transition: 0.2s;
    }
    i:hover {
      opacity: 0.75;
    }
    .on-watch-list {
      background-color: rgb(1, 221, 1);
    }
    .on-favorites {
      background-color: rgb(255, 89, 89);
    }
    a {
      color: inherit; /* blue colors for links too */
      text-decoration: inherit; /* no underline */
      grid-area: 3/1/3/1;
      text-align: center;
      font-size: 20px;
      color: lightgray;
      text-shadow: 0 0 3px darkslategray;
    }
  }
}
.inset-shadow-filler:hover {
  box-shadow: inset 0 0 90px #000000;
}
.item-preview:hover > .item-hover-controls {
  display: grid;
}
.hover-buttons {
  box-shadow: inset 0 0 90px #000000;
}
@media only screen and (max-width: 570px) {
  .item-preview {
    .item-hover-controls {
      display: grid;
    }
    .item-hover-controls {
      i {
        font-size: 28px;
        margin: 9px 9px 9px 0;
        padding: 10px;
      }
    }
  }
}
</style>
