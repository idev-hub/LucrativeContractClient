<template>
    <div class="window">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .window{
        background-color: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0 0 6px rgba(#000000, .16);
        box-sizing: border-box;
    }
</style>

<script>
    export default {
        name: 'Window'
    }
</script>
