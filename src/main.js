import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueMeta from "vue-meta";
import "./input.css";

const vue_meta_options = {
    /** OPTIONAL pluginOptions */
    refreshOnceOnNavigation: true 
};

// REMOVED .use(VueMeta, vue_meta_options)

createApp(App)
    // .use(VueMeta, vue_meta_options)
    .use(router)
    .mount('#app');
