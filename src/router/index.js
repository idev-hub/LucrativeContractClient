import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Account from '../views/accounts/Account.vue'

import Purchases from '../views/purchases/Purchases.vue'
import HistoryPurchases from '../views/purchases/HistoryPurchases.vue'
import Purchase from '../views/purchases/Purchase.vue'
import FormPurchase from '../views/purchases/FormPurchase.vue'
import ProviderFormPurchase from '../views/purchases/ProviderFormPurchase'
import HistoryChangePurchase from '../views/purchases/HistoryChangePurchase.vue'

import Chats from '../views/chats/Chats.vue'
import Chat from '../views/chats/Chat.vue'


import AdminUsers from  '../views/admins/Users'
// import AdminUser from '../views/admins/User'
// import AdminPurchases from '../views/admins/Purchases'
// import AdminPurchase from '../views/admins/Purchase'
import AdminHandbooks from '../views/admins/Handbooks'


import PageError404 from '../views/404'
import PageBlockedUser from '../views/Blocked'


import store from '../store'

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Авторизация',
        component: Login,
        meta: {
            IS_GUEST: true
        }
    },
    {
        path: '/register',
        name: 'Регистрация',
        component: Register,
        meta: {
            IS_GUEST: true
        }
    },
    {
        path: '/',
        name: 'Главный экран',
        component: Purchases,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/account',
        name: 'Личный кабинет',
        component: Account,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/view/purchase/:user/:id',
        name: 'Просмотр закупки',
        component: Purchase,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/create/purchase',
        name: 'Создание новой закупки',
        component: FormPurchase,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/create/provider/purchase',
        name: 'Создание новой закупки',
        component: ProviderFormPurchase,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/history/purchases',
        name: 'История закупок',
        component: HistoryPurchases,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/change/purchase/:user/:id',
        name: 'Изменение закупки',
        component: FormPurchase,
        meta: {
            EDITABLE: true,
            IS_LOGIN: true
        }
    },
    {
        path: '/history/change/purchase/:user/:id',
        name: 'История изменений закупки',
        component: HistoryChangePurchase,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/chats',
        name: 'Чат',
        component: Chats,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/chat/:id',
        name: 'Чат',
        component: Chat,
        meta: {
            IS_LOGIN: true
        }
    },
    {
        path: '/admin',
        name: 'Список клиентов',
        component: AdminUsers,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/user/:id',
        name: 'Профиль клиента',
        component: Account,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/purchases/:id',
        name: 'Закупки пользователя',
        component: Purchases,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/history/purchases/:id',
        name: 'История закупок пользователя',
        component: HistoryPurchases,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/purchases',
        name: 'Все закупки',
        component: Purchases,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/view/purchase/:user/:id',
        name: 'Просмотр закупки',
        component: Purchase,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/history/change/purchase/:user/:id',
        name: 'История изменений закупки',
        component: HistoryChangePurchase,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/handbooks',
        name: 'Управление справочниками',
        component: AdminHandbooks,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/create/purchase',
        name: 'Создание новой закупки',
        component: FormPurchase,
        meta: {
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/admin/change/purchase/:user/:id',
        name: 'Изменение закупки',
        component: FormPurchase,
        meta: {
            EDITABLE: true,
            IS_LOGIN: true,
            IS_ADMIN: true
        }
    },
    {
        path: '/blocked',
        name: 'Упс...',
        component: PageBlockedUser,
        meta: {
            IS_LOGIN: true,
            IS_USER_BLOCK: true
        }
    },
    {
        path: '*',
        name: '404',
        component: PageError404,
        meta: {
            IS_LOGIN: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {

    document.title = `${to.name} - ${store.getters.GET_SYSTEM.name}`;
    store.commit('DISABLE_MOBILE_MENU');

    if (to.matched.some(record => record.meta.IS_LOGIN)) { // Если у страницы стоит модификатор что пользователь вошел в систему

        if (store.getters.IS_LOGIN) { // Проверяем вход пользователя в системе

             if (to.matched.some(record => record.meta.IS_USER_BLOCK)) {
                if(store.getters.IS_BLOCK === true){
                    return next()
                } else {
                    return next('/');
                }
            }

             if (to.matched.some(record => record.meta.IS_ADMIN)) { // Если у страницы стоит модификатор что пользователь имеет права администратора

                 if (store.getters.IS_ADMIN) { // Если пользователь вошел в систему и имеет права администратора
                     return next()
                 } else {
                     return next('/')
                 }

             }

            if(store.getters.IS_BLOCK === true){
                return next('/blocked');
            } else {
                return next()
            }

        } else {
            next('/login') // Если пользователь не вошёл, то его кидает на страницу входа
        }
    } else if (to.matched.some(record => record.meta.IS_GUEST)) { // Если стоит модификатор только для невошедших пользователей
        if (!store.getters.IS_LOGIN) { // Проверяем что пользователь не авторизован
            next()
        } else {
            next('/') // Если не верно то кидаем его на главную страницу
        }
    } else {
        next() // Если на странице нед модификаторов то просто пропускаем пользователя дальше
    }
})


export default router
