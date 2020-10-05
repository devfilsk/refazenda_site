<template>
  <div class="">
    <Header />
    <h1>Apresentação do sistema e bla bla bla</h1>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
export default {
  name: "Dashboard",
  components: {
    Header
  },
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
