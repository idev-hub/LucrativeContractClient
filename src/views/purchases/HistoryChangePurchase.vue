<template>
    <main>
        <page>
            <div class="content">
                <div class="tools flex align-items-center justify-content-start">
                    <router-link :to="`${this.$route.meta.IS_ADMIN?'/admin':''}/view/purchase/${this.$route.params.user}/${$route.params.id}`">
                        <i class="icon icon-arrow-left color-green"></i> Вернуться в закупку
                    </router-link>
                </div>

                <window v-if="isLoaded">

                    <div class="table counter">
                        <div class="cell-items">
                            <div class="grid cell-titles">
                                <div class="cell">№ <br>п/п</div>
                                <div class="cell">Изменения</div>
                            </div>

                            <vue-custom-scrollbar v-if="items.histories.length > 0" tagname="div" class="inner">
                                <div v-for="item in items.histories" :key="item.id" class="grid">
                                    <div class="cell"></div>
                                    <div class="cell">{{item.user.surname}} {{item.user.name}} {{item.user.patronymic}}
                                        - {{item.title}}<br>{{item.createdAt | formatDate}}
                                    </div>
                                </div>
                            </vue-custom-scrollbar>

                            <div v-else>
                                <p class="not_found">Ничего нет...</p>
                            </div>

                        </div>
                    </div>

                </window>
            </div>
        </page>
    </main>
</template>

<script>
    import axios from "axios";
    import vueCustomScrollbar from "vue-custom-scrollbar";
    import moment from 'moment';
    import Page from "../../components/anothers/Page";
    import Window from "../../components/anothers/Window";

    export default {
        name: 'HistoryChangePurchase',
        components: {
            Window,
            Page,
            vueCustomScrollbar
        },
        data: function () {
            return {
                items: [],
                isLoaded: false
            }
        },
        filters: {
            formatDate: function (value) {
                if (value) {
                    return moment(String(value)).format('DD.MM.YYYY в hh:mm')
                }
            }
        },
        created: function () {
            axios.get(`purchase/${this.$route.params.user}/${this.$route.params.id}`).then(res => {
                this.isLoaded = true;
                this.items = res.data;
            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            })
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        max-width : 1000px;
        margin: auto;

        .table {
            .inner {
                max-height : calc(100vh - 300px);
                @media(max-width: 1000px){
                    max-height : none;
                }
            }

            .grid {
                grid-template-columns : 90px 1fr;
                grid-auto-rows        : auto;

                .cell {
                    justify-content : start;
                    padding         : 15px 30px;
                    text-align      : left;
                    line-height     : 1.4em;

                    &:first-child {
                        justify-content : center;
                    }
                }
            }
        }
    }
</style>