<template>
    <div id="AccountMes">
        <div class="item">
            <span class="title">昵 称</span>
            <span>：</span>
            <span>{{ name }}</span>
        </div>
        <div class="item">
            <span class="title">手机号码</span>
            <span>：</span>
            <span>{{ tel }}</span>
        </div>

        <div v-if="ifServerman">
            <div class="item">
                <span class="title">描 述</span>
                <span>：</span>
                <span>{{ desc }}</span>
            </div>
            <div class="item">
                <span class="title">擅长领域</span>
                <span>：</span>
                <span>{{ formatField(field) }}</span>
            </div>
            <div class="item">

                <span class="title">所属公司id</span>
                <span>：</span>

                <span v-if="this.register_status == 1 && this.company_id != -1">{{ company_id }}</span>
                <span v-else-if="this.register_status == 0">审核中</span>

                <el-button @click="showRegister" v-if="this.company_id == -1">注册</el-button>
            </div>
        </div>

        <div class="item">
            <span class="title">
                <el-button type="danger" @click="exit">退出登录</el-button>
            </span>
            <span class="title">
                <el-button @click="centerDialogVisible = true">修改密码</el-button>
            </span>
            <span class="title" v-if="ifServerman">
                <el-button @click="centerMesVisible = true">修改信息</el-button>
            </span>
        </div>

        <el-dialog v-model="centerDialogVisible" width="400px" align-center>
            <el-input v-model="pass.new" class="ipt" placeholder="新密码" />
            <el-button class="ipt" type="danger" @click="changePass">确认更改</el-button>
        </el-dialog>

        <el-dialog v-model="centerMesVisible" width="400px" align-center>
            <el-input class="ipt" v-model="edit.desc" clearable="true" placeholder="自我描述" />
            <el-select class="ipt" collapse-tags v-model="edit.field" multiple placeholder="擅长领域">
                <el-option v-for="item in serveType" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

            <el-button class="ipt" type="danger" @click="changeInfo">确认更改</el-button>
        </el-dialog>

        <el-dialog v-model="centerCompanyVisible" width="400px" align-center>
            <el-select class="ipt" v-model="company" placeholder="选择公司">
                <el-option v-for="item in company_list" :key="item.user_id" :label="item.user_name" :value="item.user_id" />
            </el-select>
            <el-button class="ipt" type="primary" @click="registerToCompany">确认注册</el-button>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie'
import common from '../../common'
export default {
    name: 'AccountMes',
    data() {
        return {
            register_status: null,
            id_number: "",
            name: "",
            password: "",
            tel: "",
            type: null,
            user_id: null,
            desc: '',
            field: [],
            prename: '',
            company_id: '',
            centerDialogVisible: false,
            centerMesVisible: false,
            centerCompanyVisible: false,
            serveType: [],
            company_list: [],
            company: '',
            registerToCompanyId: null,
            pass: {
                old: '',
                new: ''
            },
            edit: {
                desc: '',
                field: []
            }
        }
    },
    computed: {
        ifServerman() {
            return Cookies.get('type') == 3;
        },
    },
    props: {
        changeIflogin: Function
    },
    created() {
        this.getMes();
        this.serveType = common.serverList
    },
    methods: {
        handelCompany() {

        },
        exit() {
            Cookies.remove("cookie")
            Cookies.remove("user_name")
            Cookies.remove("user_id");
            Cookies.remove("type");
            this.changeIflogin(false);
            window.location.reload()
        },
        showRegister() {
            const that = this;
            axios.get('/serviceman/getAllCompany').then(res => {
                res = res.data;
                that.company_list = res;
            })
            this.centerCompanyVisible = true;
        },
        formatField(val) {
            if (!val.length) return val;
            let arr = val.split('');
            let res = [];
            console.log(arr);
            for (let item of arr) {
                for (let i of common.serverList) {
                    if (i.value == item) {
                        res.push(i.label);
                        break;
                    }
                }
            }
            return res.join('、');
        },
        getMes() {
            const that = this;
            axios.post('/common/getInfo', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                that.id_number = res.user_id;
                that.name = res.user_name;
                that.tel = res.phone_number;
                that.desc = res.desc;
                that.field = res.field;
                that.company_id = res.company_id;
                that.register_status = res.register_status
            })
        },

        changePass() {
            const that = this;
            const d = {
                user_id: Cookies.get('user_id'),
                //old_password: that.pass.old,
                password: that.pass.new,
            };
            axios.post('/common/changePassword', d).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert(res.msg);
                    that.centerDialogVisible = false;
                } else {
                    alert(res.msg);
                }
            })
        },
        changeInfo() {
            const that = this;
            axios.post('/serviceman/changeInfo', {
                user_id: Cookies.get('user_id'),
                field: that.edit.field,
                desc: that.edit.desc
            }).then(res => {
                res = res.data;
                alert(res.msg);
                window.location.reload()
            })
        },
        registerToCompany() {
            const that = this;
            axios.post('/serviceman/registerToCompany', {
                serviceman_id: Cookies.get('user_id'),
                company_id: that.company
            }).then(res => {
                res = res.data;
                alert(res.msg);
                window.location.reload();
            })
        }
    }
}
</script>
<style scoped>
#AccountMes {}

.title {
    font-size: 20px;
    display: inline-block;
    width: 100px;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
}

span {
    font-size: 20px;
}

.ipt {
    margin: 0 5px;
    margin-top: 20px;
}

.item {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
</style>