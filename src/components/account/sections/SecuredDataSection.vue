<template>
    <window>

        <header>
            <div class="flex justify-content-beetwen">
                <h3>Личные данные</h3>
                <img class="avatar" src="~@/assets/img/profile/user.png" alt="user">
            </div>
        </header>

        <main>
            <article>

                <div class="edit-list">
                    <div class="item">
                        <p class="string">
                            <b>Фотография:</b>
                            <label @click="showLoadPhotoModal = true" class="custom-load_file">
                                <span>Загрузить другое фото</span>
                            </label>
                        </p>
                        <string :val="login" text="Логин"
                                min="3" max="32"
                                types="text"
                                tables="main" names="login"/>

                        <p class="string">
                            <b>Пароль:</b>
                            <label @click="showPasswordModal = true" class="custom-load_file">
                                <span>Сменить пароль</span>
                            </label>
                        </p>

                        <string :val="email" text="E-mail:"
                                min="3" max="32"
                                types="text"
                                tables="main" names="email"/>
                        <string :val="fullName" text="ФИО:"
                                min="3" max="32"
                                types="text"
                                tables="main" names="fio"/>
                        <string :val="position" text="Должность:"
                                min="3" max="32"
                                types="text" editable="true"
                                tables="main" names="position"/>
                    </div>
                </div>

            </article>
        </main>

        <modal :showModal="showLoadPhotoModal" @close="showLoadPhotoModal = false">
            <template v-slot:title>
                <h3>Загрузите новую фотографию</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <input @change="isLoadPhotoButton = false" ref="photo" type="file">
                    <button @click="clickLoadPhoto" class="btn btn-green pr-5 pl-5" :disabled="isLoadPhotoButton">Загрузить</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showPasswordModal" @close="showPasswordModal = false">
            <p>Смена пароля:</p>

            <div class="mt-5">
                <label class="mb-10 mt-10 input-default" for="inp-old_password">
                    <input id="inp-old_password" type="password" name="old_password" value=""
                           placeholder="Старый пароль" autocomplete="off" required/>
                </label>

                <label class="mb-10 input-default" for="inp-new_password">
                    <input id="inp-new_password" type="password" name="new_password" value="" placeholder="Новый пароль"
                           autocomplete="off" required/>
                </label>
            </div>

            <div class="buttons">
                <button type="button" class="btn btn-green-outline" @click="showPasswordModal = false">Отмена</button>
                <button type="submit" class="btn btn-green" name="yes">Сменить</button>
            </div>
        </modal>

    </window>
</template>

<script>
    import String from "../String";
    import Modal from "../../anothers/Modal";
    import Window from "../../anothers/Window";

    export default {
        name: "SecuredDataSection",
        components: {Window, Modal, String},
        props: ['payload'],
        data: function () {
            return {
                showLoadPhotoModal: false,
                showPasswordModal: false,
                isLoadPhotoButton: true,
                photo: '',
                login: "",
                email: "",
                position: ""
            }
        },
        methods: {
            clickLoadPhoto: function () {
                let formData = new FormData();
                let photo = this.$refs.photo.files[0];

                formData.append('file', photo);
            }
        },
        computed: {
            fullName: function () {
                return `${this.payload.surname} ${this.payload.name} ${this.payload.patronymic}`;
            }
        },
        created: function () {
            this.login = this.payload.login;
            this.email = this.payload.email;
            this.position = this.payload.position;
        }
    }
</script>

<style lang="scss" scoped>
    .item{
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(35px, auto);
    }
</style>