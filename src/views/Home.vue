<template>
    <div>
        <Header :tags="tags"/>

        <div class="px-[10%] grid grid-cols-4 gap-4">
            <div v-for="i in 20" :key="i">
                <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-3"></div>
                <p class="bg-[#252525] w-11/12 h-[30px] rounded mb-3"></p>
                <p class="bg-[#252525] w-3/4 h-[30px] rounded"></p>
            </div>
        </div>
    </div>
</template>

<script>
// TODO FINISH THE GUIDE FOR SETTING UP THE YOUTUBE API IN THE README.md THEN PROCEED TO FETCHING YOUTUBE VIDEOS FROM THE API
import Header from "@/components/Header.vue";

export default {
    name: "Home",
    components: { Header },
    metaInfo: {
        title: "YouTube"
    },
    data(){
        return {
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
    }
};
</script>