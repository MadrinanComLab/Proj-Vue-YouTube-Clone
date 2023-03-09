<template>
    <span v-for="tag in $store.state.tags" :key="tag" @click="fetchVideoByTags" :class="`${($store.state.selected_tag === tag) ? 'tags--selected' : 'tags--unselected hover:tags--hover'} tags`">{{ tag }}</span>
</template>

<script>
export default {

}
</script>