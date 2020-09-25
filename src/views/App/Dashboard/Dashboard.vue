<template>
  <div>
    <h1>Dashboard</h1>
    <div class="cards-content">
      <div class="card"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  created() {
    this.get();
  },
  methods: {
    get() {
      console.log("STORE", this.$store.state);
    }
  }
};
</script>

<style scoped>
.cards-content {
  flex: 1;
}
.card {
  width: 32%;
  min-height: 200x;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
}
</style>
