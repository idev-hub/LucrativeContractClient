<template>
    <transition name="modal">
        <div v-if="showModal" class="modal">
            <div class="body">
                <div class="headerModal">
                    <h3 class="title">
                        <slot name="title"></slot>
                    </h3>
                    <button class="close" @click="$emit('close')"><i class="icon icon-close"></i></button>
                </div>
                <div class="contentModal">
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        props: ['showModal'],
        data: function () {
            return {
                isModal: this.showModal
            }
        },
        handler() {
            return this.showModal
        }
    }
</script>

<style lang="scss">

    @keyframes inModal {
        0% {
            transform : scale(0);
        }
        50% {
            transform : scale(1.1);
        }
        100% {
            transform : scale(1);
        }
    }

    .modal {
        position         : fixed;
        width            : 100%;
        height           : 100%;
        top              : 0;
        left             : 0;
        z-index          : 100;
        transition       : .3s;
        background-color : rgba(#000000, .4);
        align-items      : center;
        justify-content  : center;
        display          : grid;

        .body {
            min-width          : 300px;
            max-width          : 100%;
            background-color   : #FFFFFF;
            border-radius      : 20px;
            box-sizing         : border-box;
            padding            : 30px 50px;
            box-shadow         : 0 9px 40px rgba(#000000, .05);
            display            : grid;
            grid-template-rows : 30px 1fr;
            grid-gap           : 40px;
            align-items        : center;


            .headerModal {
                display         : flex;
                align-items     : start;
                justify-content : space-between;

                .title {
                    font-size   : 18px;
                    font-family : 'Proxima Nova Th', 'Arial', serif;
                    margin      : 0; padding : 0;
                }

                .close {
                    background  : none;
                    border      : none;
                    float       : right;
                    cursor      : pointer;
                    width       : 30px;
                    height      : 30px;
                    outline     : none;
                    margin-left : 60px;
                }
            }

            .contentModal {
                .to {
                    display         : flex;
                    align-items     : center;
                    justify-content : start;
                }

                .to-2 {
                    display         : flex;
                    justify-content : space-between;
                    align-items     : center;
                }
            }
        }

        .btn {
            min-width : 100px;
            padding   : 0 20px;
        }
    }

    .modal-enter-active {
        .body {
            animation : inModal .3s;
        }
    }

    .modal-leave-active {
        .body {
            animation : inModal .3s reverse;
        }
    }

    .modal-enter-active, .modal-leave-active {
        opacity : 1;

    }

    .modal-enter, .modal-leave-to {
        opacity : 0;
    }

</style>