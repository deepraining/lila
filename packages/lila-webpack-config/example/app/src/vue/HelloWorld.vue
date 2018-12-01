<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
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
