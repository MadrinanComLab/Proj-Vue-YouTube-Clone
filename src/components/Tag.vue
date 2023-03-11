<template>
    <span v-for="tag in $store.state.tags" :key="tag" @click="fetchVideoByTags" :class="`${($store.state.selected_tag === tag) ? 'tags--selected' : 'tags--unselected hover:tags--hover'} tags`">{{ tag }}</span>
</template>

<script>
export default {
    name: "Tag",
    methods: {
        fetchVideoByTags(e){
            console.log("You click a tag!")
            /** THIS WILL BE USED LATER FOR PAGINATION */
            this.$store.state.query = e.target.innerText;

            /** THIS WILL BE USED LATER FOR MODIFYING THE STYLE OF TAGS */
            this.$store.state.selected_tag = e.target.innerText;

            /** FETCH THE VIDEO */
            // this.fetchYouTubeVideos(e.target.innerText, true);
            this.$store.dispatch("fetchYouTubeVideos", { query: e.target.innerText, reset: true });
        },
    }
}
</script>