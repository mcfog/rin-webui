/* global __DEV__ */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter();
router.map({
  '/': { name:"index", component: require('./views/main') ,mode:"normal"},
  '/page/:number': {name:"page" ,component: require('./views/main') ,mode:"page"},
  '/search/:key': { name:"search" ,component: require('./views/main'),mode:"search" },
  '/bangumi/list' :{
  	name:'list',
  	component: require('./views/list')
  },
  '/torrent/:key':{
  	name:'torrent',
  	component: require('./views/torrent'),
  	mode:"hello"
  },
  '/user/:id': {
    name: "user",
    component: require('./views/user'),
  }
});

router.start(require('./app'), '#app');
