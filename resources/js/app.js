/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2';

//Gate
import Gate from "./Gate";
Vue.prototype.$gate =new Gate(window.user);




// use progress bar
const progressOption = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }
  
  Vue.use(VueProgressBar, progressOption)
//use sweetalert
window.swal=swal;
//use toaster
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
window.Toast = Toast;


// FIre
window.Fire = new Vue();

// Error handling component
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

window.Form= Form;
import VueRouter from 'vue-router';
Vue.use(VueRouter)

Vue.component('pagination', require('laravel-vue-pagination'));



let routes = [
    {path:'/dashboard', component:require('./components/Dashboard.vue').default},
    {path:'/developer', component:require('./components/Developer.vue').default},
    {path:'/users', component:require('./components/Users.vue').default},
    {path:'/profile', component:require('./components/Profile.vue').default},
    {path:'*', component:require('./components/NotFound.vue').default}
]

const router = new VueRouter({
    mode: 'history',
    routes // short for routes:routes
})


Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() +text.slice(1);
});

Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY');
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);


Vue.component(
  'not-found',
  require('./components/NotFound.vue').default
);




 const app = new Vue({
    el: '#app',
    router,
    data:{
      search:''
    },
    methods:{
      searchit:_.debounce(()=>{
        // create customs event
        Fire.$emit('searching');
      },1000)
    }
}); 

// "h" is just a standard taken from JSX
/* new Vue({
    el: '#app',
    router,
    render: h => h(Example)
  }).$mount("#app"); */