<template>
  <div class="posts" v-show="posts.length > 0">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @removePost="$emit('removePost', post)"
    />
  </div>

  <h3 v-if="posts.length === 0">Список постов пуст</h3>
</template>

<script>
import Post from './Post.vue';
export default {
  name: 'posts',
  emits: ['removePost'],
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
