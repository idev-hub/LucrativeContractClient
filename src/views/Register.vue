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
                                    <button v-if="steps.count > 1" @click="steps.count--" class="btn-back color-gray"><i class="icon icon-arrow-left color-green"></i></button>
                                    <p class="steps"> Шаг {{steps.count}} из 4</p>
                                    <div :class="['progress', 'step-'+steps.count]"></div>
                                </header>

                                <main v-if="steps.count === 1">
                                    <label class="input-default" :class="{ 'invalid': $v.steps['1'].full_name.$error}">
                                        <input v-model="$v.steps['1'].full_name.$model" type="text" placeholder="ФИО *">
                                        <div v-if="$v.steps['1'].full_name.$error" class="errors">
                                            <span v-if="$v.steps['1'].full_name.hasOwnProperty('minLength')?!$v.steps['1'].full_name.minLength:false">* Не менее {{$v.steps['1'].full_name.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['1'].full_name.hasOwnProperty('maxLength')?!$v.steps['1'].full_name.maxLength:false">* Не более {{$v.steps['1'].full_name.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['1'].position.$error}">
                                        <input v-model="$v.steps['1'].position.$model" type="text" placeholder="Должность *">
                                        <div v-if="$v.steps['1'].position.$error" class="errors">
                                            <span v-if="$v.steps['1'].position.hasOwnProperty('minLength')?!$v.steps['1'].position.minLength:false">* Не менее {{$v.steps['1'].position.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['1'].position.hasOwnProperty('maxLength')?!$v.steps['1'].position.maxLength:false">* Не более {{$v.steps['1'].position.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <div class="types">
                                        <label><span>Тип клиента</span></label>

                                        <div class="grid">

                                            <div class="checkbox-custom small">
                                                <label> <input type="checkbox" hidden>
                                                    <div class="checkbox"></div>
                                                    <p>Заказчик 44-ФЗ</p>
                                                </label>
                                            </div>

                                            <div class="checkbox-custom small">
                                                <label> <input type="checkbox" hidden>
                                                    <div class="checkbox"></div>
                                                    <p>Заказчик 223-ФЗ</p>
                                                </label>
                                            </div>

                                            <div class="checkbox-custom small">
                                                <label> <input type="checkbox" hidden>
                                                    <div class="checkbox"></div>
                                                    <p>Иные</p>
                                                </label>
                                            </div>

                                            <div class="checkbox-custom small">
                                                <label> <input type="checkbox" hidden>
                                                    <div class="checkbox"></div>
                                                    <p>Поставщик</p>
                                                </label>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="mt-5 flex justify-content-center">
                                        <button @click="validate(1)" class="btn btn-green">Далее</button>
                                    </div>

                                </main>

                                <main v-if="steps.count === 2">

                                    <label class="input-default" :class="{ 'invalid': $v.steps['2'].name_company.$error}">
                                        <input v-model="$v.steps['2'].name_company.$model" type="text" placeholder="Название организации *">
                                        <div v-if="$v.steps['2'].name_company.$error" class="errors">
                                            <span v-if="$v.steps['2'].name_company.hasOwnProperty('minLength')?!$v.steps['2'].name_company.minLength:false">* Не менее {{$v.steps['2'].name_company.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['2'].name_company.hasOwnProperty('maxLength')?!$v.steps['2'].name_company.maxLength:false">* Не более {{$v.steps['2'].name_company.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['2'].address.$error}">
                                        <input v-model="$v.steps['2'].address.$model" type="text" placeholder="Адрес *">
                                        <div v-if="$v.steps['2'].address.$error" class="errors">
                                            <span v-if="$v.steps['2'].address.hasOwnProperty('minLength')?!$v.steps['2'].address.minLength:false">* Не менее {{$v.steps['2'].address.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['2'].address.hasOwnProperty('maxLength')?!$v.steps['2'].address.maxLength:false">* Не более {{$v.steps['2'].address.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['2'].taxpayer_identification_number.$error}">
                                        <input v-model="$v.steps['2'].taxpayer_identification_number.$model" type="text" placeholder="ИНН *">
                                        <div v-if="$v.steps['2'].taxpayer_identification_number.$error" class="errors">
                                            <span v-if="$v.steps['2'].taxpayer_identification_number.hasOwnProperty('numeric')?!$v.steps['2'].taxpayer_identification_number.numeric:false">* Разрешены только цифры</span>
                                            <span v-if="$v.steps['2'].taxpayer_identification_number.hasOwnProperty('minLength')?!$v.steps['2'].taxpayer_identification_number.minLength:false">* Не менее {{$v.steps['2'].taxpayer_identification_number.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['2'].taxpayer_identification_number.hasOwnProperty('maxLength')?!$v.steps['2'].taxpayer_identification_number.maxLength:false">* Не более {{$v.steps['2'].taxpayer_identification_number.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['2'].code_reason.$error}">
                                        <input v-model="$v.steps['2'].code_reason.$model" type="text" placeholder="КПП *">
                                        <div v-if="$v.steps['2'].code_reason.$error" class="errors">
                                            <span v-if="$v.steps['2'].code_reason.hasOwnProperty('numeric')?!$v.steps['2'].code_reason.numeric:false">* Разрешены только цифры</span>
                                            <span v-if="$v.steps['2'].code_reason.hasOwnProperty('minLength')?!$v.steps['2'].code_reason.minLength:false">* Не менее {{$v.steps['2'].code_reason.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['2'].code_reason.hasOwnProperty('maxLength')?!$v.steps['2'].code_reason.maxLength:false">* Не более {{$v.steps['2'].code_reason.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <div class="mt-5 flex justify-content-center">
                                        <button @click="validate(2)" class="btn btn-green">Далее</button>
                                    </div>
                                </main>

                                <main v-if="steps.count === 3">

                                    <label class="input-default" :class="{ 'invalid': $v.steps['3'].name_bank.$error}">
                                        <input v-model="$v.steps['3'].name_bank.$model" type="text" placeholder="Наименование банка *">
                                        <div v-if="$v.steps['3'].name_bank.$error" class="errors">
                                            <span v-if="$v.steps['3'].name_bank.hasOwnProperty('minLength')?!$v.steps['3'].name_bank.minLength:false">* Не менее {{$v.steps['3'].name_bank.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['3'].name_bank.hasOwnProperty('maxLength')?!$v.steps['3'].name_bank.maxLength:false">* Не более {{$v.steps['3'].name_bank.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['3'].payment_account.$error}">
                                        <input v-model="$v.steps['3'].payment_account.$model" type="text" placeholder="Расчётный счёт *">
                                        <div v-if="$v.steps['3'].payment_account.$error" class="errors">
                                            <span v-if="$v.steps['3'].payment_account.hasOwnProperty('numeric')?!$v.steps['3'].payment_account.numeric:false">* Разрешены только цифры</span>
                                            <span v-if="$v.steps['3'].payment_account.hasOwnProperty('minLength')?!$v.steps['3'].payment_account.minLength:false">* Не менее {{$v.steps['3'].payment_account.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['3'].payment_account.hasOwnProperty('maxLength')?!$v.steps['3'].payment_account.maxLength:false">* Не более {{$v.steps['3'].payment_account.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['3'].correspondent_account.$error}">
                                        <input v-model="$v.steps['3'].correspondent_account.$model" type="text" placeholder="Корреспондентский счёт *">
                                        <div v-if="$v.steps['3'].correspondent_account.$error" class="errors">
                                            <span v-if="$v.steps['3'].correspondent_account.hasOwnProperty('numeric')?!$v.steps['3'].correspondent_account.numeric:false">* Разрешены только цифры</span>
                                            <span v-if="$v.steps['3'].correspondent_account.hasOwnProperty('minLength')?!$v.steps['3'].correspondent_account.minLength:false">* Не менее {{$v.steps['3'].correspondent_account.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['3'].correspondent_account.hasOwnProperty('maxLength')?!$v.steps['3'].correspondent_account.maxLength:false">* Не более {{$v.steps['3'].correspondent_account.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['3'].bank_identification_code.$error}">
                                        <input v-model="$v.steps['3'].bank_identification_code.$model" type="text" placeholder="БИК *">
                                        <div v-if="$v.steps['3'].bank_identification_code.$error" class="errors">
                                            <span v-if="$v.steps['3'].bank_identification_code.hasOwnProperty('numeric')?!$v.steps['3'].bank_identification_code.numeric:false">* Разрешены только цифры</span>
                                            <span v-if="$v.steps['3'].bank_identification_code.hasOwnProperty('minLength')?!$v.steps['3'].bank_identification_code.minLength:false">* Не менее {{$v.steps['3'].bank_identification_code.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['3'].bank_identification_code.hasOwnProperty('maxLength')?!$v.steps['3'].bank_identification_code.maxLength:false">* Не более {{$v.steps['3'].bank_identification_code.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <div class="mt-5 flex justify-content-center">
                                        <button @click="validate(3)" class="btn btn-green">Далее</button>
                                    </div>
                                </main>

                                <main v-if="steps.count === 4">
                                    <label class="input-default" :class="{ 'invalid': $v.steps['4'].email.$error}">
                                        <input v-model="$v.steps['4'].email.$model" type="email" placeholder="Email *">
                                        <div v-if="$v.steps['4'].email.$error" class="errors">
                                            <span v-if="$v.steps['4'].email.hasOwnProperty('email')?!$v.steps['4'].email.email:false">* Невалидная почта</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['4'].login.$error}">
                                        <input v-model="$v.steps['4'].login.$model" type="text" placeholder="Логин *">
                                        <div v-if="$v.steps['4'].login.$error" class="errors">
                                            <span v-if="$v.steps['4'].login.hasOwnProperty('minLength')?!$v.steps['4'].login.minLength:false">* Не менее {{$v.steps['4'].login.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['4'].login.hasOwnProperty('maxLength')?!$v.steps['4'].login.maxLength:false">* Не более {{$v.steps['4'].login.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['4'].password.$error}">
                                        <input v-model="$v.steps['4'].password.$model" type="password" placeholder="Пароль *">
                                        <div v-if="$v.steps['4'].password.$error" class="errors">
                                            <span v-if="$v.steps['4'].password.hasOwnProperty('minLength')?!$v.steps['4'].password.minLength:false">* Не менее {{$v.steps['4'].password.$params.minLength.min}} символов</span>
                                            <span v-if="$v.steps['4'].password.hasOwnProperty('maxLength')?!$v.steps['4'].password.maxLength:false">* Не более {{$v.steps['4'].password.$params.maxLength.max}} символов</span>
                                        </div>
                                    </label>

                                    <label class="input-default" :class="{ 'invalid': $v.steps['4'].reply_password.$error}">
                                        <input v-model="$v.steps['4'].reply_password.$model" type="password" placeholder="Подтверждение пароля *">
                                        <div v-if="$v.steps['4'].reply_password.$error" class="errors">
                                            <span v-if="$v.steps['4'].reply_password.hasOwnProperty('sameAsPassword')?!$v.steps['4'].reply_password.sameAsPassword:false">* Пароли не совпадают</span>
                                        </div>
                                    </label>


                                    <div class="mt-5 flex justify-content-center">
                                        <button @click="validate(4)" class="btn btn-green">Завершить</button>
                                    </div>
                                </main>


                            </div>
                        </window>
                        <p class="target mt-10 color-white">
                            <router-link class="link" to="/login">Уже есть аккаунт? Войти</router-link>
                        </p>
                    </div>
                    <div v-if="steps.count === 1" class="pl-10 ml-10 flex flex-column color-white description-block">
                        <h1>Это не займёт много времени</h1>
                        <p>Укажите Вашу фамилию и должность в компании</p>
                    </div>
                    <div v-if="steps.count === 2" class="pl-10 ml-10 flex flex-column color-white description-block">
                        <h1>Первый шаг уже сделан!</h1>
                        <p>Теперь необходимо указать, что это за компания</p>
                    </div>
                    <div v-if="steps.count === 3" class="pl-10 ml-10 flex flex-column color-white description-block">
                        <h1>Вы на пути к победе!</h1>
                        <p>Заполните банковские реквизиты, это необходимо</p>
                    </div>
                    <div v-if="steps.count === 4" class="pl-10 ml-10 flex flex-column color-white description-block">
                        <h1>Осталось совсем немного</h1>
                        <p>Вот и настал последний шаг! Укажите Ваш E-mail придумайте логин и пароль для входа</p>
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
    .btn-back{
        background: none;
        border: none;
        cursor : pointer;
        width: 30px;
        height: 30px;
    }
    section {
        display     : flex;
        align-items : center;
        min-height      : 100vh;

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

        .window {
            width : 100%;
        }

        .input-default {
            display : table;
            width: 100%;
            margin  : 20px 0;
        }

        .types {
            & > label > span {
                display   : table;
                margin    : 20px 0;
                font-size : 1.1em;
            }

            .grid {
                display               : grid;
                grid-template-columns : repeat(2, 1fr);

                .checkbox-custom {
                    p {
                        margin-left : 10px;
                        font-size   : .9em;
                    }
                }
            }
        }
    }
</style>

<script>
    import Window from "../components/anothers/Window";
    import axios from "axios";
    import {maxLength, minLength, required, sameAs, email, numeric} from "vuelidate/lib/validators";

    export default {
        name: 'register',
        components: {Window},
        data() {
            return {
                steps: {
                    count: 1,
                    1: {
                        full_name: '',
                        position: ''
                    },
                    2: {
                        name_company: '',
                        address: '',
                        taxpayer_identification_number: '',
                        code_reason: ''
                    },
                    3: {
                        name_bank: '',
                        payment_account: '',
                        correspondent_account: '',
                        bank_identification_code: ''
                    },
                    4: {
                        email: '',
                        login: '',
                        password: '',
                        reply_password: ''
                    }
                }
            }
        },
        methods: {
            validate(num){
                this.$v.steps[num].$touch();
                if(!this.$v.steps[num].$error){
                    if(num === 4){
                        let formData = new FormData();
                        let name = this.steps["1"].full_name.split(' ');

                        // STEPS 1
                        formData.append("name", name[0]); // Name
                        formData.append("surname", name[1]); // Surname
                        formData.append("patronymic", name[2]); // Patronymic
                        formData.append("position", this.steps["1"].position); // Position

                        // STEPS 2
                        formData.append("name_company", this.steps["2"].name_company); // Name company
                        formData.append("address", this.steps["2"].address); // Address
                        formData.append("taxpayer_identification_number", this.steps["2"].taxpayer_identification_number); // Taxpayer identification number
                        formData.append("code_reason", this.steps["2"].code_reason); // Code reason

                        // STEPS 3
                        formData.append("name_bank", this.steps["3"].name_bank); // Name bank
                        formData.append("correspondent_account", this.steps["3"].correspondent_account); // Correspondent account
                        formData.append("bank_identification_code", this.steps["3"].bank_identification_code); // Bank identification code
                        formData.append("payment_account", this.steps["3"].payment_account); // Payment account

                        // STEPS 4
                        formData.append("email", this.steps["4"].email); // Email
                        formData.append("login", this.steps["4"].login); // Login
                        formData.append("password", this.steps["4"].password); // Password


                        axios.post('user', formData).then(() => {
                            this.$store.commit('ADD_HANDLER', {
                                text: "Поздравляем, Вы успешно зарегистрировались, теперь вы можете войти используя свой логин и пароль",
                                classes: 'success'
                            });
                            this.$router.push('/login');
                        }).catch(err => {
                            if(err.response.data.message === "This login or email is already in use"){
                                this.$store.commit('ADD_HANDLER', {
                                    text: "Почта или логин уже используеться другим пользователем",
                                    classes: 'error'
                                });
                            } else {
                                this.$store.commit('ADD_HANDLER', {
                                    text: err.response.data.message,
                                    classes: 'error'
                                });
                            }
                        })
                    } else this.steps.count++;
                }
            }
        },
        validations: {
            steps: {
                1: {
                    full_name: {
                        required,
                        minLength: minLength(9),
                        maxLength: maxLength(96)
                    },
                    position: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(32)
                    }
                },
                2: {
                    name_company: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(32)
                    },
                    address: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(128)
                    },
                    taxpayer_identification_number: {
                        required,
                        numeric,
                        minLength: minLength(10),
                        maxLength: maxLength(12),
                    },
                    code_reason: {
                        required,
                        numeric,
                        minLength: minLength(9),
                        maxLength: maxLength(9)
                    }
                },
                3: {
                    name_bank:{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(32)
                    },
                    payment_account: {
                        required,
                        numeric,
                        minLength: minLength(16),
                        maxLength: maxLength(20)
                    },
                    correspondent_account:{
                        required,
                        numeric,
                        minLength: minLength(16),
                        maxLength: maxLength(20)
                    },
                    bank_identification_code:{
                        required,
                        numeric,
                        minLength: minLength(9),
                        maxLength: maxLength(9)
                    }
                },
                4: {
                    email: {
                        required,
                        minLength: minLength(6),
                        maxLength: maxLength(128),
                        email
                    },
                    login: {
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(32)
                    },
                    password: {
                        required,
                        minLength: minLength(6),
                        maxLength: maxLength(128)
                    },
                    reply_password: {
                        sameAsPassword: sameAs('password')
                    }
                }
            }
        }
    }
</script>
