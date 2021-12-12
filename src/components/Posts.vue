<template>
  <div class="posts">
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import Post from './Post.vue';
export default {
  name: 'posts',
  data() {
    return {};
  },
  props: {
    posts: Array,
  },
  methods: {},
  components: {Post},
};
</script>

<style lang="scss"></style>
