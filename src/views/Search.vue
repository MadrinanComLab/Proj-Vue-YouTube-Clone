<template>
    <div id="search_container">
        <Header :display_tags="false"/>

        <!-- px-[10%] -->
        <div class="px-[30%] grid grid-cols-1 gap-2">
            <Skeleton :counter="12"/>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Skeleton from "@/components/Cards/Skeleton.vue";

export default {
    name: "Search",
    components: { Header, Skeleton },
}
</script>
