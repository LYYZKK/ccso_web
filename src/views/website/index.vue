<template>
  <div id="website-app">
    <Top />
    <router-view />
    <Bottom />
  </div>
</template>

<script>
import Top from "./components/Top.vue";
import Bottom from "./components/Bottom.vue";
export default {
  name: "App",
  components: {
    Top,
    Bottom
  }
};
</script>

<style scoped>
#website-app {
  background-color: #fff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  max-width: 809px;
  margin: 0 auto;
  box-shadow: 0 0 5px 1px #ccc;
}
@media (max-width:500px) {
  #website-app{
    box-shadow: none;
  }
}
</style>
