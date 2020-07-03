<template>
  <div>
    <ButtonGroup>
        <Button type="primary" @click="modal = true">添加</Button>
        <Button type="error"  @click="removes">批量删除</Button>   
    </ButtonGroup>
    <ButtonGroup style="width: 20px"></ButtonGroup>
    <ButtonGroup>
    <Input v-model="data.title" placeholder="Search something..." style="width: 300px">
        <Button slot="append" icon="ios-search" @click='search'></Button>
    </Input>
    </ButtonGroup>

    <Modal
        v-model="modal"
        title="新闻信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Title" prop="title">
                <Input v-model="formValidate.title" placeholder="Enter a title"></Input>
            </FormItem>
            <FormItem label="分类Id" prop="cateId">
                <Input v-model="formValidate.cateId"></Input>
            </FormItem>
            <FormItem label="Content" prop="content">
                <Input v-model="formValidate.content" placeholder="Enter Content"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Modal>
    <Modal
        v-model="modal2"
        title="修改新闻信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="data1[num]" :model="data1[num]" :label-width="80">
            <FormItem label="Title" prop="title">
                <Input v-model="data1[num].title" placeholder="Enter a title"></Input>
            </FormItem>
            <FormItem label="Content" prop="content">
                <Input v-model="data1[num].content" placeholder="Enter Content"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="updata(data1[num])">Submit</Button>
                <Button type="ghost" @click="handleReset(data1[num])" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Modal>

    <Tree :data="treeData" @on-select-change='onSelectChange'></Tree>

    <Table borer :columns="columns" :data="list" @on-selection-change='onSelectionChange'></Table>
    <Page :total="data.total"
    @on-change="onChangePage"
    @on-page-size-change="onPageSizeChange"
    size="small" show-elevator show-sizer></Page>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        ids:[],
        data1:[{title:'',cateId:0,content:''}],
        formValidate: {
            title: '',
            cateId:0,
            content: ''
        },
        num:0,
        ruleValidate: {
            title: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            concent: [
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
            ]
        },
        modal:false,
        modal2:false,
        treeData:[],
        columns: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: 'Title',
              key: 'title',
              render: (h, params) => {
                  return h('div', [
                      h('strong', params.row.title)
                  ]);
              }
            },
            {
                title: 'Content',
                key: 'content',
                render: (h, params) => {
                  return h('div', [
                      h('strong', params.row.content)
                  ]);
              }
            },
            {
                title: 'Action',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    //this.show(params.index)
                                    this.modal2=true;
                                    this.num=params.index;
                                    console.log(this.num)
                                }
                            }
                        }, '更改'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        list:[],
        data: {
            cateId:0,
            title:'', 
            limit:10,
            page:1,
            total:0,
            content:''
        }
      }
    },
    created(){
      this.getTree();
      this.getData();
    },
    methods:{
        getTree(type){
            this.$http.post(`http://localhost:3000/cate/list/0`).then((response) => {
                this.treeData=response.data;
                //console.log(response.data)
            })
        },
        getData(){
            this.$http({
                method:"post",
                url:"http://localhost:3000/news/list",
                data:this.data
            }).then(res=>{
                console.log(res.data);

                this.data.total=res.data.total;
                this.data1=res.data.docs;
                this.list=res.data.docs;
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http({
                        method: 'post',
                        url: 'http://localhost:3000/news/data',
                        data: this.formValidate
                    }).then(res=>{
                        
                        this.getData();
                        this.$Message.success('success！');

                        //重置form表单内容，(对象合并，object.assign),提交后input里的值为数据初始值状态
                        Object.assign(this.$options.data().formValidate,this.$data.formValidate)
                        this.modal=false;
                    });
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (params) {
            this.$Modal.confirm({
                title: 'Title',
                content: '<p>确认删除</p>',
                onOk: () => {           
                    this.$http({
                        method:'delete',
                        url:`http://localhost:3000/news/data/${params.row._id}`,      
                    }).then(res=>{
                        this.$Message.info('Clicked ok');
                        this.getData();
                    })
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });           
        },
        onChangePage(page){
            this.data.page=page;
            this.$http({
                method: 'post',
                url: 'http://localhost:3000/news/list',
                data: this.data
            }).then(res=>{
                this.data.total=res.data.total; 
                this.list=res.data.docs;
            });
        },
        onPageSizeChange(pageSize){
            this.data.limit=pageSize;
            this.getData();
        },
        search(){
            console.log(this.data)
            this.getData();
        },
        onSelectChange(node){
            this.data.cateId = node[0]._id;
            this.formValidate.cateId = node[0]._id;
            this.getData();
        },
        onSelectionChange(selection){
            if(selection && selection.length>0){
                var ids = [];
                for(let i=0;i<selection.length;i++){
                    ids.push(selection[i]._id);
                }
                this.ids=ids;
                console.log(this.ids)      //能打印出选中项id的数组
            }
        },
        removes(){
            if(this.ids.length>0){
                this.$Modal.confirm({
                    title: '是否删除选中项',
                    content: '<p>点击确认删除选中项，一经删除无法找回！</p>',
                    onOk: () => {           
                        this.$http({
                            method:'post',
                            url:'http://localhost:3000/news/data/removes',
                            data:{
                                ids:this.ids
                            }     
                        }).then(res=>{
                            this.$Message.success('删除多个成功！');
                            this.getData();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            }else{
                alert('请勾选至少一项来进行删除')
            }         
        },
        updata(data){
            console.log(data)
            this.$http({
                method: 'put',
                url:`http://localhost:3000/news/data/${data._id}`,
                data: data
            }).then(res=>{
                this.getData();
                console.log('成功')

                // 重置form表单内容为数据的初始值状态
                // ********** 非常重要
                Object.assign(this.$data.formValidate, this.$options.data().formValidate);
                this.modal2=false;
            }) 
        }


    }
  }
</script>
<style>
    .ivu-modal-footer{
        display:none;
    }
</style>