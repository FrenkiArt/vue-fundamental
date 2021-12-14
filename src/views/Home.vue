<template>
  <div class="home">
    <Likes />

    <p><MyInput v-model="searchQuery" placeholder="Поиск..." /></p>

    <p>
      <BaseSelect v-model="selectedSort" :options="sortOptions" />
    </p>

    <p>
      <MyButton @click="showDialogVisible">Добавить пост</MyButton>
    </p>

    <BaseDialog v-model:show="dialogVisible">
      <PostForm @createPost="createPost" />
    </BaseDialog>

    <Posts
      :posts="sortedAndSearchedPosts"
      @removePost="removePost"
      v-if="!isPostsLoading"
    />

    <div v-else>Идёт загрузка ...</div>

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
import axios from 'axios';

export default {
  name: 'Home',

  data() {
    return {
      posts: [
        /* {id: 1, title: 'title 1', body: 'Description 1'},
        {id: 2, title: 'title 2', body: 'Description 2'},
        {id: 3, title: 'title 3', body: 'Description 3'},
        {id: 4, title: 'title 4', body: 'Description 4'}, */
      ],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
      searchQuery: '',
    };
  },

  methods: {
    createPost(post) {
      this.posts.reverse();
      this.posts.push(post);
      this.posts.reverse();
      this.hideDialogVisible();
    },

    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
    },

    toggleDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },

    hideDialogVisible() {
      this.dialogVisible = false;
    },

    showDialogVisible() {
      this.dialogVisible = true;
    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        );
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка при попытку загрузки постов функцией fetchPosts');
      } finally {
        this.isPostsLoading = false;
      }
    },
  },

  components: {
    HelloWorld,
    Likes,
    Posts,
    PostForm,
  },

  mounted() {
    this.fetchPosts();
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  watch: {
    /* selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    }, */
  },
};
</script>

<style lang="scss"></style>
