import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'

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
    const query = to.query.search_query;

    document.title = (typeof query === "undefined") ? "YouTube" : `${query} - YouTube`;
    next();
});

export default router
