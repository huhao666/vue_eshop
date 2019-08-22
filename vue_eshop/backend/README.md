# backend

> A node.js project

# install dependencies 
npm install

# install supervisor 
npm install -g supervisor

# run 
supervisor ./bin/www

# api 配置
分类管理[post] 

* 显示列表 http://localhost:3000/cate/list/0     (0新闻分类，1产品分类，2上传分类，3地区分类)
* 增加分类 http://localhost:3000/cate/data   (传参 title、type、parentId)

用户管理[post]

* 显示列表 http://localhost:3000/cate/list/0    ()
* 增加分类 http://localhost:3000/cate/data   （传参 ）

新闻管理[post]

产品管理[post]