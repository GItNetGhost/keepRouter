import router from './router'
import { constantRouterMap } from '@/router' //router里的固定路由
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('new')) {
    var c = JSON.parse(localStorage.getItem('new')),
    lastUrl=getLastUrl(window.location.href,'/');

    if (c.path==lastUrl) { //动态路由页面的刷新事件
      let newRoutes = constantRouterMap.concat([{
        path: c.path,
        component: resolve => require(["@/components/" + c.component + ""], resolve)
      }])
      localStorage.removeItem('new')
      router.addRoutes(newRoutes)
      router.replace(c.path) //replace,保证浏览器回退的时候能直接返回到上个页面，不会叠加

    } 
  } 
  next()

})

var getLastUrl=(str,yourStr)=>str.slice(str.lastIndexOf(yourStr))