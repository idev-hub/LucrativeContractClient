<template>
    <div class="item">
        <div class="header">
            <h4>
                <slot></slot>
            </h4>
        </div>
        <div class="main">
            <div class="list">
                <div v-for="el in items" :key="el.id" class="el">
                    <p>{{el.name}}</p>
                    <div class="actions">
                        <button v-if="el.is_delete" @click="restore(el.id)" class="btn">
                            <i class="icon icon-arrow-top color-green"></i>
                        </button>
                        <button v-else @click="remove(el.id)" class="btn">
                            <i class="icon icon-close color-red"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <label class="input-custom"> <input v-model="value" type="text" placeholder="Название..."> </label>
            <button @click="create" class="btn btn-green">Создать</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "handbook-item",
        props: {
            list: {
                type: Array
            },
            name: {
                type: String
            }
        },
        data() {
            return {
                items: this.list || [],
                value: ''
            }
        },
        methods: {
            create: function () {
                if (this.value.length < 2) {
                    this.$store.commit('ADD_HANDLER', {text: "Должно быть не менее 2 символов", classes: 'error'});
                } else if (this.value.length > 32) {
                    this.$store.commit('ADD_HANDLER', {text: "Должно быть не более 32 символов", classes: 'error'});
                } else {
                    axios.post(`/handbook/${this.name}`, {
                        name: this.value
                    }).then(method => {
                        this.items.push(method.data);
                        this.value = '';
                        this.$store.commit('ADD_HANDLER', {text: "Успешно создано", classes: 'success'});
                    }).catch(err => this.$store.commit('ADD_HANDLER', {text: "Ошибка... " + err, classes: 'error'}));
                }
            },
            remove: function (id) {
                axios.delete(`/handbook/${this.name}/${id}`).then(() => {
                    for (let i = 0; i < this.items.length; i++)
                        if (this.items[i].id === id)
                            this.items[i].is_delete = true;
                    this.$store.commit('ADD_HANDLER', {text: "Успешно удалено", classes: 'success'});
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: "Ошибка... " + err, classes: 'error'}));
            },
            restore: function (id) {
                axios.post(`/handbook/${this.name}/restore/${id}`).then(() => {
                    for (let i = 0; i < this.items.length; i++)
                        if (this.items[i].id === id)
                            this.items[i].is_delete = false;
                    this.$store.commit('ADD_HANDLER', {text: "Успешно востановленно", classes: 'success'});
                }).catch(err => this.$store.commit('ADD_HANDLER', {text: "Ошибка... " + err, classes: 'error'}));
            }
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
</style>