<template>
  <div class="posts" v-show="posts.length > 0">
    <transition-group name="post-list">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @removePost="$emit('removePost', post)"
      />
    </transition-group>
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

<style lang="scss">
.posts {
  position: relative;
}

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-move {
  transition: transform 0.8s ease;
}
</style>
