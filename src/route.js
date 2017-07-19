import Login from './views/login.vue';
import Layout from './views/layout.vue';
import Home from './views/home.vue';
import OrderList from './views/order/order-list.vue';
import StewardOrderList from './views/steward/order-list.vue';
import StewardOrderInfo from './views/steward/order-info.vue';
import StewardInspectionList from './views/steward/inspection-list.vue';
import StewardProblemList from './views/steward/problem-list.vue';

export default {
    routes: [
        {
            path: '/',
            redirect: to => {
                return '/app/home';
            }
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'app',
            path: '/app',
            component: Layout,
            children: [
                {
                    name: 'app.home',
                    path: '/app/home',
                    component: Home
                },
                {
                    name: 'app.order.list',
                    path: '/app/order/list',
                    component: OrderList
                },
                //
                {
                    name: 'app.ps.order',
                    path: '/app/steward/order-list',
                    component: StewardOrderList
                },
                //
                {
                    name: 'app.ps.order.info',
                    path: '/app/steward/order-list/:orderId',
                    component: StewardOrderInfo
                },
                //
                {
                    name: 'app.ps.inspection',
                    path: '/app/steward/inspection-list',
                    component: StewardInspectionList
                },
                //
                {
                    name: 'app.ps.problem',
                    path: '/app/steward/problem-list',
                    component: StewardProblemList
                }
            ]
        },
    ]
}