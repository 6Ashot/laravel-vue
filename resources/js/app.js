require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from './store';
import { router } from './router';
import MainApp from './components/MainApp.vue';
import {interceptor} from './helpers/interceptor';


// Vue.use(VueRouter);

// Vue.use(Vuex);
// const store = Vuex.Store(Store)


// console.log(store.state.user.isAuth)

interceptor(store, router);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
    	MainApp
    }
});
