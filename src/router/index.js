import Vue from 'vue';
import Router from 'vue-router';

import Index from '../pages/Index';
import Me from '../pages/Me';
import Opened from '../pages/Opened';

import IndexDetail from '../pages/IndexDetail';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index
    }, {
        path: '/me',
        name: 'me',
        component: Me
    }, {
        path: '/opened',
        name: 'opened',
        component: Opened
    }, {
        path: '/index-detail/:id',
        name: 'index-detail',
        component: IndexDetail
    }]
});
