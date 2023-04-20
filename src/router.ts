import * as VueRouter from 'vue-router';
import Home from './views/Home/index.vue';
import Receive from './views/Receive/index.vue';

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: Home},
        {path: '/receive', component: Receive},
    ],
})

export default router;
