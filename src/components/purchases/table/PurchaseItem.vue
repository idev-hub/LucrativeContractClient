<template>
    <div class="grid">
        <div class="cell"></div>
        <div class="cell">{{purchase.name}}</div>
        <div class="cell">{{purchase.initial_maximum_contract_price}}</div>
        <div class="cell" :style="`color: ${purchase.status.code}`">{{purchase.status.name}}
        </div>
        <div class="cell">{{deadline}}</div>
        <div class="cell">{{purchase.responsible.surname}} {{purchase.responsible.name}} {{purchase.responsible.patronymic}}</div>

        <div class="cell icons">
            <button v-if="!notOpen" @click="open"><i class="icon icon-eye"></i></button>
            <button v-if="!notEditable" @click="edit"><i class="icon icon-edit"></i></button>
            <div v-if="!notDelete">
                <button v-if="purchase.status.id === 1" @click="showRestoreModal = true"><i class="icon icon-arrow-top"></i></button>
                <button v-else @click="showDeleteModal = true"><i class="icon icon-close"></i></button>
            </div>
        </div>

        <modal :showModal="showDeleteModal" @close="showDeleteModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите удалить закупку?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showDeleteModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button :disable="removeButton === false" @click="remove" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

        <modal :showModal="showRestoreModal" @close="showRestoreModal = false">
            <template v-slot:title>
                <h3>Вы уверены что хотите <b class="color-green">восстановить</b> закупку?</h3>
            </template>
            <template v-slot:content>
                <div class="to">
                    <button @click="showRestoreModal = false" class="btn btn-green-outline mr-5">Отмена</button>
                    <button :disable="restoreButton === false" @click="restore" class="btn btn-green">Да</button>
                </div>
            </template>
        </modal>

    </div>
</template>

<script>
    import Modal from "../../anothers/Modal";
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'PurchaseItem',
        components: {Modal},
        props: ['data', 'notDelete', 'notEditable', 'notOpen', 'admin'],
        data() {
            return {
                purchase: this.data,
                showDeleteModal: false,
                removeButton: true,
                showRestoreModal: false,
                restoreButton: true,
                deadline: moment(this.data.deadline).format('DD.MM.YYYY') || 0
            }
        },
        methods: {
            open: function () {
                if(this.$route.meta.IS_ADMIN){
                    this.$router.push(`/admin/view/purchase/${this.purchase.user.id}/${this.purchase.id}`);
                } else {
                    this.$router.push(`/view/purchase/${this.purchase.user.id}/${this.purchase.id}`);
                }
            },
            edit: function () {
                if(this.$route.meta.IS_ADMIN){
                    this.$router.push(`/admin/change/purchase/${this.purchase.user.id}/${this.purchase.id}`);
                } else {
                    this.$router.push(`/change/purchase/${this.purchase.user.id}/${this.purchase.id}`);
                }
            },
            restore: function(){
                this.restoreButton = false;
                axios.post(`purchase/${this.purchase.id}/restore`).then(() => {
                    this.showRestoreModal = false;
                    this.$store.commit('ADD_HANDLER', {
                        text: 'Закупка успешно восстановлена',
                        classes: 'success'
                    });

                    this.purchase.status = {
                        id: 3,
                        name: 'Проект',
                        code: '#000000'
                    };

                    setTimeout(() => {
                        this.restoreButton = true;
                        this.$emit('restore', this.purchase.id);
                    }, 300);
                }).catch(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: `Ошибка... Закупка не была восстановлена.`,
                        classes: 'error'
                    })
                })
            },
            remove: function () {
                this.removeButton = false;
                axios.delete(`purchase/${this.purchase.id}`).then(() => {
                    this.showDeleteModal = false;
                    this.$store.commit('ADD_HANDLER', {
                        text: 'Закупка успешно удалена',
                        classes: 'success'
                    });

                    this.purchase.status = {
                        id: 1,
                        name: 'Удален',
                        code: '#7A0000'
                    };

                    setTimeout(() => {
                        this.removeButton = true;
                        this.$emit('remove', this.purchase.id);
                    }, 300);

                }).catch(() => {
                    this.$store.commit('ADD_HANDLER', {
                        text: `Ошибка... Закупка не была удалена.`,
                        classes: 'error'
                    })
                })
            }
        }
    }
</script>
