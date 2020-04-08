<template>
    <div class="alert">
        <handler v-for="(handler, index) in getHandlers" :classes="handler.classes" :index="index" :key="index">{{handler.text}}</handler>
    </div>
</template>

<script>
    import Handler from "./handler";
    export default {
        name: "LogHandler",
        components: {Handler},
        computed: {
            getHandlers: function () {
                return this.$store.getters.GET_HANDLERS
            }
        }
    }
</script>

<style lang="scss" scoped>
    .alert{
        position: fixed;
        right: 0;
        bottom: 0;
        padding: 15px;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-content: end;
        justify-content: end;
        flex-wrap: wrap;
        font-size: 14px;
        z-index : 10000;
    }
</style>