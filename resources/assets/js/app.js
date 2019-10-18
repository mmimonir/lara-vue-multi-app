/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')

window.Vue = require('vue')
import moment from 'moment'
import { Form, HasError, AlertError } from 'vform'

import Gate from './Gate'
Vue.prototype.$gate = new Gate(window.user)

import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})
window.Toast = Toast

window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'))

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

let routes = [
    {
        path: '/dashboard',
        component: require('./components/Dashboard.vue').default
    },
    {
        path: '/developer',
        component: require('./components/Developer.vue').default
    },
    {
        path: '/users',
        component: require('./components/Users.vue').default
    },
    {
        path: '/profile',
        component: require('./components/Profile.vue').default
    },
    {
        path: '*',
        component: require('./components/NotFound.vue').default
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

Vue.filter('upText', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
})
Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM Do YYYY')
})

window.Fire = new Vue()
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Laravel Passport
Vue.component(
    'passport-clients',
    require('../../js/components/passport/Clients.vue').default
)

Vue.component(
    'passport-authorized-clients',
    require('../../js/components/passport/AuthorizedClients.vue').default
)

Vue.component(
    'passport-personal-access-tokens',
    require('../../js/components/passport/PersonalAccessTokens.vue').default
)

Vue.component(
    'example-component',
    require('./components/ExampleComponent.vue').default
)
Vue.component('not-found', require('./components/NotFound.vue').default)

const app = new Vue({
    el: '#app',
    router,
    data: {
        search: ''
    },
    methods: {
        searchit: _.debounce(() => {
            Fire.$emit('searching')
        }, 1000),
        printme() {
            window.print()
        }
    }
})
