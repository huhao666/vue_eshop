<style scoped lang="scss">
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        top: 20px;
        left: 20px;
    }
    .layout-text{
        width: 400px;
        height: 30px;
        top: 20px;
        left: 390px;
    }
    .layout-nav{
        width: 250px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                      <router-link to="/" active-class="active" exact>
                        <Icon type="home"></Icon>
                        <span>首页管理</span>
                      </router-link>                        
                    </MenuItem>
                    <MenuItem name="1-2">
                      <router-link to="/cate" active-class="active">
                        <Icon type="search"></Icon>
                        <span>分类管理</span>
                      </router-link>                     
                    </MenuItem>
                    <MenuItem name="1-3">
                      <router-link to="/user" active-class="active">
                        <Icon type="person-stalker"></Icon>
                        <span>用户管理</span>
                      </router-link> 
                    </MenuItem>
                    <MenuItem name="1-4">
                      <router-link to="/news" active-class="active">
                        <Icon type="ios-navigate"></Icon>
                        <span>新闻管理</span>
                      </router-link> 
                    </MenuItem>
                    <MenuItem name="1-5">
                      <router-link to="/product" active-class="active">
                        <Icon type="settings"></Icon>
                        <span>产品管理</span>
                      </router-link> 
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <div class="ivu-layout-header" style="background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 2px;">
                    <Row>
                        <Col span="8">
                            <div class="layout-logo">
                                <img class='img' src="../src/assets/logo.png" alt="">           
                            </div>
                        </Col>
                        <Col span="8">
                            <h1>E-shop后台管理系统</h1>
                        </Col>
                        <Col span="8">
                            <div class="layout-nav">                      
                                <Button type="success">登录</Button>  
                                <Button type="primary">注册</Button>                    
                            </div>
                        </Col>
                    </Row>         
                </div>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>当前位置</BreadcrumbItem>
                        <BreadcrumbItem v-if="(this.$route.matched)[0].path==''">首页</BreadcrumbItem>
                        <BreadcrumbItem v-if="(this.$route.matched)[0].path=='/cate'">分类管理</BreadcrumbItem>
                        <BreadcrumbItem v-if="(this.$route.matched)[0].path=='/user'">用户管理</BreadcrumbItem>        
                        <BreadcrumbItem v-if="(this.$route.matched)[0].path=='/news'">新闻管理</BreadcrumbItem>
                        <BreadcrumbItem v-if="(this.$route.matched)[0].path=='/product'">产品管理</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                          
                          <router-view></router-view>

                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script> 
    export default {
        data () {
            return {
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>

<style>  
    .active{
    color: #fff;
    }
    .img{
        width: 100%;
        height: 100%;
    }
</style>