<template>
    <div>
        <header class="fixed-header">
            <div class="container">
                <a class="link" href="/"><i class="icon icon-arrow-left color-green mr-5"></i>Вернуться на сайт</a>
            </div>
        </header>


        <section>


            <div class="container">

                <div class="flex">

                    <div class="win-left flex flex-column align-items-center">
                        <window>

                            <div class="flex justify-content-center flex-column align-items-center">
                                <header>
                                    <a href="/"><img width="224px" src="~@/assets/img/logo.png" alt="Выгодный контакт"></a>
                                </header>

                                <main>
                                    <div class="mb-10 form-default flex flex-column">

                                        <label class="input-default mb-5" :class="{ 'invalid': $v.login.$error}">
                                            <input v-model="$v.login.$model" type="text" placeholder="Логин">
                                            <div v-if="$v.login.$error" class="errors">
                                                <span v-if="$v.login.hasOwnProperty('minLength')?!$v.login.minLength:false">* Не менее {{$v.login.$params.minLength.min}} символов</span>
                                                <span v-if="$v.login.hasOwnProperty('maxLength')?!$v.login.maxLength:false">* Не более {{$v.login.$params.maxLength.max}} символов</span>
                                            </div>
                                        </label>

                                        <label class="input-default mb-5" :class="{ 'invalid': $v.password.$error}">
                                            <input v-model="$v.password.$model" type="password" placeholder="Пароль">
                                            <div v-if="$v.password.$error" class="errors">
                                                <span v-if="$v.password.hasOwnProperty('minLength')?!$v.password.minLength:false">* Не менее {{$v.password.$params.minLength.min}} символов</span>
                                                <span v-if="$v.password.hasOwnProperty('maxLength')?!$v.password.maxLength:false">* Не более {{$v.password.$params.maxLength.max}} символов</span>
                                            </div>
                                        </label>

                                        <div class="mt-5 flex justify-content-center">
                                            <button class="btn btn-green" type="submit" @click="handleLogin">Войти</button>
                                        </div>

                                        <div class="text-center flex align-items-center justify-content-center">
                                            <p class="pt-4 color-red" id="output"></p></div>

                                    </div>

                                    <a class="mt-5 flex align-items-center justify-content-center fs-16" id="login-social-esia" href="#">
                                        <img src="~@/assets/img/esia.png" alt="гос. услуги">
                                        <p class="ml-5 color-gray">Войти с помощью ЕСИА</p>
                                    </a>
                                </main>

                            </div>
                        </window>

                        <p class="target mt-10 color-white">
                            <router-link class="link" to="/register">Создать аккаунт</router-link>
                        </p>
                    </div>

                    <div class="pl-10 ml-10 flex flex-column color-white description-block">
                        <h1>Ваш тендерный отдел на расстоянии</h1>
                        <p>Поможем начинающим и опытным поставщикам на любом этапе торгов: от анализа закупки до участия
                            в аукционе и защиты интересов в ФАС.</p>
                    </div>

                </div>

            </div>
        </section>

        <footer class="fixed-footer">
            <div class="container flex justify-content-center align-items-center">
                <p class="copyright">Разработано в 2020</p>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    section{
        display: flex;
        align-items: center;
        min-height: 100vh;
        flex-wrap: wrap;
        .win-left{
            max-width: 420px;
            width: 100%;
            margin-left: 100px;
            @media (max-width: 1000px) {
                margin-left: 50px;
            }
            @media (max-width : 850px) {
                margin: 100px auto;
            }
        }
        .window{
            width: 100%;
        }
    }
    .invalid > input{
        border-color: #7A0000;
    }
    .errors{
        color: #7A0000;
        span{
            display: table;
            margin: 10px 0;
        }
    }
</style>

<script>
    import Window from "../components/anothers/Window";
    import {maxLength, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: 'login',
        components: {Window},
        data() {
            return {
                login: "",
                password: ""
            }
        },
        validations: {
            login: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(32)
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(128)
            }
        },
        methods: {
            handleLogin() {

                if(!this.$v.$error){
                    let login = this.login,
                        password = this.password;

                    this.$store.dispatch("AUTH_REQUEST", {login, password})
                        .then(n => this.$router.go(n))
                        .catch(err => {
                            this.$store.commit('ADD_HANDLER', {text: err.response.data.message, classes: 'error'});
                        })
                }

            }
        }
    }
</script>
