<template>
    <aside v-if="isLoaded" :class="[$store.getters.MOBILE_MENU?'active':'']">
        <div class="logo">
            <router-link to="/"><img src="~@/assets/img/logo.png" alt="logo"/></router-link>
        </div>

        <navs/>

        <footer v-if="!$route.meta.IS_ADMIN">
            <a class="color-gray" :href="'tel:'+system.phone">{{system.phone}}</a>
            <a class="color-gray" :href="'mailto:'+system.email">{{system.email}}</a>
        </footer>
    </aside>
</template>

<style lang="scss" scoped>
    aside{
        @media (max-height: 710px) {
            overflow-y: auto;
            footer{
                position: static !important;
            }
        }
    }
</style>

<script>
    import Navs from "./navs/Navs";
    import axios from "axios";

    export default {
        name: 'Sidebar',
        components: {Navs},
        data: function() {
            return {
                isLoaded: false,
                system: this.$store.getters.GET_SYSTEM
            }
        },
        created() {
            axios.get(`user/${this.$store.getters.GET_USER_ID}`).then(res => {
                this.$store.dispatch('UPDATE_USER', res.data);
                this.isLoaded = true;
            }).catch(err => {
                this.$store.commit('ADD_HANDLER', {text: "Ошибка получения данных... " + err, classes: 'error'});
            })
        }
    }
</script>
