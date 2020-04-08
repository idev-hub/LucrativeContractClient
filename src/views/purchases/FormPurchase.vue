<template>
    <main>

        <page class="create_order-page">
            <div class="content">
                <window>
                    <header>
                        <div class="flex justify-content-beetwen">
                            <h3>Выберите необходимые параметры</h3>
                        </div>
                    </header>
                    <div class="main">

                        <div>

                            <custom-field :v="$v.name" v-model.trim="$v.name.$model">
                                <template v-slot:title>
                                    <span class="title">Наименование объекта закупки</span>
                                </template>
                            </custom-field>

                            <div class="items">
                                <span class="title">Кол-во товара</span>
                                <div class="delimiter">
                                    <div class="item">
                                        <custom-field mask="####" placeholder="0" v-model.trim="$v.quantity.$model" :v="$v.quantity"></custom-field>
                                    </div>
                                    <div class="item">
                                        <v-select :class="['input-custom', !!$v.unit.$error?'invalid':'']" v-model="unit" :option="units"/>
                                    </div>
                                </div>
                            </div>

                            <custom-field :money=true :v="$v.initial_maximum_contract_price" v-model.trim="$v.initial_maximum_contract_price.$model">
                                <template v-slot:title>
                                    <span class="title">Начальная максимальная цена</span>
                                </template>
                            </custom-field>

                            <div class="items">
                                <span class="title">Размер обеспечения исполнения контракта</span>
                                <div class="delimiter">
                                    <div class="item">
                                        <label class="input-custom">
                                            <currency-input :money=true
                                                    :class="{ 'invalid': $v.execution_size.$error }"
                                                    placeholder="0" v-on:change="thisExecSize"
                                                    v-model="$v.execution_size.$model"></currency-input>
                                        </label>

                                    </div>
                                    <div class="item">
                                        <label class="input-custom">
                                            <currency-input :value-range="{min: 0, max: 999}" :currency="{suffix: '%'}"
                                                    :class="{ 'invalid': $v.execution_percent.$error }"
                                                    placeholder="%" v-on:change="thisExecPercent"
                                                    v-model="$v.execution_percent.$model"></currency-input>
                                        </label>

                                    </div>
                                </div>
                            </div>

                            <custom-field type="date" placeholder="дд.мм.гггг"
                                    v-model.trim="$v.delivery_time.$model" :v="$v.delivery_time">
                                <template v-slot:title><span class="title">Срок поставки</span></template>
                            </custom-field>

                            <custom-field placeholder="Введите адрес"
                                    v-model.trim="$v.delivery_address.$model"
                                    :v="$v.delivery_address">
                                <template v-slot:title><span class="title">Место поставки товара</span>
                                </template>
                            </custom-field>

                        </div>

                        <div>

                            <label class="input-custom"> <span class="title">Преимущества, предоставляемые в соответствии со ст.28 - 30 Закона о контрактной системе</span>
                                <div class="checked">

                                    <div class="checkbox-custom" v-for="advantage in advantages" :key="advantage.id">
                                        <label><input v-model="form_advantages.data[advantage.id]" type="checkbox" :value="advantage.id"
                                                hidden="">
                                            <div class="checkbox"></div>
                                            <span class="title">{{advantage.name}}<br><small>{{advantage.description}}</small></span>
                                        </label>
                                    </div>

                                </div>
                            </label>

                            <div class="input-custom">
                                <span class="title">Способ закупки</span>
                                <v-select :class="['input-custom', !!$v.method.$error?'invalid':'']" v-model="method" :option="methods"/>
                            </div>

                            <label class="input-custom"> <span class="title">Документы</span>
                                <p @click="showLoadPhotoModal = true" class="color-green load mt-5">
                                    <i class="icon icon-upload"></i>Прикрепите документы</p>

                                <div class="docs">
                                    <div v-for="(file, index) in files" :key="index">
                                        <p>{{file.name}}</p>
                                        <button @mouseup="removeDocs(index)"><i class="icon icon-close color-red"></i>
                                        </button>
                                    </div>
                                </div>
                            </label>

                            <div class="button-block">
                                <button @click="create" class="btn btn-green" :disabled="!!submitClick">
                                    {{this.$route.meta.EDITABLE?'Сохранить изменения':'Добавить закупку'}}
                                </button>
                            </div>

                        </div>

                    </div>
                </window>
            </div>
        </page>

        <modal :showModal="showLoadPhotoModal" @close="showLoadPhotoModal = false">
            <template v-slot:title>
                <h3>Выберите документы и нажмите загрузить</h3>
            </template>
            <template v-slot:content>
                <div class="to-2">
                    <input type="file" ref="files" name="files" multiple>
                    <button @click="changeFiles" class="btn btn-green ml-5">Готово</button>
                </div>
            </template>
        </modal>

    </main>
</template>

<script>
    import vSelect from 'vselect-component'
    import {/*required,*/ minLength, maxLength, numeric, between} from 'vuelidate/lib/validators'
    import axios from "axios";
    import Modal from "../../components/anothers/Modal";
    import CustomField from "../../components/forms/CustomField";
    import Page from "../../components/anothers/Page";
    import Window from "../../components/anothers/Window";

    export default {
        name: 'CreatePurchase',
        components: {
            Window,
            Page,
            CustomField,
            Modal,
            vSelect
        },
        data: function () {
            return {
                files: [],
                showLoadPhotoModal: false,
                submitClick: false,
                units: [],
                methods: [],
                advantages: [],
                unit: {},
                method: {},
                name: '',
                quantity: 0,
                initial_maximum_contract_price: 0,
                execution_size: 0,
                execution_percent: 0,
                delivery_time: '',
                delivery_address: '',
                form_advantages: {
                    data: []
                }
            }
        },
        validations: {
            name: {
                // required,
                minLength: minLength(3),
                maxLength: maxLength(32)
            },
            method: {
                // required
            },
            unit: {
                // required
            },
            quantity: {
                numeric,
                // required,
                between: between(0, 9999)
            },
            initial_maximum_contract_price: {
                // required
            },
            execution_size: {
                // required
            },
            execution_percent: {
                // required,
                between: between(0, 999)
            },
            delivery_time: {
                // required
            },
            delivery_address: {
                // required,
                maxLength: maxLength(128)
            }
        },
        mounted: function () {
            axios.get('handbook/purchase/units').then(res => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    arr.push({
                        label: res.data[i].name,
                        value: res.data[i].id
                    })
                }
                this.units = arr;
            });

            axios.get('handbook/purchase/methods').then(res => {
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    arr.push({
                        label: res.data[i].name,
                        value: res.data[i].id
                    })
                }
                this.methods = arr;
            });

            axios.get('handbook/purchase/advantages').then(res => this.advantages = res.data);


            if(this.$route.meta.EDITABLE){
                axios.get(`purchase/${this.$route.params.user}/${this.$route.params.id}`).then(res => {

                    this.name = res.data.name;
                    this.quantity = res.data.quantity;
                    this.initial_maximum_contract_price = res.data.initial_maximum_contract_price;
                    this.execution_size = res.data.execution_size;
                    this.execution_percent = res.data.execution_percent;
                    this.delivery_time = new Date(res.data.delivery_time).toISOString().slice(0, 10);
                    this.delivery_address = res.data.delivery_address;

                    for (let i = 0; i < res.data.advantages.length; i++) {
                        this.form_advantages.data[res.data.advantages[i].advantage.id] = true
                    }

                    this.method = {
                        label: res.data.method.name,
                        value: res.data.method.id
                    };

                    this.unit = {
                        label: res.data.unit.name,
                        value: res.data.unit.id
                    };
                });
            }
        },
        methods: {
            removeDocs(index) {
                this.files.splice(index, 1);
            },
            changeFiles: function () {
                let files = this.$refs.files.files;
                this.files.push(...files);
                this.showLoadPhotoModal = false;
            },
            thisExecPercent: function () {
                if (!this.$v.initial_maximum_contract_price.$invalid) {
                    this.$v.execution_size.$model = (this.$v.initial_maximum_contract_price.$model / 100) * this.$v.execution_percent.$model;
                } else {
                    this.$v.initial_maximum_contract_price.$touch()
                }
            },
            thisExecSize: function () {
                if (!this.$v.initial_maximum_contract_price.$invalid) {
                    this.$v.execution_percent.$model = (this.$v.execution_size.$model * 100) / this.$v.initial_maximum_contract_price.$model;
                } else {
                    this.$v.initial_maximum_contract_price.$touch()
                }
            },
            create: function () {

                this.$v.$touch();
                this.$store.dispatch('CLEAR_HANDLERS');

                if (!this.$v.$invalid) {

                    let formData = new FormData();

                    for (let i = 0; i < this.files.length; i++) {
                        let file = this.files[i];
                        formData.append('files[' + i + ']', file);
                    }

                    let adv = [];
                    for (let key in this.form_advantages.data){
                        if(key !== 'remove') adv.push(Number(key))
                    }

                    formData.append('advantages', JSON.stringify(adv));
                    formData.append('name', this.$v.name.$model);
                    formData.append('initial_maximum_contract_price', this.$v.initial_maximum_contract_price.$model);
                    formData.append('delivery_time', this.$v.delivery_time.$model);
                    formData.append('delivery_address', this.$v.delivery_address.$model);
                    formData.append('execution_size', this.$v.execution_size.$model);
                    formData.append('execution_percent', this.$v.execution_percent.$model);
                    formData.append('quantity', this.$v.quantity.$model);
                    formData.append('unit_id', this.unit.value);
                    formData.append('method_id', this.method.value);


                    this.submitClick = true;

                    if(this.$route.meta.EDITABLE){
                        axios.put(`purchase/${this.$route.params.user}/${this.$route.params.id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(() => {


                            this.$store.commit('ADD_HANDLER', {
                                text: "Поздравляем, Вы успешно изменили закупку",
                                classes: 'success'
                            });


                            this.$router.back();
                            this.submitClick = false;
                        }).catch(err => {
                            this.$store.commit('ADD_HANDLER', {
                                text: err.response.data.message,
                                classes: 'error'
                            });

                            this.submitClick = false;
                        })
                    } else {
                        axios.post('purchase', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(() => {


                            this.$store.commit('ADD_HANDLER', {
                                text: "Поздравляем, Вы создали новую закупку",
                                classes: 'success'
                            });

                            this.$router.back();
                            this.submitClick = false;
                        }).catch(err => {
                            this.$store.commit('ADD_HANDLER', {
                                text: err.response.data.message,
                                classes: 'error'
                            });

                            this.submitClick = false;
                        })
                    }



                }
            }

        }
    }
</script>

<style lang="scss" scoped>

    .docs {
        margin-top : 20px;
        list-style : none;
        padding    : 0;

        & > div {
            padding               : 10px 20px;
            border-bottom         : 1px solid #1D8A34;
            background            : #F1F1F1;
            display               : grid;
            grid-template-columns : 1fr 20px;
            width                 : 100%;
            box-sizing            : border-box;

            p {
                white-space   : nowrap;
                overflow      : hidden;
                text-overflow : ellipsis;
            }

            &:last-child {
                border : none;
            }

            button {
                display    : block;
                cursor     : pointer;
                background : none;
                border     : none;
                font-size  : .8em;

                i {
                    position : relative;
                    top      : 2px;
                }
            }
        }
    }

    .content {
        margin-top : 40px;
    }

    .main {
        display               : grid;
        grid-template-columns : repeat(2, 1fr);
        box-sizing            : border-box;

        @media (max-width : 1110px) {
            grid-template-columns : 1fr;
        }


        & > div {
            padding        : 0 60px 40px 60px;
            box-sizing     : border-box;
            display        : grid;
            grid-gap       : 40px;
            align-items    : center;
            grid-auto-rows : min-content;
            @media(max-width : 500px) {
                padding : 0 30px 30px 30px;
            }
        }
    }

    .checked {
        display               : grid;
        grid-template-columns : repeat(2, 1fr);
        grid-gap              : 10px;
        grid-template-areas   : 'item1 item1' 'item3 item2';

        @media (max-width : 1000px) {
            display : block;
            padding : 10px 0;
        }

        div:nth-child(1) {
            margin-top : 20px;
            grid-area  : item1;
        }

        div:nth-child(2) {
            grid-area : item2;
        }

        div:nth-child(3) {
            grid-area : item3;
        }
    }

    .items {
        display : block;

        .delimiter {
            display               : grid;
            grid-template-columns : 1fr 150px;
            grid-gap              : 20px;
        }

        .item {
            .input-custom {
                min-width     : auto;
                margin-bottom : 0;

                span {

                }
            }

            .input-control input {
                margin-left : 0;
            }
        }
    }
</style>