<template>
    <main>
        <page class="index-page">
            <div class="content">

                <window>
                    <h3>Выберите необходимые параметры</h3>
                    <form @submit="create">
                        <label class="input-custom">
                            Номер извещения
                            <input
                                    :class="{ 'invalid': $v.notice.$error }"
                                    type="text"
                                    placeholder="0"
                                    v-model="notice"
                            />

                            <p class="error" v-if="!$v.notice.numeric">* Разрешены только целые
                                числа</p>

                        </label>

                        <button role="button" class="btn btn-green">Добавить закупку</button>
                    </form>
                </window>

            </div>
        </page>
    </main>
</template>

<script>
    import Window from "../../components/anothers/Window";
    import Page from "../../components/anothers/Page";
    import {required, numeric} from "vuelidate/lib/validators";

    export default {
        name: 'ProviderFormPurchase',
        components: {Page, Window},
        data: function () {
            return {
                notice: ''
            }
        },
        validations: {
            notice: {
                numeric,
                required
            },
        },
        methods: {
            create(e){
                e.preventDefault();

                this.$v.$touch();
                if(!this.$v.notice.$error){
                    //
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        .window{
            max-width: 630px;
            margin: 100px auto;
            padding: 40px;

            &>form{
                margin-top: 50px;
                max-width: 330px;
                input{
                    margin-top: 20px;
                }
                .btn{
                    height: 50px;
                    min-width: 270px;
                    margin-top: 30px;
                }
            }
        }
        .error {
            color: #530000;
            font-size: 13px;
            padding: 10px 0px;
        }
    }
</style>