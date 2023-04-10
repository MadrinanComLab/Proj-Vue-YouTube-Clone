<template>
    <div v-for="i in counter" :key="i" class="animate-pulse">
        <div v-if="orientation === constants.VERTICAL">
            <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-3"></div>
            <p class="bg-[#252525] w-11/12 h-[30px] rounded mb-3"></p>
            <p class="bg-[#252525] w-3/4 h-[30px] rounded"></p>
        </div>

        <div v-else>
            <div class="w-full grid grid-container grid-cols-7 gap-4">
                <div class="bg-[#252525] w-full h-[180px] rounded-lg mb-2 col-span-3"></div>

                <div class="col-span-4">
                    <h3 class="bg-[#252525] w-11/12 h-[30px] rounded mb-2"></h3>
                    <p class="bg-[#252525] w-1/4 h-[20px] rounded"></p>
                    <p v-if="show_description" class="bg-[#252525] w-10/12 h-[25px] rounded mt-5"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import constants from "@/config/constants";

export default {
    name: "Skeleton",
    props: [ "counter", "orientation", "show_description" ],
    data(){
        return {
            constants: constants
        }
    },
    mounted(){
        console.log(constants);
    }
}
</script>