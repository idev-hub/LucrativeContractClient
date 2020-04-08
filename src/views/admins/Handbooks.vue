<template>
    <main>
        <page>
            <div class="content">
                <window>
                    <p class="color-red p-5"><small>Вы не можете НАВСЕГДА удалить данные в релизе системы, только их скрыть от пользователей и востановить, создавайте справочники осторожно, удалить их насовсем Вы не сможете. Это нарушит работу системы. <br><br>
                        То есть, удаляя справочник - он удаляеться как возможность создать закупку с этими данными, на готовых закупках где использовался справочник, он остается</small> </p>
                </window>

                <window>

                    <div class="flex">
                        <div>
                            <div class="items">
                                <div class="input-button">
                                    <label for="system-name"><span>Название системы</span></label>
                                    <div>
                                        <input v-model="system.name" id="system-name" type="text" placeholder="Выгодный контракт"/>
                                        <button @click="changeSystemData" class="btn btn-green btn-small"><i class="icon icon-ok"></i></button>
                                    </div>
                                </div>

                                <div class="input-button mt-5">
                                    <label for="system-phone"><span>Номер телефона</span></label>
                                    <div>
                                        <input v-model="system.phone" id="system-phone" type="text" placeholder="+7(999) 99-999-99"/>
                                        <button @click="changeSystemData" class="btn btn-green btn-small"><i class="icon icon-ok"></i></button>
                                    </div>
                                </div>

                                <div class="input-button mt-5">
                                    <label for="system-email"><span>Email</span></label>
                                    <div>
                                        <input v-model="system.email" id="system-email" type="text" placeholder="example@example.com"/>
                                        <button @click="changeSystemData" class="btn btn-green btn-small"><i class="icon icon-ok"></i></button>
                                    </div>
                                </div>

                            </div>

                            <div class="items">
                                <div class="item" v-if="isLoaded">
                                    <div class="header">
                                        <h4>
                                            Ответсвенные лица
                                        </h4>
                                        <p class="color-red p-5"><small>ID пользователя вы можете узнать перейдя в профиль к нужному пользователю и посмотрев в адрессную строку. Там будет ссылка ввида <span class="color-black"> /admin/user/1 </span> - где <span class="color-black">1</span> это ID пользователя</small> </p>
                                    </div>
                                    <div class="main">
                                        <div class="list">
                                            <div v-for="(el, index) in responsible_people" :key="index" class="el">
                                                <p>{{el.User.surname}} {{el.User.name}} {{el.User.patronymic}}</p>
                                                <div class="actions">
                                                    <button @click="responsible_people_remove(index)" class="btn">
                                                        <i class="icon icon-close color-red"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <label class="input-custom"> <input v-model="responsible_people_ID" type="number" placeholder="ID Пользователя"> </label>
                                        <button @click="responsible_people_add" class="btn btn-green">Добавить</button>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <div class="items">
                                <handbook-item v-if="isLoaded" :list="units" name="purchase/units">Единицы измерения
                                </handbook-item>
                            </div>

                            <div class="items">
                                <handbook-item v-if="isLoaded" :list="types" name="user/types">Типы пользователей
                                </handbook-item>
                            </div>
                        </div>

                        <div>
                            <div class="items">
                                <handbook-item v-if="isLoaded" :list="methods" name="purchase/methods">Методы закупки
                                </handbook-item>
                            </div>

                            <div class="items">
                                <handbook-item v-if="isLoaded" :list="statuses" name="purchase/statuses">Статусы
                                </handbook-item>
                            </div>
                        </div>
                    </div>
                </window>

            </div>
        </page>
    </main>
</template>

<script>
    import Window from "../../components/anothers/Window";
    import Page from "../../components/anothers/Page";
    import HandbookItem from "../../components/handbooks/handbook-item";
    import axios from "axios";

    export default {
        name: 'AdminHandbooks',
        components: {HandbookItem, Page, Window},
        data: function () {
            return {
                isLoaded: false,
                methods: [],
                types: [],
                statuses: [],
                units: [],
                responsible_people: [],
                responsible_people_ID: '',
                system: this.$store.getters.GET_SYSTEM
            }
        },
        methods: {
            responsible_people_remove(id){
                axios.delete(`/handbook/purchase/responsible_people/${this.responsible_people[id].id}`).then(() => {
                    this.responsible_people.remove(this.responsible_people[id]);
                    this.$store.commit('ADD_HANDLER', {text: "Успешно удалено", classes: 'success'});
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: err.responsible.data.message, classes: 'error'}));
            },
            responsible_people_add(){
                axios.post(`/handbook/purchase/responsible_people`, {
                    user_id: this.responsible_people_ID
                }).then(people => {
                    this.responsible_people.push(people.data);
                    this.responsible_people_ID = '';
                    this.$store.commit('ADD_HANDLER', {text: "Успешно создано", classes: 'success'});
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'}));
            },
            changeSystemData(){
                axios.post('system', null, {
                    params: {
                        name: this.system.name,
                        phone: this.system.phone,
                        email: this.system.email
                    }
                }).then(system => {
                    this.$store.dispatch('UPDATE_SYSTEM', system.config.params);
                    this.$store.commit('ADD_HANDLER', {
                        text: "Успешно изменено",
                        classes: 'success'
                    })
                }).catch(err => this.$store.commit('ADD_HANDLER', {
                    text: "Ошибка запроса... " + err,
                    classes: 'error'
                }))
            }
        },
        created: function () {
            axios.get('handbook/purchase/methods',{params: {all: true}}).then(res => {
                this.methods = res.data;

                axios.get('handbook/user/types', {params: {all: true}}).then(res => {
                    this.types = res.data;

                    axios.get('handbook/purchase/statuses', {params: {all: true}}).then(res => {
                        this.statuses = res.data.filter(e => e.id !== 1 && e.id !== 2 && e.id !== 3);

                        axios.get('handbook/purchase/units', {params: {all: true}}).then(res => {
                            this.units = res.data;

                            axios.get('handbook/purchase/responsible_people').then(res => {
                                this.responsible_people = res.data;
                                this.isLoaded = true;

                            }).catch(err => this.$store.commit('ADD_HANDLER', {
                                text: "Ошибка получения данных... " + err,
                                classes: 'error'
                            }))
                        }).catch(err => this.$store.commit('ADD_HANDLER', {
                            text: "Ошибка получения данных... " + err,
                            classes: 'error'
                        }))
                    }).catch(err => this.$store.commit('ADD_HANDLER', {
                        text: "Ошибка получения данных... " + err,
                        classes: 'error'
                    }))
                }).catch(err => this.$store.commit('ADD_HANDLER', {
                    text: "Ошибка получения данных... " + err,
                    classes: 'error'
                }))
            }).catch(err => this.$store.commit('ADD_HANDLER', {
                text: "Ошибка получения данных... " + err,
                classes: 'error'
            }))
        }
    }
</script>

<style lang="scss" scoped>

    .item {
        padding       : 20px;
        border-radius : 14px;

        .header {
            font-size : 1em;
            small{
                font-size: .7em;
            }
        }

        .main {
            margin    : 20px 0;

            .list {
                list-style : none;

                .el {
                    margin          : 10px 0;
                    display         : flex;
                    height          : 30px;
                    align-items     : center;
                    justify-content : space-between;
                    border-bottom   : 1px solid #aaa;

                    .actions {
                        display         : flex;
                        align-items     : center;
                        justify-content : center;
                        margin-left     : 20px;

                        .btn {
                            background : none;
                            border     : none;
                            min-width  : 0;
                            width      : 30px;
                            font-size  : .8em;
                            padding    : 0;
                            height     : 30px;
                        }
                    }
                }
            }

            font-size : .9em;
        }

        .footer {
            label {
                width        : 100%;
                margin-right : 20px;

                input {
                    border        : 1px solid #33A54B;
                    border-radius : 25px;
                    height        : 40px;
                    padding       : 0 20px;
                    background    : #fff;
                }
            }

            .btn {
                height    : 40px;
                min-width : 0;
                width     : 150px;
            }

            display : flex;
        }
    }

    .window {
        margin-top : 40px;

        & > div {
            display: flex;
            flex-wrap: wrap;
            & > div {
                width: 33%;
                padding : 20px;
                box-sizing: border-box;
                @media (max-width: 1200px) {
                    width: 50%;
                }
                @media (max-width: 900px) {
                    width: 100%;
                }

                & > .header {
                    padding   : 0 0 20px 0;
                    font-size : 1em;
                }

                & > .items {
                    margin : 20px 0;
                }
            }
        }
    }
</style>