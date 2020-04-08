<template>
    <main>
        <page class="index-page">
            <div class="content">
                <div class="tools">
                    <div class="tool">
                        <div :class="['search', isSearch === true?'isSearch':'']">
                            <div class="masked"></div>
                            <label class="input-icon"> <i class="icon icon-search"></i>
                                <input @focusin="isSearch = true" @focusout="isSearch = false" v-model="search" type="search" placeholder="Поиск">
                            </label>
                        </div>
                    </div>
                </div>
                <window v-if="isLoaded === true">
                    <vue-custom-scrollbar :settings="{suppressScrollY: true}" tagname="div" :class="['table', 'counter', 'scroll-area', isSearch?'isSearch':'']">
                        <div class="cell-items">
                            <div class="grid cell-titles">
                                <div class="cell">№ <br>п/п</div>
                                <div class="cell">Наименование закупки</div>
                                <div class="cell">НМЦК</div>
                                <div class="cell">Статус</div>
                                <div class="cell">Срок исполнения</div>
                                <div class="cell">Ответственное лицо</div>
                                <div class="cell">Действие</div>
                            </div>

                            <vue-custom-scrollbar :settings="{suppressScrollX: true}" v-if="purchasesFilter.length > 0" tagname="div" class="inner">
                                <purchase-item :notDelete=true :notEditable=true v-for="purchase in purchasesFilter" :key="purchase.id" :data="purchase" @remove="removeItem($event)"/>
                            </vue-custom-scrollbar>

                            <div v-else>
                                <p class="not_found">Ничего не найдено...</p>
                            </div>

                        </div>
                    </vue-custom-scrollbar>
                </window>
            </div>
        </page>
    </main>
</template>

<script>
    import axios from "axios";
    import PurchaseItem from "../../components/purchases/table/PurchaseItem";
    import vueCustomScrollbar from "vue-custom-scrollbar";
    import Window from "../../components/anothers/Window";
    import Page from "../../components/anothers/Page";

    export default {
        name: 'HistoryPurchases',
        components: {Page, Window, PurchaseItem, vueCustomScrollbar},
        data: function () {
            return {
                purchases: [],
                isLoaded: false,
                search: '',
                isSearch: false
            }
        },
        computed: {
            purchasesFilter: function () {
                return this.purchases.filter((pur) => {
                    return pur.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        created: function () {

            let url;
            if(this.$route.params.id && this.$route.meta.IS_ADMIN){
                url = `purchases/${this.$route.params.id}`;
            } else {
                url = `purchases/${this.$store.getters.GET_USER_ID}`;
            }

            axios.get(url, {params: {where: 'history'}}).then(res => {
                this.purchases = res.data;
                this.isLoaded = true;
            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            });

        },
        methods: {
            removeItem: function (item) {
                for (let i = 0; i < this.purchases.length; i++)
                    if (this.purchases[i].id === item)
                        this.purchases.splice(i, 1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        .tools{
            justify-content: end;
        }
        .table {
            .inner {
                max-height : calc(100vh - 380px);
                @media(max-width: 1000px){
                    max-height : none;
                }
            }
        }
    }
</style>