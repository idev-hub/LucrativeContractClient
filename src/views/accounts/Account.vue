<template>

    <main>
        <page class="lk-page">
            <div class="container">
                <div class="content">
                    <div class="actions" v-if="$route.meta.IS_ADMIN && isLoaded">
                        <div v-if="$store.getters.GET_PERMISSION >= 9 && User.permission < 9 || $store.getters.GET_PERMISSION >= 20 && User.permission < 20">
                            <button v-if="User.is_block" @click="showUnblockModal = true" class="btn btn-success">Разблокировать пользователя</button>
                            <button v-else  @click="showBlockModal = true" class="btn btn-dungeon">Заблокировать пользователя</button>
                        </div>
                        <div v-if="$store.getters.GET_PERMISSION >= 20 && User.permission < 20">
                            <button @click="showAddPermissionDialog = true" v-if="User.permission < 9" class="btn btn-primary">Назначить администратором</button>
                            <button @click="showRemovePermissionDialog = true" v-else class="btn btn-dungeon">Убрать права администратора</button>
                        </div>
                    </div>

                    <div class="grid g-column-2">

                        <div class="item" v-if="isLoaded">


                            <window class="window">
                                <header>
                                    <h3>Управление организацией</h3>
                                </header>


                                <main>

                                    <article>
                                        <h4>Организация</h4>
                                        <div class="edit-list">
                                            <div class="item">
                                                <string :val="UserCompanies[0].name" text="Название организации:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="company" names="name"/>
                                                <string :val="UserCompanies[0].taxpayer_identification_number"
                                                        min="10" max="12"
                                                        types="text" text="Инн:" editable="true" tables="company" names="taxpayerIdentificationNumber"/>
                                                <string :val="UserCompanies[0].code_reason"
                                                        min="9" max="9"
                                                        types="text" text="КПП:" editable="true" tables="company" names="codeReason"/>
                                                <string :val="UserCompanies[0].address"
                                                        min="3" max="128"
                                                        types="text" text="Адрес:"
                                                        editable="true" tables="company" names="address"/>
                                            </div>
                                        </div>
                                    </article>

                                    <article>
                                        <h4>Банковские реквизиты</h4>
                                        <div class="edit-list">
                                            <div class="item">
                                                <string :val="UserBanks[0].name" text="Наименование банка:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="bank" names="name"/>

                                                <string :val="UserBanks[0].correspondent_account" text="К/С:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="bank" names="correspondent_account"/>

                                                <string :val="UserBanks[0].bank_identification_code" text="БИК:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="bank" names="bank_identification_code"/>

                                                <string :val="UserBanks[0].payment_account" text="Р/С:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="bank" names="payment_account"/>
                                            </div>
                                        </div>
                                    </article>


                                    <types-section :payload="UserTypes"/>


                                </main>
                            </window>
                        </div>

                        <div class="item">

                            <window v-if="$route.meta.IS_ADMIN && isLoaded" class="mb-10 admins">
                                <header>
                                    <h3>Закупки</h3>
                                </header>
                                <main>
                                    <div class="btns">
                                        <router-link :to="`/admin/purchases/${$route.params.id}`" class="btn btn-green">
                                            Посмотреть закупки
                                        </router-link>
                                        <router-link :to="`/admin/history/purchases/${$route.params.id}`" class="btn btn-green-outline">
                                            Посмотреть историю закупок
                                        </router-link>
                                        <router-link :to="`/admin/messages/user/${$route.params.id}`">
                                            <i class="icon icon-chat"></i>Открыть чат с клиентом
                                        </router-link>
                                    </div>
                                </main>
                            </window>

                            <window v-if="isLoaded">

                                <header>
                                    <div class="flex justify-content-beetwen">
                                        <h3>Личные данные</h3>
                                        <img v-if="User.image_url" class="avatar" :src="`${$store.getters.URL}/${User.image_url}`" alt="user">
                                        <img v-else class="avatar" src="~@/assets/img/profile/user.png" alt="user">
                                    </div>
                                </header>

                                <main>
                                    <article v-if="isLoaded">

                                        <div class="edit-list">

                                            <div class="str">
                                                <p class="string">
                                                    <b>Роль: </b>
                                                    <label>
                                                        <span v-if="User.permission >= 20" class="color-red"><b>Гл. Администратор</b></span>
                                                        <span v-else-if="User.permission >= 9" class="color-blue"><b>Администратор</b></span>
                                                        <span v-else><b>Пользователь</b></span>
                                                    </label>
                                                </p>
                                            </div>

                                            <div class="item">
                                                <p class="string">
                                                    <b>Фотография:</b>
                                                    <label @click="showLoadPhotoModal = true" class="custom-load_file">
                                                        <span>Загрузить другое фото</span>
                                                    </label>
                                                </p>
                                                <string :val="User.login" text="Логин"
                                                        min="3" max="32"
                                                        types="text"
                                                        tables="main" names="login"/>

                                                <p class="string">
                                                    <b>Пароль:</b>
                                                    <label @click="showPasswordModal = true" class="custom-load_file">
                                                        <span>Сменить пароль</span>
                                                    </label>
                                                </p>

                                                <string :val="User.email" text="E-mail:"
                                                        min="3" max="32"
                                                        types="text"
                                                        tables="main" names="email"/>
                                                <string :val="fullName" text="ФИО:"
                                                        min="3" max="32"
                                                        types="text"
                                                        tables="main" names="fio"/>
                                                <string :val="User.position" text="Должность:"
                                                        min="3" max="32"
                                                        types="text" editable="true"
                                                        tables="main" names="position"/>
                                            </div>
                                        </div>

                                    </article>
                                </main>

                            </window>

                            <div v-if="!$route.meta.IS_ADMIN" class="flex justify-content-center">
                                <button @click="showLogoutModal = true" class="logout">Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </page>


        <modal :showModal="showRemovePermissionDialog" @close="showRemovePermissionDialog = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <span class="color-red">забрать</span><br><b>права администратора</b> у даного пользователя?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showRemovePermissionDialog = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="removePermission" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showAddPermissionDialog" @close="showAddPermissionDialog = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <span class="color-green">назначить</span><br><b>администратором</b> даного пользователя?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showAddPermissionDialog = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="addPermission" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>


        <modal :showModal="showBlockModal" @close="showBlockModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <span class="color-red">заблокировать</span> пользователя?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showBlockModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="blockUser" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showUnblockModal" @close="showUnblockModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <span class="color-green">разблокировать</span> пользователя?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showUnblockModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="unblockUser" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>


        <modal :showModal="showLogoutModal" @close="showLogoutModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите выйти?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showLogoutModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button @click="logout" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showLoadPhotoModal" @close="showLoadPhotoModal = false">
            <template v-slot:title>
                <h3>Загрузите новую фотографию</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <input @change="changeFile" ref="file" type="file"/>
                </div>
                <div v-if="sources" class="sources">
                    <img :src="sources" alt="new_avatar">
                </div>
                <div class="flex justify-content-center" v-if="isLoadPhotoButton === true">
                    <button @click="clickLoadPhoto" class="btn btn-green" :disabled="disabledButtonLoadPhoto">{{buttonText}}</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showPasswordModal" @close="showPasswordModal = false">
            <template v-slot:title>
                <h3>Смена пароля:</h3>
            </template>
            <template v-slot:content>
                <div>
                    <label class="input-default" for="inp-old_password">
                        <input v-model="oldPassword" id="inp-old_password" type="password" name="old_password" value=""
                                placeholder="Старый пароль" autocomplete="off" required/>
                    </label>
                </div>
                <div class="mt-5">
                    <label class="input-default" for="inp-new_password">
                        <input v-model="newPassword" id="inp-new_password" type="password" name="new_password" value="" placeholder="Новый пароль"
                                autocomplete="off" required/>
                    </label>
                </div>
                <div class="to mt-10">
                    <button type="button" class="btn btn-green-outline mr-5" @click="showPasswordModal = false">Отмена</button>
                    <button @click="switchPassword" type="submit" class="btn btn-green" name="yes">Сменить</button>
                </div>
            </template>
        </modal>

    </main>
</template>

<script>
    import axios from 'axios';
    import TypesSection from "../../components/account/sections/TypesSection";
    import Modal from "../../components/anothers/Modal";
    import Page from "../../components/anothers/Page";
    import Window from "../../components/anothers/Window";
    import String from "../../components/account/String";

    export default {
        name: 'account',
        components: {String, Window, Page, Modal, TypesSection},
        data() {
            return {
                isLoaded: false,
                showLoadPhotoModal: false,
                showPasswordModal: false,
                isLoadPhotoButton: false,
                showLogoutModal: false,
                showBlockModal: false,
                showUnblockModal: false,
                showRemovePermissionDialog: false,
                showAddPermissionDialog: false,
                UserTypes: [],
                UserBanks: [],
                UserCompanies: [],
                User: {},
                sources: '',
                file: undefined,
                buttonText: 'Сохранить',
                disabledButtonLoadPhoto: false,
                oldPassword: '',
                newPassword: ''
            }
        },
        created: function () {
            axios.get(`user/${this.$route.params.id||this.$store.getters.GET_USER_ID}`).then(res => {
                this.User = res.data || {};
                this.UserTypes = res.data.user_types || [];
                this.UserBanks = res.data.user_banks || [];
                this.UserCompanies = res.data.user_companies || [];
                this.isLoaded = true;
            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            })
        },
        computed: {
            fullName: function () {
                return `${this.User.surname} ${this.User.name} ${this.User.patronymic}`;
            }
        },
        methods: {
            addPermission: function(){
                axios.post(`user/${this.$route.params.id}/addPermission`).then(() => {
                    this.User.permission = 9;
                    this.showAddPermissionDialog = false;
                    this.$store.commit('ADD_HANDLER', {text: "Пользователь назначен администратором", classes: 'success'});
                }).catch(err => {
                    this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'});
                })
            },
            removePermission: function(){
                axios.post(`user/${this.$route.params.id}/removePermission`).then(() => {
                    this.User.permission = 0;
                    this.showRemovePermissionDialog = false;
                    this.$store.commit('ADD_HANDLER', {text: "У пользователя забраны права администратора", classes: 'success'});
                }).catch(err => {
                    this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'});
                })
            },
            blockUser: function () {
                axios.post(`user/${this.$route.params.id}/blocked`).then(() => {

                    this.User.is_block = true;
                    this.showBlockModal = false;
                    this.$store.commit('ADD_HANDLER', {text: "Пользователь заблокирован", classes: 'success'});
                }).catch(err => {
                    this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'});
                })
            },
            unblockUser: function () {
                axios.post(`user/${this.$route.params.id}/unblocked`).then(() => {

                    this.User.is_block = false;
                    this.showUnblockModal = false;
                    this.$store.commit('ADD_HANDLER', {text: "Пользователь разблокирован", classes: 'success'});
                }).catch(err => {
                    this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'});
                })
            },
            switchPassword(){
                axios.put(`user/password/${this.$route.params.id||this.$store.getters.GET_USER_ID}`, {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }).then(() => {

                    this.showPasswordModal = false;
                    this.$store.commit('ADD_HANDLER', {text: "Пароль успешно изменён", classes: 'success'});
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: "Ошибка загрузки... "+ err, classes: 'error'}));
            },
            changeFile(e){
                let file = e.target.files[0];
                if(file.type === "image/png" || file.type === "image/jpeg"){
                    if(file.size < 5242880){
                        this.sources = URL.createObjectURL(file);
                        this.file = file;
                        this.isLoadPhotoButton = true;
                        this.disabledButtonLoadPhoto = false;
                    } else this.$store.commit('ADD_HANDLER', {text: "Размер изображения превышает 5мб", classes: 'error'});
                } else this.$store.commit('ADD_HANDLER', {text: "Неверный формат изображения. Разрешены только image/png, image/jpeg", classes: 'error'});

            },
            clickLoadPhoto: function () {
                let formData = new FormData();
                formData.append('file', this.file);

                this.buttonText = 'Подождите...';
                this.disabledButtonLoadPhoto = true;

                axios.put(`user/photo/${this.$route.params.id||this.$store.getters.GET_USER_ID}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {

                    this.showLoadPhotoModal = false;
                    this.buttonText = 'Сохранить';
                    this.$router.go(0);

                }).catch(err => this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'}));
            },
            logout: function () {
                this.$store.dispatch("AUTH_LOGOUT").then(n => this.$router.go(n))
            }
        }
    }
</script>

<style lang="scss" scoped>

    .actions{
        display: grid;
        grid-gap: 20px;
        grid-auto-flow: column;
        grid-auto-columns: 250px;
        &>div{
            width: 100%;
        }
        .btn{
            width: 100%;
            font-size: .9em;
            padding: 0 20px;

        }
    }

    .item:first-child{
        .window:first-child{
            min-height: 720px;
            main{
                margin-top: 10px;
            }
        }
    }
    .sources{
        margin: 20px auto;
        img{
            display: table;
            margin: auto;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
        }
    }
    .admins{
        header{
            min-height: 0 !important;
        }
        .btns{
            display: grid;
            grid-gap: 20px;
            a{
                height: 50px;
                width: 100%;
                &:last-child{
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    i{
                        color: #1D8A34;
                        margin-right: 10px;
                        font-size: 1em;
                    }
                }
            }
        }
    }
    .edit-list {
        .item {
            margin-top            : 20px;
            display               : grid;
            grid-template-columns : 1fr;
            grid-auto-rows        : minmax(35px, auto);
        }
    }

</style>