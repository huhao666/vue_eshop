// import Home from '../components/Home'
// import Cate from '../components/Cate'
// import User from '../components/User'
// import News from '../components/News'
// import Product from '../components/Product'

// export const routes =[
// 	{ path:'/',component:Home },
// 	{ path:'/cate',component:Cate },
// 	{ path:'/user',component:User },
// 	{ path:'/news',component:News },
// 	{ path:'/product',component:Product },
// ];

import index from "../components/index";
import Home from "../components/Home";
import Cate from "../components/Cate";
import User from "../components/User";
import News from "../components/News";
import Product from "../components/Product";
import login from "../components/login";

export const routes = [
  {
    path: "/",
		component: index,
		redirect: "/home", //默认打开home子组件
    children: [
      { path: "/home", component: Home },
      { path: "/cate", component: Cate },
      { path: "/user", component: User },
      { path: "/news", component: News },
      { path: "/product", component: Product }
    ]
  },
  { path: "/login", component: login }
];
