<template>
    <div class="w-full">
        <img class="w-full" :src="thumbnail" alt="">
        <h2 class="text-white font-bold">{{ title }}</h2>
        <p class="text-[#888] text-sm">{{ channel_title }}</p>
    </div>
</template>

<script>
export default {
    name: "YouTubeVideo",
    props: [ "thumbnail", "title", "channel_title" ]
}
</script>