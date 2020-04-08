<template>
    <div class="str">
        <p class="string">
            <b>{{text}}</b>
            <label><input class="invisible" :disabled="disable === true" :type="types" v-model="value" ref="inp"></label>
        </p>
        <button v-if="editable" @click="toggle" class="edit" :title="title">
            <i :class="['icon', disable?'icon-edit':'icon-ok color-green']"></i>
        </button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "String",
        props: ["text", "types", "names", "val", "editable", "tables", "min", "max", 'userId'],
        data(){
            return{
                disable: true,
                title: "Редактировать",
                value: this.val
            }
        },
        methods: {
            toggle: function () {
                if (this.editable) {
                    this.disable = !this.disable;
                    if(this.disable){
                        this.title = "Редактировать";
                        if(this.value.length <= this.max){
                            if(this.value.length >= this.min){
                                axios.put(`user/${this.tables}/${this.$route.params.id||this.$store.getters.GET_USER_ID}`, {
                                    [this.names]: this.value
                                }).then(() => {
                                    this.$store.commit('ADD_HANDLER', {
                                        text: "Поле успешно обновлено",
                                        classes: 'success'
                                    });
                                }).catch(err => {
                                    this.disable = false;
                                    this.$store.commit('ADD_HANDLER', {
                                        text: "Ошибка... " + err,
                                        classes: 'error'
                                    });
                                });

                            } else {
                                this.disable = false;
                                this.$store.commit('ADD_HANDLER', {text: `Слишком коротко, нужно не менее ${this.min} ${this.min < 2?'символа':'символов'}`, classes: 'error'});
                            }
                        } else {
                            this.disable = false;
                            this.$store.commit('ADD_HANDLER', {text: `Колличество символов превышает допустимые нормы. Не более ${this.max} ${this.max < 2?'символа':'символов'}`, classes: 'error'});
                        }
                    } else {
                        this.title = "Сохранить";
                        this.$nextTick(() => this.$refs.inp.focus());
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .str{
        display: flex;
        p{
            width: 100%;
        }
        label{
            display: inline;
        }
        input{
            max-width: 160%;
            min-width: 160px;
        }
        button{
            margin-left: 20px;
        }
    }
</style>