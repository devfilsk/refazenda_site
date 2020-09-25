<template>
  <div>
    <!-- <h1>Home autenticada</h1> -->
    <!-- <transition mode="out-in"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {}
});
</script>
