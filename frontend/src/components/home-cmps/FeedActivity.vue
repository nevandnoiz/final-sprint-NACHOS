<template>
  <div class="activity">
    <div class="activity-desc">
      <img class="user-img" src alt>
      <p>
        {{userName}} {{type}}
        <a @click="toItem" class="link">{{itemName}}</a>
        {{action}}
      </p>
    </div>

    <div class="item-img">
      <img :src="img" alt>
    </div>

    <div class="btns">
      <div class="likes">
        <i :class="heart" @click="addLike"></i>
        <p>{{this.item.likes}}</p>
      </div>
      <div>
        <button @click="allowComment = true">Comment</button>
      </div>
    </div>

    <div>
      <div class="comments">
        <activity-comment v-for="(comment, idx) in item.comments" :key="idx" :comment="comment"/>
      </div>
      <div class="comment-container" v-if="allowComment">
        <div
          class="textarea-div"
          contenteditable="true"
          @input="togglePlaceholder"
          @keydown.enter.prevent
          @keyup.enter="addComment"
        ></div>
        <div class="placeholder-div" v-show="showPlaceholder">Write a comment...</div>
      </div>
    </div>
  </div>
</template>


<script>
import activityComment from "@/components/home-cmps/activityComment";
import tvService from "@/services/TvShowsService.js";
import movieService from "@/services/MoviesService.js";
import util from "@/services/UtilityService.js";

export default {
  components: {
    activityComment
  },
  props: {
    item: Object
  },
  data() {
    return {
      allowComment: false,
      showPlaceholder: true,
      imgs: null,
      like: false
    };
  },
  methods: {
    toItem() {
      this.$router.push(`/${this.item.item_type}/details/${this.item.item_id}`);
    },
    addComment(ev) {
      const txt = ev.target.innerText;
      if (txt === "") return;
      this.$emit("addComment", { comment: txt, activity: this.item });
      ev.target.innerText = "";
      this.showPlaceholder = true;
    },
    togglePlaceholder(ev) {
      if (ev.target.innerText.length > 0) this.showPlaceholder = false;
      else this.showPlaceholder = true;
    },
    addLike(){
      this.$emit('addLike', this.item)
      this.like = true
    }
  },
  computed: {
    userName: function() {
      return (
        this.item.byUser.name.firstName + " " + this.item.byUser.name.lastName
      );
    },
    type: function() {
      const activity = this.item.activity;
      if (activity === "rate") return "rated";
      else if (activity === "listAdd") return "added";
    },
    itemName: function() {
      return this.item.itemTitle;
    },
    action: function() {
      const activity = this.item.activity;
      if (activity === "rate") return `with ${this.item.value} stars.`;
      else if (activity === "listAdd") return `to his ${this.item.value} list.`;
    },
    img: function() {
      if (this.imgs) {
        const idx = Math.floor(Math.random() * this.imgs.backdrops.length);
        const url = this.imgs.backdrops[idx].file_path;
        return util.imgURL(url, 780);
      }
    },
    heart: function(){
      if (this.like) return 'fas fa-heart'
      else return 'far fa-heart'
    }
  },
  created() {
    if (this.item.item_type === "tv") {
      tvService
        .getTvShowImages(this.item.item_id)
        .then(res => (this.imgs = res));
    } else if (this.item.item_type === "movies") {
      movieService
        .getMovieImages(this.item.item_id)
        .then(res => (this.imgs = res));
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-family: sans-serif;
  font-size: 20px;
}
.activity {
  margin-top: 20px;
  width: 50vw;
  border: 1px solid lightgray;
}
.link {
  color: gray;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 8px;
}
.comments{
  margin-bottom: 25px;
}
.likes {
  display: flex;
  align-items: center;
}
.activity-desc {
  margin-top: 8px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  .user-img {
    min-height: 40px;
    min-width: 40px;
    border: 1px solid gray;
    border-radius: 50%;
    margin-right: 8px;
  }
}

.item-img {
  margin-top: 10px;
  margin-bottom: 20px;
}
.comment-container {
  position: relative;
  .textarea-div,
  .placeholder-div {
    position: absolute;
    bottom: 0;
  }
  .textarea-div {
    min-width: 300px;
    max-width: 300px;
    z-index: 2;
  }
  .placeholder-div {
    z-index: 1;
    color: gray;
  }
}

.fa-heart {
  font-size: 1.7em;
  cursor: pointer;
  margin-right: 5px;
  &.fas{
    color: #e31b23;
  }
}
</style>
