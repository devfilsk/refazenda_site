<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
import { api, TOKEN_LABEL } from "@/services/api";
import { mapActions } from "vuex";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  created() {
    console.log("OPA");

    if (window.localStorage.getItem(TOKEN_LABEL)) {
      this.getLoggededUser()
        .then(res => {
          console.log("OPA", res.data);
          this.setUser(res.data.user);
          this.updateFarm(res.data.farm);
        })
        .catch(() => {
          window.localStorage.removeItem(TOKEN_LABEL);
        });
    }
  },
  methods: {
    ...mapActions("auth", ["getLoggededUser", "setUser"]),
    ...mapActions("farm", ["getCurrentFarm", "updateFarm"])
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import "assets/base.scss";
</style>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #345;
}

a {
  color: #345;
  text-decoration: none;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #42b983;
}

img {
  max-width: 100%;
  display: block;
}

.btn-outline {
  padding: 10px 20px;
  background: #fff;
  border: solid 1px #42b983;
  border-radius: 3px;
  cursor: pointer;
  color: #42b983;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
  font-weight: bold;
}

input,
textarea,
select {
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #42b983;
}

*/
.input-has-error {
  border: solid red 1px;
}
/* 
#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
