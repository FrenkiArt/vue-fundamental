<template>
  <div class="posts-page">
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

    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          current: this.page === pageNumber ? true : false,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import Posts from '../components/Posts.vue';
import PostForm from '../components/PostForm.vue';
import axios from 'axios';

export default {
  name: 'Template',
  components: {Posts, PostForm},
  props: {},
  emits: [],
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
      page: 1,
      limit: 10,
      totalPages: 0,
    };
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

    page() {
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
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

    /* async fetchPosts() {
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
    }, */

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );

        this.posts = response.data;
      } catch (e) {
        alert('Ошибка при попытку загрузки постов функцией fetchPosts');
      } finally {
        this.isPostsLoading = false;
      }
    },

    changePage(pageNumber) {
      this.page = pageNumber;
      /* this.fetchPosts(); */
    },
  },
};
</script>

<style lang="scss">
.posts-page {
  position: relative;
}

.page__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  border: 1px solid green;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;

  // .page.current
  &.current {
    border: 2px solid red;
  }
}
</style>
