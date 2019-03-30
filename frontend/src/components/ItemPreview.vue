<template>
  <div
    @click="pushToDetails(item.id)"
    class="item-preview"
    :style="{'background-image':'url(\''+img+'\')'}"
    @mouseenter="toggleIsHovered"
    @mouseleave="toggleIsHovered"
    :class="{'hover-buttons': isHovered, 'selected': isSelected}"
  >
    <div class="item-hover-controls" v-if="currUser && isHovered">
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
      <a href="#">Play Trailer</a>
    </div>
  </div>
</template>

<script>
import UtilityService from "@/services/UtilityService.js";

export default {
  props: ["item", "selectMode"],
  components: {},
  data() {
    return {
      img: null,
      isHovered: false,
      isOnWatchList: false,
      isFavorite: false,
      isSelected: false,
      itemTypeRoute: null
    };
  },
  methods: {
    imgURL() {
      if (this.item.profile_path)
        return UtilityService.imgURL(this.item.profile_path, 500);
      return UtilityService.imgURL(this.item.poster_path, 500);
    },
    pushToDetails(itemId) {
      if (this.selectMode) return this.toggleisSelected();
      this.$store.commit("setSelectedItem", this.item);
      console.log('itemtype', this.item)
      
      let detailsRoute = this.item.type === 'tv' ? 'tv' : 'movies'
      // TODO REFACTOR
      if(this.item.known_for)return this.$router.push(`actors/${itemId}`)
      this.$router.push(`/${detailsRoute}/details/${itemId}`);
    },
    toggleIsHovered() {
      this.isHovered = !this.isHovered;
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
          value: "watchList"
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
          value: "favorites"
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
    this.img = this.imgURL();
  }
};
</script>

<style lang="scss" scoped>
.item-preview {
  width: 200px;
  height: 300px;
  background-size: cover;
  cursor: pointer;
  transition: 0.5s;
  &.selected {
    box-shadow: inset 0 0 20px 20px #ffc107;
  }
  .item-hover-controls {
    height: inherit;
    display: grid;
    grid-template: 20px 1fr 40px/1fr;
    .hover-controls-bwtns {
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
.hover-buttons {
  box-shadow: inset 0 0 90px #000000;
}
</style>
