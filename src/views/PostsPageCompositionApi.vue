<template>
  <div class="posts-page">
    <h1>{{ likes }}</h1>
    <p>
      <MyButton @click="addLike">add Like</MyButton>
      <MyButton @click="removeLike">remove Like</MyButton>
    </p>

    <p><MyInput v-focus v-model="searchQuery" placeholder="Поиск..." /></p>

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

    <!-- <div class="observer" v-intersection="funcObserve">
      <h3>observer</h3>
    </div> -->

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
import {ref} from 'vue';
import {usePosts} from '../components/hooks/usePosts';
import useSortedAndSearchedPosts from '../components/hooks/useSortedAndSearchedPosts';
import useSortedPosts from '../components/hooks/useSortedPosts';
import MyButton from '../components/ui/MyButton.vue';
import Posts from '../components/Posts.vue';
import PostForm from '../components/PostForm.vue';

export default {
  name: 'PostsPageCompositionApi',

  components: {MyButton, Posts, PostForm},
  props: {},

  emits: [],

  setup(props) {
    const likes = ref(0);
    const addLike = () => {
      likes.value += 1;
    };
    const removeLike = () => {
      likes.value -= 1;
    };

    const {posts, totalPages, isPostsLoading} = usePosts(10);

    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      likes,
      addLike,
      removeLike,
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
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
