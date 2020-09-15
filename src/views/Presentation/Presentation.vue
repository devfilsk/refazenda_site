<template>
  <div class="container">
    <h1>Apresentação do sistema e bla bla bla</h1>
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
.container {
  height: 88vh;
  display: flex;
  background: #f5f5fd;
}
h1 {
  margin: auto auto;
}
</style>
