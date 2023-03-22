<template>
    <div id="video_player_container">
        <Header :display_tags="false"/>

        <div class="px-[10%]">
            <!--/
            Reference for accessing the video:
            * https://stackoverflow.com/questions/26046567/youtube-api-get-a-video
            * https://developers.google.com/youtube/iframe_api_reference
            /-->
            <iframe className="w-100" :src="`http://www.youtube.com/embed/${ selected_video_id }?enablejsapi=1&origin=http://example.com`"></iframe>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name: "VideoPlayer",
    components: { Header },
    data() {
        return {
            /** This variable was declared for better readability */
            selected_video_id: this.$route.query.v
        }
    },
    mounted(){
        // this.selected_video_id = this.$route.query.v;
    }
}
</script>