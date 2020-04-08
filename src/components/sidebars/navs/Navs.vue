<template>
    <nav>
        <ul>
            <router-link v-if="!$route.meta.IS_ADMIN" to="/account" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <li :class="[isExactActive  && 'current']" class="profile">
                    <a @click="navigate" :href="href">
                        <img v-if="user.image_url" :src="`${$store.getters.URL}/${user.image_url}`" alt="user">
                        <img v-else src="~@/assets/img/profile/user.png" alt="user">
                        <p>{{ user.surname }} {{ user.name }}</p>
                        <a class="href" @click="navigate" :href="href">Личный кабинет</a> </a>
                </li>
            </router-link>

            <h4 v-if="$route.meta.IS_ADMIN">Админ панель</h4>

            <template v-if="!$route.meta.IS_ADMIN">
                <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Главный экран</a>
                    </li>
                </router-link>

                <router-link to="/history/purchases" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">История закупок</a>
                    </li>
                </router-link>

                <router-link to="/chats" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Чат <b class="color-green">+3</b></a>
                    </li>
                </router-link>
            </template>

            <template v-else>
                <router-link to="/admin" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Список клиентов</a>
                    </li>
                </router-link>
                <router-link to="/admin/purchases" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Все закупки</a>
                    </li>
                </router-link>

                <router-link to="/admin/messages" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Чат <b class="color-green">+3</b></a>
                    </li>
                </router-link>

                <router-link to="/admin/handbooks" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li :class="[isExactActive && 'current']">
                        <a :href="href" @click="navigate" class="href">Справочники</a>
                    </li>
                </router-link>
            </template>

            <div class="permission" v-if="user.permission >= 9">
                <router-link v-if="!$route.meta.IS_ADMIN" to="/admin" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li>
                        <a :href="href" @click="navigate" class="href linked-icon"><i class="icon icon-exit"></i>Панель
                            администратора </a>
                    </li>
                </router-link>
                <router-link v-else to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
                    <li>
                        <a :href="href" @click="navigate" class="href linked-icon"><i class="icon icon-exit"></i>Выйти
                            из панели </a>
                    </li>
                </router-link>
            </div>

        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Navs',
        data: function () {
            return {
                user: this.$store.getters.GET_USER
            }
        }
    }
</script>

<style lang="scss" scoped>
    .linked-icon {
        background : rgba(253, 240, 255, 0.93);
        font-size  : 14px;

        .icon {
            position     : relative;
            font-size    : 10px;
            top          : -2px;
            margin-right : 5px;
        }
    }

    .permission {
        margin-top : 30px;
    }
</style>
