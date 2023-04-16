<template>
    <div id="ServerManList">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="所有家政员" name="0"></el-tab-pane>
            <el-tab-pane label="家政员注册申请" name="1"></el-tab-pane>
        </el-tabs>
        <el-select v-if="activeName == 0" v-model="selectValue" placeholder="Select" @change=change>
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-option-group>
        </el-select>
        <p></p>
        <el-input v-model="input" placeholder="技能筛选：输入要查找的技能" class="row" />
        <el-button v-model="input" type="primary" @click="selectSkill(input)">查找</el-button>

        <el-table v-if="activeName == 0" size="large" :data="tableData1.slice(5 * (page1 - 1), 5 * page1)"
            style="width: 100%" max-height="400px">
            <el-table-column prop="desc" label="技能描述" />
            <el-table-column prop="field" label="领域" :formatter="fieldFormat" />
            <el-table-column prop="phone_number" label="手机号" />
            <el-table-column prop="user_name" label="家政员姓名" />
        </el-table>
        <el-pagination style="margin-top:25px" v-if="activeName == 0" background layout="prev, pager, next"
            :total="tableData1.length" :page-size="5" v-model:current-page="page1" />

        <el-table v-if="activeName == 1" size="large" :data="tableData.slice(5 * (page2 - 1), 5 * page2)"
            style="width: 100%" max-height="400px">
            <el-table-column prop="desc" label="技能描述" />
            <el-table-column prop="field" label="领域" :formatter="fieldFormat2"/>
            <el-table-column prop="phone_number" label="手机号" />
            <el-table-column prop="register_status" label="注册状态" :formatter="fieldFormat3"/>
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
            input: "",
            radio: '',
            poststate: '',
            sendtime: '',
            selectValue: "领域筛选",
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
                    label: '技能',
                    options: [
                        {
                            value: '0',
                            label: '家庭保洁',
                        },
                        {
                            value: '1',
                            label: '维修服务',
                        },
                        {
                            value: '2',
                            label: '汽车保洁',
                        },
                        {
                            value: '3',
                            label: '母婴护理',
                        }, {
                            value: '4',
                            label: '幼儿托管',
                        }, {
                            value: '5',
                            label: '宠物托管',
                        },
                        {
                            value: '6',
                            label: '孝心服务',
                        },
                        {
                            value: '7',
                            label: '园艺服务',
                        },
                        {
                            value: '8',
                            label: '家宴服务',
                        },
                        {
                            value: '9',
                            label: '其他服务',
                        },
                    ],
                },
            ],
            options1: [
                        {
                            value: '0',
                            label: '家庭保洁',
                        },
                        {
                            value: '1',
                            label: '维修服务',
                        },
                        {
                            value: '2',
                            label: '汽车保洁',
                        },
                        {
                            value: '3',
                            label: '母婴护理',
                        }, {
                            value: '4',
                            label: '幼儿托管',
                        }, {
                            value: '5',
                            label: '宠物托管',
                        },
                        {
                            value: '6',
                            label: '孝心服务',
                        },
                        {
                            value: '7',
                            label: '园艺服务',
                        },
                        {
                            value: '8',
                            label: '家宴服务',
                        },
                        {
                            value: '9',
                            label: '其他服务',
                        },
                    ],
                    options2: [
                        {
                            value: '0',
                            label: '审核中',
                        },
                        {
                            value: '1',
                            label: '审核通过',
                        },
                        {
                            value: '2',
                            label: '待审核',
                        },
                        {
                            value: '3',
                            label: '待审核',
                        },
                    ],
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
        change(v) {
            this.getMyServicemanByField(v)
        },
        getServiceman() {
            const that = this;
            axios.post('/company/getMyServiceman', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                that.tableData1 = res
            })
        },
        getRegister() {
            const that = this;
            axios.post('/company/getRegister', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                that.tableData = res
            })
        },
        getMyServicemanByField(value) {
            const that = this;
            axios.post('/company/getMyServicemanByField', {
                user_id: Cookies.get('user_id'),
                field: [value]
            }).then(res => {
                res = res.data;
                that.tableData1 = res;
            })
        },
        getMyServicemanByDesc(value) {
            const that = this;
            axios.post('/company/getMyServicemanByDesc', {
                user_id: Cookies.get('user_id'),
                desc: value
            }).then(res => {
                res = res.data;
                that.tableData1 = res;
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
        selectSkill(input) {
            this.getMyServicemanByDesc(input)
        },
        fieldFormat(row) {
            var data = [];
            // 防止接口返回null而产生报错等问题
            if (row.field == null) {
                row.field = "";
            }
            // 先将其分割成字符串数组
            let resMap = row.field
            resMap.map((item) => {
                if (this.options1) {
                    this.options1.forEach((e) => {
                        if (item == e.value) {
                            data.push(e.label);
                        }
                    });
                }
            });
            // 最后把处理好的数据转换为一个字符串，以“,”隔开
            data = data.join("，");
            return data;
        },
        fieldFormat2(row) {
            var data = [];
            // 防止接口返回null而产生报错等问题
            if (row.field == null) {
                row.field = "";
            }
            // 先将其分割成字符串数组
            let resMap = row.field.split('')
            resMap.map((item) => {
                if (this.options1) {
                    this.options1.forEach((e) => {
                        if (item == e.value) {
                            data.push(e.label);
                        }
                    });
                }
            });
            // 最后把处理好的数据转换为一个字符串，以“,”隔开
            data = data.join("，");
            return data;
        },
        fieldFormat3(row) {
            var data = [];
            // 防止接口返回null而产生报错等问题
            if (row.register_status == null) {
                row.register_status = "";
            }
            if (this.options2) {
                this.options2.forEach((e) => {
                    if (row.register_status == e.value) {
                        data.push(e.label);
                    }
                });
            }
            // 最后把处理好的数据转换为一个字符串，以“,”隔开
            data = data.join("，");
            return data;
        },
    },

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
    max-width: 300px;
}
</style>