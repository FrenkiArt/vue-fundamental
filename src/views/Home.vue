<template>
  <div class="home">
    <Likes />

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Likes from '../components/Likes.vue';

export default {
  name: 'Home',

  data() {
    return {};
  },

  methods: {},

  components: {
    HelloWorld,
    Likes,
  },

  mounted() {},

  computed: {},

  watch: {},
};
</script>

<style lang="scss"></style>
