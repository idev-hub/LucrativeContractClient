<template>
    <section class="page">
        <header>
            <slot name="header">
                <h2>{{$route.name}}</h2>

                <button @click="showAsideMobile" class="btn btn-mobile"><i class="icon icon-menu"></i></button>
            </slot>
        </header>

        <main>
            <slot></slot>
        </main>
    </section>
</template>

<style lang="scss">
    .page {

        .btn-mobile{
            position: fixed;
            z-index : 10000;
            max-width: 50px;
            min-width: 50px;
            max-height: 50px;
            min-height: 50px;
            right: 20px;
            border: none;
            float: right;
            font-size: 1.5em;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 12px rgba(#000, .1);

            @media (min-width: 850px) {
                display: none;
            }

        }

        & > header {
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media (max-width: 850px) {
                padding-right: 90px;
            }

            h2 {
                font-family    : "Proxima Nova Rg", "Arial", serif;
                font-weight    : bold;
                color          : #33A54B;
                padding-left   : 80px;
                position       : relative;
                font-size      : 1.6em;
                text-transform : uppercase;
                display        : table;

                @media(max-width: 500px){
                    padding-left: 30px;
                    font-size: 1.3em;
                }



                &:before {
                    content    : '';
                    position   : absolute;
                    left       : 0;
                    bottom     : -5px;
                    background : #33A54B;
                    height     : 1.5px;
                    width      : 102%;
                }
            }
        }

        & > main {
            padding    : 0 30px 30px 30px;
            box-sizing : border-box;
            max-width  : 100%;
        }
    }
</style>

<script>
    export default {
        name: "Page",
        methods: {
            showAsideMobile(){
                this.$store.commit('UPDATE_MOBILE_MENU');
            }
        }
    }
</script>