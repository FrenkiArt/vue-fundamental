<template>
  <div class="posts-page">
    <h1>
      {{ $store.state.post.limit }}
    </h1>

    <h1>
      {{
        $store.state.isAuth
          ? 'Пользователь авторизован'
          : 'Неавторизованный доступ. Авторизуйтесь!'
      }}
    </h1>

    <p>
      <Likes />
    </p>

    <h1>{{ $store.state.likes }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>

    <p>
      <MyButton @click="$store.commit('incrementLikes')">Лайк +</MyButton>
      <MyButton @click="$store.commit('decrementLikes')">Лайк -</MyButton>
    </p>

    <!-- <p><MyInput v-focus v-model="searchQuery" placeholder="Поиск..." /></p> -->
    <p>
      <MyInput
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
      />
    </p>

    <!-- <p>
      <BaseSelect v-model="selectedSort" :options="sortOptions" />
    </p> -->

    <p>
      <BaseSelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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

    <div class="observer" v-intersection="funcObserve">
      <h3>observer</h3>
    </div>

    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          current: this.page === pageNumber ? true : false,
        }"
        @click="setChangePage(pageNumber)"
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
import Likes from '../components/Likes.vue';
import MyButton from '../components/ui/MyButton.vue';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'PostsPageWithStore',
  components: {Posts, PostForm, Likes, MyButton},
  props: {},
  emits: [],
  data() {
    return {
      dialogVisible: false,
      /* posts: [],
      
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0, */
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,

      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),

    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),

    /* sortedPosts() {
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
    }, */
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
    ...mapMutations({
      setPosts: 'post/setPosts',
      setLoading: 'post/setLoading',
      setPage: 'post/setPage',
      setSelectedSort: 'post/setSelectedSort',
      setTotalPages: 'post/setTotalPages',
      setSearchQuery: 'post/setSearchQuery',
      setChangePage: 'post/setChangePage',
    }),

    ...mapActions({
      fetchPosts: 'post/fetchPosts',
    }),

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

    /* async fetchPosts() {
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
    }, */

    /* changePage(pageNumber) {
      this.page = pageNumber;
      // this.fetchPosts();
    }, */

    funcObserve() {
      console.log('funcObserve сработал');
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

.observer {
  background-color: #cecece;
  min-height: 1px;
  width: 100%;
}
</style>
