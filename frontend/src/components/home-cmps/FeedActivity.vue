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
    activities: Array
  },
  methods: {
    toItem() {
      this.$router.push(
        `/${this.activities[0].item_type}/details/${this.activities[0].item_id}`
      );
    }
  },
  computed: {
    userName: function() {
      return (
        this.activities[0].byUser.name.firstName +
        " " +
        this.activities[0].byUser.name.lastName
      );
    },
    type: function() {
      const activity = this.activities[0].activity;
      if (activity === "rate") return "rated";
      else if (activity === "listAdd") return "added";
    },
    item: function() {
      return this.activities[0].itemTitle;
    },
    action: function() {
      const value = this.activities[0].value;
      if (typeof value === "number")
        return `with ${this.activities[0].value} stars.`;
      else if (typeof value === "listAdd")
        return `to  his ${this.activities[0].value} list.`;
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
