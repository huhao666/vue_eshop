<template>
  <div>      
    <Card style="width:320px;margin: 0 auto;margin-bottom:20px">
        <div style="text-align:center">
            <img src="../assets/logo.png" alt="">
            <h2>Welcome to home page</h2>
        </div>
    </Card>
    <Row>
        <Col span="7" offset="1">
            <Card>
                <p slot="title">新闻</p>
                <Tree :data="data"></Tree>
            </Card>
        </Col>  
        <Col span="7" offset="1">
            <Card>
                <p slot="title">产品</p>
                <Tree :data="data1"></Tree>
            </Card>
        </Col>
        <Col span="7" offset="1">
            <Card>
                <p slot="title">地区</p>
                <Tree :data="data2"></Tree>
            </Card>
        </Col>
    </Row>
  </div>
</template>
<script>
export default {
    data () {
        return {
            data:[],
            data1:[],
            data2:[],
        }
    },
    created(){
        //初始化，去请求nodejs的api，返回json
        this.getData();
        this.getData1();
        this.getData2();
    },
    methods: {
        getData(){
            this.$http.post(`http://localhost:3000/cate/list/0`).then((response) => {
                this.data=response.data;
                //console.log(response.data)
            })
        },
        getData1(){
            this.$http.post(`http://localhost:3000/cate/list/1`).then((response) => {
                this.data1=response.data;
                //console.log(response.data)
            })
        },
        getData2(){
            this.$http.post(`http://localhost:3000/cate/list/3`).then((response) => {
                this.data2=response.data;
                //console.log(response.data)
            })
        }
    }
}
</script>
<style>
  img{
    height:100%;
    width:100%
  }
</style>
