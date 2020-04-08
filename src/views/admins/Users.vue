<template>
    <main>
        <page>
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

            <window>
                <vue-custom-scrollbar :settings="{suppressScrollY: true}" tagname="div" :class="['table', 'counter', isSearch?'isSearch':'']">
                    <div class="cell-items">
                        <div class="grid cell-titles">
                            <div class="cell">№ <br>п/п</div>
                            <div class="cell">ФИО</div>
                            <div class="cell">Организация</div>
                            <div class="cell">ИНН</div>
                            <div class="cell">Должность</div>
                            <div class="cell">E-Mail</div>
                            <div class="cell"></div>
                        </div>

                        <vue-custom-scrollbar :settings="{suppressScrollX: true}" v-if="usersFilter.length > 0" tagname="div" class="inner">
                            <div v-for="user in usersFilter" :key="user.id" :class="['grid', user.permission >= 20?'red':user.permission >= 9?'blue':'']">
                                <div class="cell"></div>
                                <div class="cell">{{user.surname}} {{user.name}} {{user.patronymic}}</div>
                                <div class="cell">{{user.user_companies[0].name}}</div>
                                <div class="cell">{{user.user_companies[0].taxpayer_identification_number}}</div>
                                <div class="cell">{{user.position}}</div>
                                <div class="cell">{{user.email}}</div>
                                <div class="cell icons">
                                    <button @click="open(user.id)"><i class="icon icon-eye"></i></button>
                                </div>
                            </div>
                        </vue-custom-scrollbar>

                        <div v-else-if="isLoaded === true">
                            <p class="not_found">Ничего не найдено...</p>
                        </div>

                    </div>
                </vue-custom-scrollbar>
            </window>

        </page>
    </main>
</template>

<script>
    import axios from 'axios';
    import Page from "../../components/anothers/Page";
    import Window from "../../components/anothers/Window";
    import vueCustomScrollbar from "vue-custom-scrollbar";

    export default {
        name: 'AdminUsers',
        components: {vueCustomScrollbar, Window, Page},
        data: function () {
            return {
                isLoaded: false,
                users: [],
                search: '',
                isSearch: false
            }
        },
        methods: {
            open(id) {
                this.$router.push(`/admin/user/${id}`);
            }
        },
        computed: {
            usersFilter: function () {
                return this.users.filter((user) => {
                    let fullname = `${user.surname} ${user.name} ${user.patronymic}`;
                    return fullname.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        created: function () {
            axios.get('dev/users').then(res => {
                this.users = res.data;
                this.isLoaded = true;

            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            })
        }
    }
</script>

<style lang="scss" scoped>
    main{
        overflow: hidden;
        .page{
            .tools{
                display: flex;
                justify-content: flex-end;
            }
            .window{
                max-width: 1400px;
                .table{
                    .inner{
                        max-height : calc(100vh - 320px);
                    }
                    .grid{
                        grid-template-columns: 90px minmax(250px, 300px) minmax(200px, 300px) 150px 200px 300px 90px;

                        &.red{
                            background: rgba(#7A0000, .04);
                        }
                        &.blue{
                            background: rgba(#4072A8, .08);
                        }
                    }
                }
            }
        }
    }
</style>