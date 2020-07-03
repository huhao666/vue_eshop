export default{
    data(){
        return {
            modal2:false,
            modal:false,
            list:[],
            
            num:0,
            data: {
                cateId:0,
                name:'', 
                limit:10,
                page:1,
                total:0
            }
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            this.$http({
                method:"post",
                url:`http://localhost:3000/${this.module}/list`,
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
                        url: `http://localhost:3000/${this.module}/data`,
                        data: this.formValidate
                    }).then(res=>{
                        
                        this.getData();
                        this.$Message.success('Success！');
  
                        //重置form表单内容，(对象合并，object.assign),提交后input里的值为数据初始值状态
                        Object.assign(this.$options.data().formValidate,this.$data.formValidate)
                        this.modal=false;
                    });
                } else {
                    this.$Message.error('Submit Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        ok () {
            this.$Message.success('Ok');
        },
        cancel () {
            this.$Message.warning('Cancel');
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (params) {
            this.$Modal.confirm({
                title: '',
                content: '<p>确认删除</p>',
                onOk: () => {           
                    this.$http({
                        method:'delete',
                        url:`http://localhost:3000/${this.module}/data/${params.row._id}`,      
                    }).then(res=>{
                        this.$Message.success('Success Ok');
                        this.getData();
                    })
                },
                onCancel: () => {
                    this.$Message.warning('Cancel');
                }
            });
            
        },
        onChangePage(page){
            this.data.page=page;
            this.$http({
                method: 'post',
                url: `http://localhost:3000/${this.module}/list`,
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
                            url:`http://localhost:3000/${this.module}/data/removes`,
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
                //alert('请勾选至少一项来进行删除')
                this.$Message.warning('请勾选至少一项来进行删除');
            }         
        },
        updata(data){
            console.log(data)
            this.$http({
                method: 'put',
                url:`http://localhost:3000/${this.module}/data/${data._id}`,
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
};