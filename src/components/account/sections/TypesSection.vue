<template>
    <article>
        <h4>Тип клиента:</h4>
        <div class="edit-list">
            <div class="item">

                <label class="mb-10">
                    <div class="grid fs-16 mt-5">

                        <div class="checkbox-custom small" v-for="{name, id, check, index} in localTypes"
                             :key="index">
                            <label>
                                <input @input="checked" type="checkbox" name="client" :value="id" hidden="" :checked="check === true">
                                <div class="checkbox"></div>
                                <p>{{name}}</p>
                            </label>
                        </div>

                    </div>
                </label>

            </div>
        </div>
    </article>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "TypesSection",
        props: ["payload"],
        data: function () {
            return {
                types: []
            }
        },
        methods:{
            checked(e){
                axios.put(`user/types/${this.$route.params.id|this.$store.getters.GET_USER_ID}`, {
                    id: Number(e.target.value),
                    check: e.target.checked?1:0
                }).then(() => {
                    this.$store.commit('ADD_HANDLER', {text: "Информация обновлена", classes: 'success'})
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: "Ошибка запроса... " + err, classes: 'error'}))
            }
        },
        computed: {
            localTypes: function () {
                for (let i = 0; i < this.payload.length; i++) {
                    for (let j = 0; j < this.types.length; j++) {
                        let userType = this.payload[i];
                        let type = this.types[j];

                        if (userType.type_id === type.id)
                            type['check'] = true
                    }
                }

                return this.types;
            }
        },
        beforeCreate: function () {
            axios.get('handbook/user/types').then(types => {
                this.types = types.data;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
        grid-auto-rows: auto;
    }

    .checkbox-custom {
        padding-left: 0;

        label {
            margin-bottom: 0;
        }

        p {
            margin-left: 20px;
        }
    }
</style>