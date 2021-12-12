<template>
  <div class="home">
    <Likes />

    <PostForm @createPost="createPost" />

    <Posts :posts="posts" />

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Likes from '../components/Likes.vue';
import Posts from '../components/Posts.vue';
import PostForm from '../components/PostForm.vue';

export default {
  name: 'Home',

  data() {
    return {
      posts: [
        {id: 1, title: 'title 1', body: 'Description 1'},
        {id: 2, title: 'title 2', body: 'Description 2'},
        {id: 3, title: 'title 3', body: 'Description 3'},
        {id: 3, title: 'title 4', body: 'Description 4'},
      ],
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
    },
  },

  components: {
    HelloWorld,
    Likes,
    Posts,
    PostForm,
  },
};
</script>

<style lang="scss"></style>
