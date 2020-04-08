<template>
    <main>
        <page>
            <div class="content">
                <div>
                    <h2>К сожалению вы были заблокированы</h2>
                    <p>Вы больше не можете пользоваться данной системой.<br>По всем вопросам вы можете обратиться на
                        почту или по номеру телефона </p>

                    <div class="hrefs">
                        <a class="color-green" :href="'tel:'+system.phone">{{system.phone}}</a>
                        <a class="color-green" :href="'mailto:'+system.email">{{system.email}}</a>
                    </div>
                    <div>
                        <button class="btn btn-dungeon" @click="showLogoutModal = true">Выйти из аккаунта</button>
                    </div>
                </div>
            </div>
        </page>

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
    </main>
</template>

<script>
    import Page from "../components/anothers/Page";
    import Modal from "../components/anothers/Modal";

    export default {
        name: "PageBlockedUser",
        components: {Modal, Page},
        data: function () {
            return {
                system: this.$store.getters.GET_SYSTEM,
                showLogoutModal: false
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("AUTH_LOGOUT").then(n => this.$router.go(n))
            }
        }
    }
</script>

<style lang="scss" scoped>

    .hrefs {
        text-align : right;
        margin-top : 30px;

        & > a {
            font-weight : bold;
            display     : block;
            margin-top  : 10px;
        }
    }

    .content {
        display         : flex;
        height          : calc(100vh - 130px);
        justify-content : center;
        align-items     : center;
        text-align      : right;

        .btn{
            margin: 80px 0 0 auto;
        }
        h2 {
            margin-bottom : 20px;
        }

        .link {
            font-weight : 600;

            .icon {
                position  : relative;
                top       : 2px;
                font-size : .9em;
            }
        }
    }
</style>