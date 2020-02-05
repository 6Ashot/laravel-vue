import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import ExampleComponent from './components/ExampleComponent.vue';
import LoginComponent from './components/auth/LoginComponent.vue';
import CompanyMainComponent from './components/company/main.vue';
import CompanyIndexComponent from './components/company/index.vue';
import CompanyCreateComponent from './components/company/create.vue';
import CompanyUpdateComponent from './components/company/update.vue';

import EmployeeMainComponent from './components/employee/main.vue';
import EmployeeIndexComponent from './components/employee/index.vue';
import EmployeeCreateComponent from './components/employee/create.vue';
import EmployeeUpdateComponent from './components/employee/update.vue';
import store from './store';


// Vue.use(Vuex);


// console.log(store.state.user.isAuth)
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/login',
		// component: Home,
	},
	// {
	// 	path: '/example',
	// 	component: ExampleComponent
	// }
	{
		path: '/login',
		component: LoginComponent
	},
	{
		path: '/home',
		component: Home,
		meta: {mustBeAuth: true}
	},
	{
		path: '/companies',
		component: CompanyMainComponent,
		children: [{
      		path: '/',
      		component: CompanyIndexComponent,
			meta: {mustBeAuth: true}
    	},
    	{
      		path: '/create',
      		component: CompanyCreateComponent,
			meta: {mustBeAuth: true}
    	},
    	{
      		path: '/update/:id',
      		component: CompanyUpdateComponent,
			meta: {mustBeAuth: true},
			name: 'companyUpdate'
    	}]
	},
	{
		path: '/employee',
		component: EmployeeMainComponent,
		children: [{
      		path: '/',
      		component: EmployeeIndexComponent,
			meta: {mustBeAuth: true}
    	},
    	{
      		path: '/add',
      		component: EmployeeCreateComponent,
			meta: {mustBeAuth: true}
    	},
    	{
      		path: '/edit/:id',
      		component: EmployeeUpdateComponent,
			meta: {mustBeAuth: true},
			name: 'employeeUpdate'
    	}]
	}
]

export const router = new VueRouter({
	routes,
	mode: 'history'
})
router.beforeEach((to, from, next) => {
	if(to.meta.mustBeAuth){
		if(store.state.user.isAuth) {
			// console.log(store.state.user.isAuth)
			next()
		}else{
			next('/login')
		}
	}else{
		if(store.state.user.isAuth && (to.path === '/login' || to.path === '/') ) {
			next('/home')
		}else{
			next()
		}
	}
})