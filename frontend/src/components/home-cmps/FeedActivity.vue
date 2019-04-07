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
      <div class="likes" @click="toggleLike">
        <i :class="heart"></i>
        <p>{{this.item.likes}}</p>
      </div>
      <div @click="focusComment">
        <button>Comment</button>
      </div>
    </div>

    <hr>

    <div>
      <div class="comments">
        <activity-comment v-for="(comment, idx) in item.comments" :key="idx" :comment="comment"/>
      </div>
      <div class="comment-container">
        <div
          class="textarea-div"
          contenteditable="true"
          @input="togglePlaceholder"
          @keydown.enter.prevent
          @keyup.enter="addComment"
          ref="textarea"
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
      this.$store.dispatch({
        type: "addCommentToActivity",
        comment: txt,
        activity: this.item
      });
      ev.target.innerText = "";
      this.showPlaceholder = true;
    },
    togglePlaceholder(ev) {
      if (ev.target.innerText.length > 0) this.showPlaceholder = false;
      else this.showPlaceholder = true;
    },
    toggleLike() {
      if (!this.like) {
        this.$store.dispatch({
          type: "toggleLikeActivity",
          activity: this.item,
          diff: 1
        });
        this.like = true;
      } else {
        this.$store.dispatch({
          type: "toggleLikeActivity",
          activity: this.item,
          diff: -1
        });
        this.like = false;
      }
    },
    focusComment() {
      this.$refs.textarea.focus();
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
      else if (activity === "add to list") return "added";
    },
    itemName: function() {
      return this.item.itemTitle;
    },
    action: function() {
      const activity = this.item.activity;
      if (activity === "rate") return `with ${this.item.value} stars.`;
      else if (activity === "add to list")
        return `to his ${this.item.value} list.`;
    },
    img: function() {
      if (this.imgs) {
        const idx = Math.floor(Math.random() * this.imgs.backdrops.length);
        const url = this.imgs.backdrops[idx].file_path;
        return util.imgURL(url, 780);
      }
    },
    heart: function() {
      if (this.like) return "fas fa-heart";
      else return "far fa-heart";
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
    if (this.item.likes > 0) this.like = true;
  }
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}

.activity {
  margin-top: 20px;
  width: 50vw;
  border: 1px solid lightgray;
  border-radius: 8px;
  background-color: white;

  @media (max-width: 1000px) {
    width: 70vw;
  }
  @media (max-width: 650px) {
    width: 80vw;
  }
  @media (max-width: 400px) {
    width: 90vw;
  }
}
a.link {
  color: #f57f16;
}
a.link:hover {
  text-decoration: underline;
}

.btns {
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  margin-top: 4px;
  margin-bottom: 4px;

  div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;
    button {
      margin: 0;
      border: 0;
      background-color: inherit;
    }
    :focus {
      outline: 0;
    }
  }
  :hover {
    background-color: rgb(245, 245, 245);
  }
  .likes {
    border-right: 1px solid rgb(245, 245, 245);
  }
}
.comments {
  margin-bottom: 25px;
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
  img {
    width: 100%;
  }
}
.comment-container {
  position: relative;
  height: 40px;
  margin: 8px;
  background-color: #f5f5f5;
  border: 1px solid gray;
  border-radius: 20px;
  .textarea-div,
  .placeholder-div {
    position: absolute;
    bottom: 0;
    padding-left: 15px;
  }
  .textarea-div {
    min-width: 48vw;
    z-index: 2;
    margin-bottom: 8px;
    outline: none;
  }
  .placeholder-div {
    z-index: 1;
    color: gray;
    min-width: 48vw;
    margin-bottom: 8px;
  }
}

.fa-heart {
  font-size: 1.7em;
  cursor: pointer;
  margin-right: 5px;
  &.fas {
    color: #e31b23;
  }
}
</style>
