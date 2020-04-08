<template>
    <div @click="remove" >
        <div :class="['item', classes]">
            <p><slot></slot></p>
            <i class="icon icon-close"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "handler",
        props: ['classes', 'index'],
        created: function(){
            return new Promise(() => {
                setTimeout(() => {
                    this.$store.commit('REMOVE_HANDLER', this.index);
                }, 5000)
            })
        },
        methods: {
            remove: function () {
                this.$store.commit('REMOVE_HANDLER', this.index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes enter-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    .item{
        transition: background .4s, transform .4s;
        cursor: pointer;
        background: #fff;
        color: #000;
        margin: 10px 0;
        padding: 15px 20px;
        border-radius: 5px;
        text-align: justify;
        display: flex;
        float: right;
        user-select: none;
        box-shadow: 0 0 12px rgba(0,0,0,.3);
        animation: enter-in .4s;

        .icon{
            opacity: .3;
            margin-left: 20px;
            margin-top: 2px;
            font-size: 10px;
            transition: .3s;
        }

        &.success {
            background: #1D8A34;
            color: #ffffff;
            &:hover{
                background: #1e9d39;
            }
        }

        &.error {
            background: #530000;
            color: #ffffff;
            &:hover{
                background: #7a0000;
            }
        }

        &:hover{
            .icon{
                opacity: 1;
            }
        }
    }
</style>