import { createRouter, createWebHashHistory } from 'vue-router'

import InsertNew from '../src/pages/insert'
import ListView from '../src/pages/list'
import AccountMes from '../src/pages/account'
import ServerPush from '../src/pages/server'
import ServerList from '../src/pages/serverList'
import ServerManList from '../src/pages/serverManList'
import OrderList from '../src/pages/orderList'
// 1. 定义路由组件：这里直接用的对象数据，也可以导入其他组件。


// 2. 定义一些路由：每个路由都需要映射到一个组件。
const routes = [
    { path: '/', component: InsertNew },
    { path: '/insert', component: InsertNew },
    { path: '/list', component: ListView },
    { path: '/account', component: AccountMes },
    { path: '/serverPush', component: ServerPush },
    { path: '/serverList', component: ServerList },
    { path: '/serverManList', component: ServerManList },
    { path: '/orderList', component: OrderList },
]

// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

// 4.创建一个vue应用，将App组件和定义的路由放入到vue应用，并挂载到模板页面id为app的元素上。
export default router;