<template>
    <div :class="`${ (display_tags) ? 'mb-6 ' : '' }sticky top-0 bg-[#0f0f0f] pb-5`">
        <div :class="`${ (display_tags) ? 'mb-3 ' : '' }px-[10%] py-4 grid grid-cols-3 gap-1`">
            <router-link to="/">
                <div @click="goHome">
                    <img src="@/assets/images/yt-logo-with-text.png" alt="YouTube-Logo" class="w-[150px]">
                </div>
            </router-link>

            <div class="border-2 border-[#222222] bg-[#121212] rounded-l-full rounded-r-full">
                <form @submit.prevent="submitSearchQuery">
                    <input type="text" name="search" id="search" placeholder="Search" class="pl-3 py-3 w-[calc(100%-52.5px)] align-top bg-[#121212] text-white rounded-l-full" v-model="search_query">
                    <button class="bg-[#222222] p-3 ml-1 rounded-r-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>

        <div class="px-[10%]" v-if="display_tags">
            <Tag/>
        </div>
    </div>
</template>

<script>
import Tag from "@/components/Tag.vue";

export default {
    name: "Header",
    props: [ "display_tags" ],
    components: { Tag },
    data() {
        return {
            search_query: ""
        }
    },
    mounted(){
        this.search_query = this.$route.query.search_query;
    },
    methods: {
        /**
         * DOCU: Function to redirect the page to Search result and put the search query on the link.
         * Triggered: When user submit the search form
         * Last Update: March 21, 2023
         * @function
         * @memberOf Header
         * @author MadriñanComputerLab
         */
        submitSearchQuery(){
            /** This will be used in paginating through the search results */
            this.$store.commit("setQuery", this.search_query);

            /** Reference for this approach of setting up link programmatically:
             * https://stackoverflow.com/questions/35664550/vue-js-redirection-to-another-page
             */
            this.$router.push({ name: 'Search', query: { search_query: this.search_query } });
            
            /** Fetch the YouTube video based on inputted YouTube query */
            this.$store.dispatch("fetchYouTubeVideos", { query: this.search_query, reset: true, do_loading_animation: true }); 
        },

        /**
         * DOCU: Function to go to the top of the page
         * Triggered: When the page loads
         * Last Update: April 11, 2023
         * @function
         * @memberOf VideoPlayer
         * @author MadriñanComputerLab
         */
        goToTop(){
            window.scrollTo(0, 0);
        },

        /**
         * DOCU: Function to reset the document title into an empty string and return to the top of the page.
         * Triggered: When user click the brand name in the header
         * Last Update: April 11, 2023
         * @function
         * @memberOf Header
         * @author MadriñanComputerLab
         */
        goHome(){
            /* In home page, the title must be 'YouTube', so we will set the title in vuex into an empty string */
            this.$store.commit("setVideoTitle", "");

            this.goToTop();
        }
    }
}
</script>