<template>
    <div class="mb-6 sticky top-0 bg-[#0f0f0f] pb-5">
        <div class="px-[10%] py-4 grid grid-cols-3 gap-1 mb-3">
            <div>
                <img src="@/assets/images/yt-logo-with-text.png" alt="YouTube-Logo" class="w-[150px]">
            </div>

            <div class="border-2 border-[#222222] bg-[#121212] rounded-l-full rounded-r-full">
                <form>
                    <input type="text" name="search" id="search" placeholder="Search" class="pl-3 py-3 w-[calc(100%-52.5px)] align-top bg-[#121212] rounded-l-full">
                    <button class="bg-[#222222] p-3 ml-1 rounded-r-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>

        <div class="px-[10%]">
            <span v-for="(tag, i) in tags" :key="tag" @click="fetchVideoByTags" :class="`${(i === 0) ? 'tags--selected' : 'tags--unselected'} tags hover:tags--hover`">{{ tag }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    props: [ "tags", "fetchVideoByTags" ],
    mounted(){
        // console.log(process.env.VUE_APP_API_KEY);
    },
    created(){
        // console.log("Tangina")
    }
}
</script>