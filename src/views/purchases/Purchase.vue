<template>
    <main>
        <page>
            <div class="content" v-if="isLoaded">
                <div class="tools">
                    <div class="tool">
                        <div>
                            <p>Последнее изменение: {{data.updatedAt | formatDate}}</p>
                            <router-link class="link" :to="`${this.$route.meta.IS_ADMIN?'/admin':''}/history/change/purchase/${this.$route.params.user}/${$route.params.id}`">
                                <i class="icon icon-eye color-green"></i> Просмотреть историю изменений
                            </router-link>
                        </div>
                    </div>
                </div>

                <window>
                    <vue-custom-scrollbar :settings="{suppressScrollY: true}" tagname="div" class="table">
                        <div class="cell-items">
                            <div class="grid cell-titles">
                                <div class="cell">Наименование поля</div>
                                <div class="cell">Значение</div>
                            </div>

                            <vue-custom-scrollbar :settings="{suppressScrollX: true}" tagname="div" class="inner">
                                <div class="grid" v-for="field in fields" :key="field.title">
                                    <div class="cell">{{field.title}}</div>
                                    <div class="cell" v-html="field.text"></div>
                                </div>
                            </vue-custom-scrollbar>

                        </div>
                    </vue-custom-scrollbar>

                </window>

                <div class="items">
                    <div class="item">
                        <button @click="clickOpenChat"><i class="icon icon-chat color-green"></i> Открыть чат по этой
                            закупки
                        </button>
                    </div>
                    <div class="item">
                        <button @click="clickEdit"><i class="icon icon-edit color-green"></i> Изменить закупку</button>
                    </div>
                    <div class="item">
                        <button v-if="data.status.id === 1" @click="showRestoreModal = true">
                            <i class="icon icon-arrow-top color-green"></i> Восстановить закупку
                        </button>
                        <button v-if="data.status.id !== 1" @click="showDeleteModal = true">
                            <i class="icon icon-arrow-top color-red"></i> Удалить закупку
                        </button>
                    </div>
                </div>

            </div>

        </page>

        <modal :showModal="showDeleteModal" @close="showDeleteModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <b class="color-red">удалить</b> закупку?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showDeleteModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="clickRemove" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showRestoreModal" @close="showRestoreModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <b class="color-green">восстановить</b> закупку?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showRestoreModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="clickRestore" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>
    </main>
</template>
<script>
    import axios from "axios";
    import Modal from "../../components/anothers/Modal";
    import moment from 'moment';
    import vueCustomScrollbar from "vue-custom-scrollbar";
    import Page from "../../components/anothers/Page";
    import Window from "../../components/anothers/Window";

    export default {
        name: 'purchase',
        components: {Window, Page, Modal, vueCustomScrollbar},
        data: function () {
            return {
                fields: [],
                data: [],
                isLoaded: false,
                showDeleteModal: false,
                showRestoreModal: false
            }
        },
        filters: {
            formatDate: function (value) {
                if (value) {
                    return moment(String(value)).format('DD.MM.YYYY в hh:mm')
                }
            }
        },
        methods: {
            clickEdit: function () {
                if (this.$route.meta.IS_ADMIN) {
                    this.$router.push(`/admin/change/purchase/${this.$route.params.user}/${this.$route.params.id}`);
                } else {
                    this.$router.push(`/change/purchase/${this.$route.params.user}/${this.$route.params.id}`);
                }
            },
            clickOpenChat: function () {

            },
            clickRestore: function () {
                axios.post(`purchase/${this.$route.params.id}/restore`).then(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: 'Закупка успешно восстановлена',
                        classes: 'success'
                    });
                    this.data.status.id = 3;
                    this.showRestoreModal = false;
                }).catch(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: `Ошибка... Закупка не была восстановлена.`,
                        classes: 'error'
                    })
                })
            },
            clickRemove: function () {
                axios.delete(`purchase/${this.$route.params.id}`).then(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: 'Закупка успешно удалена',
                        classes: 'success'
                    });
                    this.data.status.id = 1;
                    this.showDeleteModal = false
                }).catch(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: `Ошибка... Закупка не была удалена.`,
                        classes: 'error'
                    })
                })
            }
        },
        created: function () {
            axios.get(`purchase/${this.$route.params.user || this.$store.getters.GET_USER_ID}/${this.$route.params.id}`).then(res => {

                let arr = [];

                for (let k in res.data) {
                    let obj;


                    if (k === 'advantages' && res.data[k].length > 0) {
                        let obj2 = "";
                        for (let i = 0; i < res.data[k].length; i++) {
                            obj2 += `<p class="string"><span class="color-green">${res.data[k][i].advantage.name}</span> <small>${res.data[k][i].advantage.description}</small></p>`
                        }
                        obj = {
                            title: 'Преимущества, предоставляемые в соответствии со ст.28 - 30 Закона о контрактной системе',
                            text: obj2
                        }
                    }

                    if (k === 'documents' && res.data[k].length > 0) {
                        let obj2 = "";
                        for (let i = 0; i < res.data[k].length; i++) {
                            obj2 += `<p class="string"><a target="_blank" href="${this.$store.getters.URL}/${res.data[k][i].document_url}" class="color-green">${res.data[k][i].document_url}</a></p>`
                        }
                        obj = {
                            title: 'Документы',
                            text: obj2
                        }
                    }


                    if (k === 'method') obj = {
                        title: 'Метод закупки',
                        text: res.data[k].name
                    };

                    if (k === 'status') obj = {
                        title: 'Статус',
                        text: res.data[k].name
                    };

                    if (k === 'responsible') obj = {
                        title: 'Ответственное лицо',
                        text: `${res.data[k].surname} ${res.data[k].name} ${res.data[k].patronymic}`
                    };

                    if (k === 'user') obj = {
                        title: 'Закупка создана',
                        text: `${res.data[k].surname} ${res.data[k].name} ${res.data[k].patronymic}`
                    };

                    if (k === 'execution_size') obj = {
                        title: 'Размер обеспечения исполнения контракта',
                        text: `${res.data[k]} ( ${res.data.execution_percent}% )`
                    };

                    if (k === 'name') obj = {title: 'Наименование закупки'};
                    if (k === 'initial_maximum_contract_price') obj = {title: 'НМЦК'};

                    if (k === 'delivery_time') obj = {
                        title: 'Срок поставки',
                        text: moment(res.data[k]).format('до DD.MM.YYYY')
                    };

                    if (k === 'deadline') obj = {
                        title: 'Срок исполнения',
                        text: moment(res.data[k]).format('DD.MM.YYYY')
                    };

                    if (k === 'delivery_address') obj = {title: 'Место поставки товара\n (оказания услуг, выполнения работ)'};
                    if (k === 'quantity') obj = {
                        title: 'Кол-во товара',
                        text: `${res.data[k]} (${res.data.unit.name})`
                    };

                    if (k === 'createdAt') obj = {
                        title: 'Дата создания',
                        text: moment(res.data[k]).format('DD.MM.YYYY в hh:mm')
                    };

                    if (obj !== undefined) {
                        if (obj.text === undefined) obj.text = res.data[k];
                        arr.push(obj);
                    }
                }

                this.data = res.data;
                this.fields = arr;
                this.isLoaded = true;

            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            })
        }
    }
</script>

<style lang="scss" scoped>

    .content {
        max-width : 900px;
        margin    : auto;


        .window {
            min-width : 0;
            width     : 900px;
            max-width : 100%;


            .table {


                .inner {
                    max-height : calc(100vh - 400px);
                    @media(max-width : 1000px) {
                        max-height : none;
                    }
                }

                .grid {
                    &:not(.cell-titles) {
                        grid-auto-rows : auto;
                    }

                    grid-template-columns : 1fr 1fr;

                    .cell {
                        justify-content : center;
                        text-align      : left;
                        padding         : 18px 30px;
                        flex-direction  : column;
                        align-items     : start;
                    }
                }
            }
        }

        .tools {
            justify-content : end;

            .tool {
                text-align : right;

                p {
                    margin-bottom : 10px;
                }

                .link {
                    font-weight : bold;

                    .icon {
                        position     : relative;
                        top          : 3px;
                        font-size    : 1.2em;
                        margin-right : 10px;
                    }
                }
            }
        }

        .items {
            display         : flex;
            justify-content : space-between;
            @media(max-width : 1000px) {
                flex-wrap       : wrap;
                align-items     : center;
                justify-content : center;
            }

            .item {
                padding : 30px;

                button {
                    background : none;
                    border     : none;
                    cursor     : pointer;
                    outline    : none;

                    .icon {
                        margin-right : 10px;
                        font-size    : .9em;
                        position     : relative;
                        top          : 2px;
                    }
                }
            }
        }
    }
</style>