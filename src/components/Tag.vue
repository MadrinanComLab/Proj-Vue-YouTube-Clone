<template>
    <span v-for="tag in $store.state.tags" :key="tag" @click="fetchVideoByTags" :class="`${($store.state.selected_tag === tag) ? 'tags--selected' : 'tags--unselected hover:tags--hover'} tags`">{{ tag }}</span>
</template>

<script>
export default {
    name: "Tag",
    methods: {
        /**
         * DOCU: Function to fetch YouTube videos based on the selected tag
         * Triggered: This function will be triggered when user clicked the tag
         * Last Update: March 15, 2023
         * @function
         * @memberOf Tag
         * @param {object} e - This is the object provided by the span element or the 'tag'
         * @author MadriñanComputerLab
         */
        fetchVideoByTags(e){
            /* Return to the top of the page to prevent multiple API calls */
            window.scrollTo(0, 0);

            /* This will be used later for pagination */
            this.$store.state.query = e.target.innerText;

            /* This will be used later for modifying the style of tags */
            this.$store.state.selected_tag = e.target.innerText;

            /* Fetch the video */
            this.$store.dispatch("fetchYouTubeVideos", { query: e.target.innerText, reset: true, do_loading_animation: true });
        },
    }
}
</script>