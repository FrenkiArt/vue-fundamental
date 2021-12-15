import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [
      /* {id: 1, title: 'title 1', body: 'Description 1'},
      {id: 2, title: 'title 2', body: 'Description 2'},
      {id: 3, title: 'title 3', body: 'Description 3'},
      {id: 4, title: 'title 4', body: 'Description 4'}, */
    ],

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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },

    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },

    setChangePage(state, pageNumber) {
      state.page = pageNumber;
    },
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );

        state.posts = response.data;
      } catch (e) {
        console.log(e);
        alert('Ошибка при попытку загрузки постов функцией fetchPosts');
      } finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
};
