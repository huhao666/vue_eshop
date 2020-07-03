<template>
    <div>
        <ButtonGroup>
            <Button type="primary" @click="modal = true">添加</Button>
            <Button type="error"  @click="removes">批量删除</Button>   
        </ButtonGroup>
        <ButtonGroup style="width: 20px"></ButtonGroup>
        <ButtonGroup>
        <Input v-model="data.name" placeholder="Search something..." style="width: 300px">
            <Button slot="append" icon="ios-search" @click='search'></Button>
        </Input>
        </ButtonGroup>
            
            <Modal
                v-model="modal"
                title="用户信息"
                @on-ok="ok"
                @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                    </FormItem>
                    <FormItem label="Password" prop="password">
                        <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                v-model="modal2"
                title="修改用户信息"
                @on-ok="ok"
                @on-cancel="cancel">
                <Form ref="data1[num]" :model="data1[num]" :label-width="80">
                    <FormItem label="Name" prop="name">
                        <Input v-model="data1[num].name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="data1[num].mail" placeholder="Enter your e-mail"></Input>
                    </FormItem>
                    <FormItem label="Password" prop="password">
                        <Input v-model="data1[num].password" placeholder="Enter your password"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updata(data1[num])">Submit</Button> 
                    </FormItem>
                </Form>
            </Modal>
        <br>    
        
        <Table border :columns="columns" :data="list" @on-selection-change='onSelectionChange' style="margin-top: 20px"></Table>
        <Page @on-change='onChangePage' @on-page-size-change='onPageSizeChange' :total="data.total" size="small" show-elevator show-sizer></Page>
    </div>  
</template>
<script>
    import Base from '../common/Base';

    export default {
        mixins:[Base],
        data () {
            return {
                module:'users',
                ids:[],
                data1:[{name:'',mail:'',password:''}],
                formValidate: {
                    name: ' ',
                    mail: '@qq.com',
                    password:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ]
                },
                columns: [
                  {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Email',
                        key: 'email',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.mail)
                            ]);
                        }
                    },
                    {
                        title: 'password',
                        key: 'password',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.password)
                            ]);
                        }
                    },
                    {
                        title: 'city',
                        key: 'city',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.city)
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
                ]
            }
        }
    }
</script>
<style>
    .ivu-modal-footer{
        display:none;
    }
</style>
