<template>
    <div id="home_container">
        <Header :tags="tags" :fetchYouTubeVideos="fetchYouTubeVideos"/>

        <div class="px-[10%] grid grid-cols-4 gap-4" v-if="videos.length === 0 && error_message === ''">
            <Skeleton :counter="12"/>
        </div>
        <div class="px-[10%] grid grid-cols-4 gap-4" v-else  @scroll="() => console.log('Test')">
            <div v-for="(video, i) in videos" :key="i">
                <YouTubeChannel v-if="video.id.kind === 'youtube#channel'" :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title"/>
                <YouTubeVideo v-else :thumbnail="video.snippet.thumbnails.high.url" :title="video.snippet.title" :channel_title="video.snippet.channelTitle"/>
            </div>

            <Skeleton :counter="4"/>
        </div>
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
    metaInfo: {
        title: "YouTube"
    },
    methods:{
        fetchYouTubeVideos(query){
            console.log("CALLED");
            const API_KEY = process.env.VUE_APP_API_KEY;
            let max_results_length = 16;
            let url = (query) ? `/search?part=snippet&maxResults=${ max_results_length }&q=${ query }&key=${ API_KEY }`
                : `/search?part=snippet&maxResults=${ max_results_length }&key=${ API_KEY }`;

            console.log(url);

            YouTubeAPI.get(url)
                .then(response => {
                    console.log(response.data.items); // TODO TEMP...

                    /** CACHE THE DATA OF YOUTUBE VIDEOS IN THE LOCAL STORAGE */
                    localStorage.setItem("yt_videos", JSON.stringify(response.data.items));

                    /** THIS IS THE FIRST FETCH, SO SET THE VALUE ON videos */
                    this.videos.push(...response.data.items);
                })
                .catch(err => {
                    /** DISPLAY THE ERROR MESSAGE AT THE CONSOLE */
                    console.log(err);

                    /** DISPLAY THE ERROR MESSAGE ON USER */
                    this.error_message = err;
                });
        },

        detectBottomPage(e){
            /** IF YOU REMOVE THE 'documentElement' AND YOU TRIED TO ACCESS e.target.offsetHeight, IT WILL BE UNDEFINED. ADDING THE documentElement RESOLVE THE PROBLEM:
             * https://stackoverflow.com/questions/51908241/when-trying-access-event-target-something-always-return-undefined
             */
            let element = e.target.documentElement;
            
            /** SOURCE FOR VUE DETECTING IF BOTTOM PAGE IS REACHED:
             * https://stackoverflow.com/questions/59603315/how-to-detect-when-a-user-scrolls-to-the-bottom-of-a-div-vue
             */
            if(Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight){
                console.log("Omai");
            }
        }
    },
    data(){
        return {
            error_message: "",
            videos: [],
            tags: [
                "All",
                "Music",
                "Philippine Music",
                "Playlist",
                "Ed Sheeran",
                "Live",
                "Gaming",
                "Contemporary R&B",
                "News",
                "Country Music"
            ]
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