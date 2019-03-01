<template>
  <div id="app">
    <img alt="Vue logo" src="../images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Jsx />
  </div>
</template>

<script>
import HelloWorld from './HelloWorld';
import Jsx from './Jsx';

// console.log(haha.hehe);

export default {
  name: 'App',
  components: {
    HelloWorld,
    Jsx,
  },
};
</script>

<style lang="scss">
/* @white: #ffffff; */
$white: #fff;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 0;

  /* background-color: @white; */
  background-color: $white;
}
</style>
