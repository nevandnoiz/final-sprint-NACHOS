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
          <button>Like</button>
          <p>{{this.item.likes}}</p>
        </div>
        <div>
          <button>Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    item: Object
  },
  methods: {
    toItem() {
      this.$router.push(`/${this.item.item_type}/details/${this.item.item_id}`);
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
    creadted() {
      console.log(this.item);
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
  margin-top: 20px
}
.link {
  color: gray;
}

.btns{
  display: flex;
}

.likes {
  display: flex;
}
</style>
