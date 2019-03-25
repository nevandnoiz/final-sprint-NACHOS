<template>
  <div>
    <div>
      <p>
        {{userName}} {{type}}
        <a @click="toItem">{{item}}</a>
        {{action}}
      </p>

      <button>Like</button>
      <button>Comment</button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    activity: Object
  },
  methods: {
    toItem() {
      this.$router.push(
        `/${this.activity.item_type}/details/${this.activity.item_id}`
      );
    }
  },
  computed: {
    userName: function() {
      return (
        this.activity.byUser.name.firstName +
        " " +
        this.activity.byUser.name.lastName
      );
    },
    type: function() {
      const activity = this.activity.activity;
      if (activity === "rate") return "rated";
      else if (activity === "listAdd") return "added";
    },
    item: function() {
      return this.activity.itemTitle;
    },
    action: function() {
      const activity = this.activity.activity;
      if (activity === "rate") return `with ${this.activity.value} stars.`;
      else if (activity === "listAdd") return `to his ${this.activity.value} list.`;

    },
    creadted() {
      console.log(this.activity);
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  font-family: sans-serif;
  font-size: 20px;
}
</style>
