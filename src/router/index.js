import { createRouter, createWebHistory } from 'vue-router';
import store from "../store";
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import VideoPlayer from '../views/VideoPlayer.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/result',
    name: 'Search',
    component: Search
  },
  {
    path: '/watch',
    name: 'VideoPlayer',
    component: VideoPlayer
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
    /**
     * Reference for using (?) link query:
     * https://www.w3docs.com/snippets/vue-js/how-to-get-query-parameters-from-a-url-in-vue-js.html
     */
    let subtitle = to.query.search_query ?? store.state.selected_video_title ?? "";

    document.title = (subtitle) ? `${ subtitle } - YouTube` : "YouTube";
    next();
});

export default router
