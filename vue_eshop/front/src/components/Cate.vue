<template>
    <div>
        <ButtonGroup>
            <Button type="primary" @click="changeType(0)">新闻分类</Button>
            <Button type="primary" @click="changeType(1)">产品分类</Button>
            <Button type="primary" @click="changeType(3)">地区分类</Button>
            <Button type="error"  @click="removes">批量删除</Button>
        </ButtonGroup>
        <Tree :data="data" :render="renderContent" show-checkbox @on-check-change="onCheckchange"></Tree>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入分类标题"></Input>
            </FormItem>
            <FormItem label="分类父Id" prop="parentId">
                <Input v-model="formValidate.parentId"></Input>
            </FormItem>
            <FormItem label="分类type" prop="type">
                <Input v-model="formValidate.type"></Input>
            </FormItem>
    
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
    export default {     
        data () {
            return {
                ids:[],
                formValidate: {
                    title: '',
                    parentId:'',
                    type:0
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '分类标题不能为空', trigger: 'blur' }
                    ]
                },
                data: [],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                }
            }
        },
        created(){
          //初始化，去请求nodejs的api，返回json
          this.getData();
        },
        methods: {
            getData(type){
                var type = type||0;
                this.$http.post(`http://localhost:3000/cate/list/${type}`).then((response) => {
                    this.data=response.data;
                    //console.log(response.data)
                })
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { 
                                    this.formValidate.parentId = data._id;
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            remove (root, node, data) {
                //console.log(data);
                this.$Modal.confirm({
                    title: '是否删除此项',
                    content: '<p>点击确认完成删除，删除后无法找回！</p>',
                    onOk: () => {           
                        this.$http({
                            method: 'delete',
                            url: `http://localhost:3000/cate/data/${data._id}`,    
                        }).then(res=>{
                            this.$Message.success('删除成功！');
                            this.getData();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //数据请求
                        this.$http({
                            method: 'post',
                            url: 'http://localhost:3000/cate/data',
                            data: this.formValidate
                        }).then(res=>{
                            console.log(res);
                            console.log(this.$options.data().formValidate.type,this.$data.formValidate.type)
                            this.formValidate.type = this.$data.formValidate.type
                            var typeNow=this.$data.formValidate.type
                            this.getData(typeNow);
                            this.$Message.success('添加分类成功！');

                            //重置form表单内容，(对象合并，object.assign),提交后input里的值为数据初始值状态
                            Object.assign(this.$options.data().formValidate,this.$data.formValidate)
                        });

                       
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            changeType(type){
                this.getData(type);
                this.formValidate.type = type;
            },
            onCheckchange(data){               
                if(data && data.length>0){
                    var ids = [];
                    for(let i=0;i<data.length;i++){
                        ids.push(data[i]._id);
                    }
                    this.ids=ids;
                   //console.log(this.ids)             //能打印出选中项id的数组
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
                                url:'http://localhost:3000/cate/data/removes',
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
                
            }

        }
    }
</script>
