# backend

> A node.js project

# install dependencies 
npm install

# install supervisor 
npm install -g supervisor

# run 
supervisor ./bin/www

# api 配置信息
分类管理

* 显示列表[post] http://localhost:3000/cate/list/0  (0新闻分类，1产品分类，2上传分类，3地区分类)
* 增加分类[post] http://localhost:3000/cate/data  (传参 title、type、parentId)

用户管理

* 显示列表[post] http://localhost:3000/users/list    
* 增加用户[post] http://localhost:3000/users/data  (传参 name、password、mail、city、date)
* 删除用户[delete] http://localhost:3000/users/data/5d5f7d5f3bdeff24e436e6e4  (data/后面带的是id)
* 修改用户[put] http://localhost:3000/users/data/5d5f7d543bdeff24e436e6e0  (data/后面带的是id)

新闻管理[post]

* 显示列表[post] http://localhost:3000/news/list    
* 增加新闻[post] http://localhost:3000/news/data  (传参 title、content)
* 删除新闻[delete] http://localhost:3000/news/data/5d5f7d5f3bdeff24e436e6e4  (data/后面带的是id)
* 修改新闻[put] http://localhost:3000/news/data/5d5f7d543bdeff24e436e6e0  (data/后面带的是id)

