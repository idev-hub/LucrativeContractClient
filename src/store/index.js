import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '', // Хранит токен, обращаться через getters
        refreshToken: localStorage.getItem('refresh-token') || '',
        status: '',
        user: JSON.parse(localStorage.getItem('user')) || {}, // Хранит user, обращаться через getters
        url: 'https://localhost:443', // Хранит api
        handlers: [], // Хранит описания ошибок клиента
        system: JSON.parse(localStorage.getItem('system')) || {},
        showAsideMobile: false
    },
    getters: {
        MOBILE_MENU: state => state.showAsideMobile,
        API: state => state.url+'/api',
        URL: state => state.url,
        IS_LOGIN: state => !!state.token,
        IS_ADMIN: state => state.user['permission'] >= 9,
        IS_BLOCK: state => state.user['is_block'],
        GET_HANDLERS: state => state.handlers,
        GET_PERMISSION: state => state.user['permission'],
        GET_USER_ID: state => state.user.id,
        GET_USER: state => state.user,
        GET_TOKEN: state => state.token,
        GET_REFRESH_TOKEN: state => state.refreshToken,
        AUTH_STATUS: state => state.status,
        GET_SYSTEM: state => state.system
    },
    mutations: {
        AUTH_REQUEST: state => state.status = 'loading',
        AUTH_ERROR: state => state.status = 'error',
        AUTH_SUCCESS: (state, token, refreshToken, user) => {
            state.status = 'success';
            state.token = token;
            state.user = user;
            state.refreshToken = refreshToken;
        },
        AUTH_LOGOUT(state) {
            state.status = '';
            state.token = '';
            state.refreshToken = '';
            state.user = {};
        },
        ADD_HANDLER: (state, payload) => state.handlers.push(payload),
        REMOVE_HANDLER: (state, payload) => state.handlers.splice(payload, 1),
        CLEAR_HANDLERS: state => state.handlers = [],
        UPDATE_USER: (state, user) => state.user = user,
        UPDATE_SYSTEM: (state, system) => state.system = system,
        UPDATE_MOBILE_MENU: state => state.showAsideMobile = !state.showAsideMobile,
        DISABLE_MOBILE_MENU: state => state.showAsideMobile = false
    },
    actions: { // Сложные запросы/действия
        UPDATE_SYSTEM: ({commit}, system) => {
            commit('UPDATE_SYSTEM', system);
            localStorage.setItem('system', JSON.stringify(system));
        },
        UPDATE_USER: ({commit}, user) => {
            commit('UPDATE_USER', user);
            localStorage.setItem('user', JSON.stringify(user));
        },
        AUTH_REQUEST: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST');
                axios.post('login', payload).then(res => {
                    const token = res.data.tokens.accessToken;
                    const refreshToken = res.data.tokens.refreshToken;
                    const user = JSON.stringify(res.data.user);

                    localStorage.setItem('user-token', token);
                    localStorage.setItem('refresh-token', refreshToken);
                    localStorage.setItem('user', user);

                    axios.defaults.headers.common['Authorization'] = token;

                    commit('AUTH_SUCCESS', token, refreshToken, user);
                    resolve(res)
                }).catch(err => {
                    localStorage.removeItem('user-token');
                    localStorage.removeItem('user');

                    commit('AUTH_ERROR', err);
                    reject(err);
                })
            })
        },
        REFRESH_TOKEN: ({dispatch, getters}) => {
            return new Promise((resolve, reject) => {
                axios.post('refresh-tokens', {refreshToken: getters.GET_REFRESH_TOKEN}).then(res => {
                    let token = res.data.accessToken;
                    let refreshToken = res.data.refreshToken;
                    localStorage.setItem('user-token', token);
                    localStorage.setItem('refresh-token', refreshToken);

                    axios.defaults.headers.common['Authorization'] = token;



                    resolve(res);
                }).catch(err => {

                    dispatch('AUTH_LOGOUT');
                    reject(err);
                })
            })
        },
        AUTH_LOGOUT: ({commit}) => { // Выход из системы и удаление из хранилища данных
            return new Promise((resolve) => {
                localStorage.removeItem('user-token');
                localStorage.removeItem('user');

                delete axios.defaults.headers.common['Authorization'];
                commit('AUTH_LOGOUT');

                resolve()
            })
        }
    }
})
