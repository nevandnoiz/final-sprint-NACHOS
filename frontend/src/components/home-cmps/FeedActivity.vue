<template>
  <div class="activity">
    <div>
      <p>
        {{userName}} {{type}}
        <a @click="toItem" class="link">{{itemName}}</a>
        {{action}}
      </p>

      <div class="btns">
        <div class="likes">
          <button @click="$emit('addLike', item)">Like</button>
          <p>{{this.item.likes}}</p>
        </div>
        <div>
          <button @click="allowComment = true">Comment</button>
        </div>
      </div>

      <div class="comment" v-if="allowComment">
        <textarea v-model="comment" name="" id="" cols="30" rows="1"></textarea>
        <button @click="addComment">comment</button>
      </div>

      <div class="comments">
        <activity-comment v-for="(comment, idx) in item.comments" :key="idx" :comment="comment"/>
      </div>
    </div>
  </div>
</template>


<script>
import activityComment from '@/components/home-cmps/activityComment'

export default {
  components: {
    activityComment
  },
  props: {
    item: Object
  },
  data(){
    return {
      allowComment: false,
      comment: ''
    }
  },
  methods: {
    toItem() {
      this.$router.push(`/${this.item.item_type}/details/${this.item.item_id}`);
    },
    addComment(){
      this.$emit('addComment', {comment: this.comment, activity: this.item})
      this.comment = ''
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
    creadted() {}
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
}
.link {
  color: gray;
}

.btns {
  display: flex;
}

.likes {
  display: flex;
}
</style>
