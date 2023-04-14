<template>
    <div id="ServerManList">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="所有家政员" name="0"></el-tab-pane>
            <el-tab-pane label="家政员注册申请" name="1"></el-tab-pane>
        </el-tabs>
        <el-select v-if="activeName == 0" v-model="selectValue" placeholder="Select" @click = change(item.value)>
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-option-group>
        </el-select>

        <el-table v-if="activeName == 0" size="large" :data="tableData1.slice(5 * (page1 - 1), 5 * page1)"
            style="width: 100%" max-height="400px">
            <el-table-column prop="company_id" label="家政公司号" />
            <el-table-column prop="desc" label="技能描述" />
            <el-table-column prop="field" label="field" />
            <el-table-column prop="phone_number" label="手机号" />
            <el-table-column prop="register_status" label="注册状态" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="user_id" label="家政员号" />
            <el-table-column prop="user_name" label="家政员姓名" />
        </el-table>
        <el-pagination style="margin-top:25px" v-if="activeName == 0" background layout="prev, pager, next"
            :total="tableData1.length" :page-size="5" v-model:current-page="page1" />

        <el-table v-if="activeName == 1" size="large" :data="tableData.slice(5 * (page2 - 1), 5 * page2)"
            style="width: 100%" max-height="400px">
            <el-table-column prop="desc" label="技能描述" />
            <el-table-column prop="field" label="field" />
            <el-table-column prop="phone_number" label="手机号" />
            <el-table-column prop="register_status" label="注册状态" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="user_id" label="家政员号" />
            <el-table-column prop="user_name" label="家政员姓名" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click.prevent="accept_(5 * (page2 - 1) + scope.$index)">
                        同意申请
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:25px" v-if="activeName == 1" background layout="prev, pager, next"
            :total="tableData.length" :page-size="5" v-model:current-page="page2" />


    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    name: 'ServerManList',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
            selectValue: "筛选",
            activeName: 0,
            page1: 1,
            page2: 1,
            myData: [

            ],
            tableData1: [

            ],
            tableData: [
                /*
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子",
                    field: ["1","2"],
                    phone_number: "13531",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1",
                },
                {
                    company_id: 4,
                    desc: "灵活能干,会做日常家务,擅长带孩子aa",
                    field: ["1","2"],
                    phone_number: "13531aa",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1aa",
                },
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子bb",
                    field: ["1","2"],
                    phone_number: "13531bb",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1bb",
                },
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子cc",
                    field: ["1","2"],
                    phone_number: "13531cc",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1cc",
                },
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子dd",
                    field: ["1","2"],
                    phone_number: "13531dd",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1dd",
                },
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子ee",
                    field: ["1","2"],
                    phone_number: "13531ee",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1ee",
                },
                {
                    company_id: 3,
                    desc: "灵活能干,会做日常家务,擅长带孩子ff",
                    field: ["1","2"],
                    phone_number: "13531ff",
                    register_status: 3,
                    type: 3,
                    user_id: 12,
                    user_name: "家政员1ff",
                },*/
            ],
            options: [
                {
                    label: '领域',
                    options: [
                        {
                            value: '1',
                            label: '1',
                        },
                        {
                            value: '2',
                            label: '2',
                        },
                    ],
                },
                {
                    label: '技能',
                    options: [
                        {
                            value: 'daihz',
                            label: '带孩子',
                        },
                        {
                            value: 'xid',
                            label: '洗地',
                        },
                        {
                            value: 'xiw',
                            label: '洗碗',
                        },
                        {
                            value: 'zuof',
                            label: '做饭',
                        },
                        {
                            value: 'xiyf',
                            label: '洗衣服',
                        },
                        {
                            value: 'kaic',
                            label: '开车',
                        },
                        {
                            value: 'zhaoglr',
                            label: '照顾老人',
                        },
                        {
                            value: 'xiudq',
                            label: '修电器',
                        },
                    ],
                },
            ]
        }
    },
    created() {
        this.getServiceman()
    },
    methods: {
        handleClick(i) {
            if (i == 0) {
                this.getServiceman();
            } else if (i == 1) {
                this.getRegister();
            }
        },
        change(v){
            if (v.length == 1){
                this.getMyServicemanByField(v)
            }else
                this.getMyServicemanByDesc(v)
        },
        getServiceman() {
            const that = this;
            axios.post('/company/getMyServiceman', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData1 = res.objs;
                }
            })
        },
        getRegister() {
            const that = this;
            axios.post('/company/getRegister', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData1 = res.objs;
                }
            })
        },
        getMyServicemanByField(value) {
            const that = this;
            axios.post('/company/getMyServicemanByField', {
                user_id: Cookies.get('user_id'),
                field: [value]
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData1 = res.objs;
                }
            })
        },
        getMyServicemanByDesc(value) {
            const that = this;
            axios.post('/company/getMyServicemanByDesc', {
                user_id: Cookies.get('user_id'),
                desc: value
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData1 = res.objs;
                }
            })
        },
        accept_(i) {
            const that = this;
            axios.post('/company/approveRegister', {
                cookie: localStorage.cookie_admin,
                user_id: that.tableData[i].user_id
            }).then(res => {
                res = res.data;
                alert(res.msg);
                that.getRegister()
            })
        },
    }
}
</script>
<style scoped>
.ipt {
    width: 240px;
    margin: 0 20px;
}

#ListView {
    height: 100%;
}

.row {
    margin: 15px 0;
}
</style>