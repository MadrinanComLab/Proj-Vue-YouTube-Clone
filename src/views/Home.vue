<template>
    <div id="home_container">
        <!-- REMOVED ATTR IN Header:  :tags="tags" :selected_tag="selected_tag" :fetchVideoByTags="fetchVideoByTags" -->
        <Header :display_tags="true"/>

        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="$store.state.videos.length === 0 && $store.state.error_message === ''">
            <Skeleton :counter="12"/>
        </div>
        <!-- <div class="px-[10%] grid grid-cols-4 gap-4" v-else  @scroll="() => console.log('Test')">
            <div v-for="(video, i) in videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <YouTubeVideo v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle"/>
            </div>

            <Skeleton :counter="4"/>
        </div> -->
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import YouTubeVideo from "@/components/Cards/YouTubeVideo.vue";
import YouTubeChannel from "@/components/Cards/YouTubeChannel.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";
import YouTubeAPI from "@/api/YouTubeAPI";

export default {
    name: "Home",
    components: { Header, YouTubeVideo, YouTubeChannel, Skeleton },
    methods:{
        /**
         * DOCU: Function to fetch YouTube videos
         * Triggered: When user reached the bottom page, click tags at the header, or when the Home component was mounted.
         * Last Update: February 19, 2023
         * @function
         * @memberOf Home page
         * @param {string} query = "" - Optional value, this will be used when user search for specific video or if the user select a tag in the header.
         * @param {boolean} reset = false - This will define if the array would be reset. If the value is false then the new fetch value will be appended to the existing array
         * @author MadriñanComputerLab
         */
        fetchYouTubeVideos(query = "", reset = false){
            console.log("CALLED");
            const API_KEY = process.env.VUE_APP_API_KEY;
            let max_results_length = 16;

            let url = (query) ? `/search?part=snippet&maxResults=${ max_results_length }&q=${ query }&key=${ API_KEY }`
                : `/search?part=snippet&maxResults=${ max_results_length }&key=${ API_KEY }`;;

            /** IF next_page_token IS NOT NULL THEN INCLUDE THE NEXT PAGE TOKEN IN API CALL.
             * REFRENCES FOR IMPLEMENTING PAGINATION IN YOUTUBE API:
             * https://developers.google.com/youtube/v3/docs/videos/list#response
             * https://developers.google.com/youtube/v3/guides/implementation/pagination
             */
            url += (this.next_page_token) ? `&pageToken=${ this.next_page_token }` : "";

            console.log(url);

            YouTubeAPI.get(url)
                .then(response => {
                    console.log(response); // TODO TEMP...

                    /** CACHE THE DATA OF YOUTUBE VIDEOS IN THE LOCAL STORAGE */
                    localStorage.setItem("yt_videos", JSON.stringify(response.data.items));

                    if(reset){
                        /** IF THE reset IS TRUE THEN SET THE NEW FETCH DATA AS NEW ARRAY */
                        this.videos = response.data.items;
                    }
                    else{
                        /** IF THE reset IS FALSE THEN APPEND THE NEW FETCH DATA */
                        this.videos.push(...response.data.items);
                    }

                    /** SAVE THE nextPageToken ATTRIBUTE FOR PAGINATION */
                    this.next_page_token = response.data.nextPageToken;
                })
                .catch(err => {
                    /** DISPLAY THE ERROR MESSAGE AT THE CONSOLE */
                    console.log(err);

                    /** DISPLAY THE ERROR MESSAGE ON USER */
                    this.error_message = err;
                });
        },

        fetchVideoByTags(e){
            /** THIS WILL BE USED LATER FOR PAGINATION */
            this.query = e.target.innerText;

            /** THIS WILL BE USED LATER FOR MODIFYING THE STYLE OF TAGS */
            this.selected_tag = e.target.innerText;

            /** FETCH THE VIDEO */
            this.fetchYouTubeVideos(e.target.innerText, true);
        },

        /**
         * DOCU: Function to detect the bottom page
         * Triggered: When user reached the bottom page.
         * Last Update: February 19, 2023
         * @function
         * @memberOf Home page
         * @param {event} e = "" - Require input event.
         * @author MadriñanComputerLab
         */
        detectBottomPage(e){
            /** IF YOU REMOVE THE 'documentElement' AND YOU TRIED TO ACCESS e.target.offsetHeight, IT WILL BE UNDEFINED. ADDING THE documentElement RESOLVE THE PROBLEM:
             * https://stackoverflow.com/questions/51908241/when-trying-access-event-target-something-always-return-undefined
             */
            let element = e.target.documentElement;
            
            /** SOURCE FOR VUE DETECTING IF BOTTOM PAGE IS REACHED:
             * https://stackoverflow.com/questions/59603315/how-to-detect-when-a-user-scrolls-to-the-bottom-of-a-div-vue
             */
            if(Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight){
                /** this.query WILL BE GIVEN VALUE WHEN USER CLICKS TAG IN THE HEADER */
                this.fetchYouTubeVideos(this.query);
            }
        }
    },
    data(){
        return {
        }
    },
    mounted(){
        /** THIS WILL BE USED FOR DETECTING IF THE BOTTOM OF THE PAGE WAS REACHED */
        window.addEventListener("scroll", this.detectBottomPage);

        if(localStorage.getItem("yt_videos")){
            /** IF THE 'yt_videos' IN LOCAL STORAGE IS NOT EMPTY THEN USE THAT VALUE. WE'RE CACHING THE VALUE SINCE THE API CALL IS NOT UNLIMITED. */
            this.videos = JSON.parse(localStorage.getItem("yt_videos"));
            console.log(JSON.parse(localStorage.getItem("yt_videos")));
        }
        else{
            /** IF THE 'yt_videos' IN LOCAL STORAGE THEN FETCH THE VIDEOS */
           this.fetchYouTubeVideos(); 
        }
    }
};
</script>