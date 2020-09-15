<template>
  <div>
    <h1>Dashboard</h1>
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
