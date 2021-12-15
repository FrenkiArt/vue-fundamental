import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import PostsPage from '../views/PostsPage.vue';
import PostPage from '../views/PostPage.vue';
import PostsPageWithStore from '@/views/PostsPageWithStore.vue';
import PostsPageCompositionApi from '@/views/PostsPageCompositionApi.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: PostsPage,
  },
  {
    path: '/postspagewithstore',
    name: 'PostsPageWithStore',
    component: PostsPageWithStore,
  },
  {
    path: '/compositionapi',
    name: 'PostsPageCompositionApi',
    component: PostsPageCompositionApi,
  },
  {
    path: '/posts/:id',
    name: 'PostPage',
    component: PostPage,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
