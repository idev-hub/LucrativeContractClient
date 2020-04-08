<template>
    <div id="app">
        <div :class="['wrapper', visible?'section-lk':'section-login']">
            <sidebar v-if="visible"/>
            <router-view/>
        </div>

        <log-handler/>
    </div>
</template>

<style lang="scss">
    @import './assets/sass/app.scss';

    .wrapper {

        &.section-lk{
            display               : grid;
            grid-template-columns : 250px 1fr;
            height: 100vh;
            overflow: hidden;
            @media(max-width: 850px){
                grid-template-columns : 1fr;
            }
        }


        & > main {
            overflow-x: hidden;
            overflow-y: auto;
            min-height: 100%;
            max-height: 100%;
            @media(max-width: 500px){
                main {
                    padding: 0;
                    .content{
                        .tools{
                            padding: 0 30px;
                        }
                    }
                }
            }
        }
    }



</style>

<script>
    import Sidebar from "./components/sidebars/Sidebar";
    import axios from 'axios'
    import LogHandler from "./components/anothers/handlers/LogHandler";

    export default {
        name: 'app',
        components: {LogHandler, Sidebar},
        data() {
            return {
                visible: this.$store.getters.IS_LOGIN,
            }
        },
        created: function () {
            let self = this;
            axios.interceptors.response.use(undefined, function (error) {
                return new Promise(function () {
                    if (error.response.status === 401 && error.response.config && !error.response.config.__isRetryRequest) {
                        self.$store.dispatch('REFRESH_TOKEN').then(r => self.$router.go(r)).catch(() => {
                            self.$router.push('/login');
                            self.$store.commit('ADD_HANDLER', {text: "Время жизни сессии истекло.", classes: 'error'});
                            self.visible = false
                        })
                    }
                    throw error;
                });
            });

            axios.get('system').then(system => {
                this.$store.dispatch('UPDATE_SYSTEM', system.data);
            });

        }
    }
</script>