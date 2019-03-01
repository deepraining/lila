<template>
  <div class="hello">
    <el-button>element-ui</el-button>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'element-ui';

Vue.component(Button.name, Button);

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.hello {
  background-image: url('../../images/hello.png');
  background-repeat: no-repeat;
}
</style>
