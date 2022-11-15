<template>
    <div id="AccountMes">
        <div class="item">
            <span class="title">昵 称</span>
            <span>：</span>
            <span v-show="!editor.name" @click="editorChange(1)">{{ name }}</span>
            <el-input ref="nameEdit" v-model="name" v-show="editor.name" style="width:200px" @blur="postChange(1)" />
        </div>
        <div class="item">
            <span class="title">手机号码</span>
            <span>：</span>
            <span>{{ tel }}</span>
        </div>
        <div class="item">
            <span class="title">邮箱</span>
            <span>：</span>
            <span v-show="!editor.email" @click="editorChange(2)">{{ email }}</span>
            <el-input ref="emailEdit" v-model="email" v-show="editor.email" style="width:200px" @blur="postChange(2)" />
        </div>
        <div class="item">
            <el-select v-model="netpoint" placeholder="请选择网点">
                <el-option v-for="item in options" :key="item.net_point_id" :label="item.address" :value="item.net_point_id" />
            </el-select>
            <span class="title">
                <el-button type="primary" @click="register">网点注册</el-button>
            </span>
        </div>
        <div class="item">
            <span class="title">
                <el-button type="danger" @click="exit">退出登录</el-button>
            </span>
            <span class="title">
                <el-button @click="centerDialogVisible = true">修改密码</el-button>
            </span>
        </div>
        <el-dialog v-model="centerDialogVisible" width="400px" align-center>
            <el-input v-model="pass.old" class="ipt" placeholder="旧密码" />
            <el-input v-model="pass.new" class="ipt" placeholder="新密码" />
            <el-button class="ipt" type="danger" @click="changePass">确认更改</el-button>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'AccountMes',
    data() {
        return {
            email: "",
            id_number: "",
            name: "",
            net_point_id: null,
            password: "",
            status: null,
            tel: "",
            type: null,
            user_id: null,
            prename: '',
            preemail: '',
            centerDialogVisible: false,
            netpoint: '',
            options: [],
            pass: {
                old: '',
                new: ''
            },
            editor: {
                name: false,
                email: false
            }
        }
    },
    props: {
        changeIflogin: Function
    },
    created() {
        this.getMes();
        this.getOpitions()
    },
    methods: {
        exit() {
            localStorage.cookie_admin = 'null';
            this.changeIflogin(false);
            window.location.reload()
        },
        getOpitions() {
            const that = this;
            axios.post('/sendman/getSendmanNetpoint', {
                cookie: localStorage.cookie_admin,
                status: 2
            }).then(res => {
                res = res.data;
                that.options = res.objs;
            })
        },
        getMes() {
            const that = this;
            axios.post('/user/getInfo', {
                cookie: localStorage.cookie_admin
            }).then(res => {
                res = res.data;
                let obj = res.obj;
                that.email = obj.email;
                that.id_number = obj.id_number;
                that.name = obj.name;
                that.tel = obj.tel;
            })
        },
        postChange(type) {
            if (this.preemail == this.email && this.prename == this.name) {
                this.editor.name = false;
                this.editor.email = false;
                return;
            }
            const d = {
                cookie: localStorage.cookie_admin,
                type: type,
                msg: type == 1 ? this.name : this.email
            }
            const that = this;
            axios.post('/user/changeInfo', d).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("成功");
                    that.prename = that.name;
                    that.preemail = that.email;
                }
            }).catch(() => {
                alert("错误！")
                that.name = that.prename;
                that.email = that.preemail;
            })
            this.editor.name = false;
            this.editor.email = false;
        },
        editorChange(type) {
            const that = this;
            this.prename = this.name;
            this.preemail = this.email;
            if (type == 1) {
                this.$nextTick(() => {
                    that.editor.name = true
                    that.$refs.nameEdit.focus()
                });
            }
            else {
                this.$nextTick(() => {
                    that.editor.email = true
                    that.$refs.emailEdit.focus()
                });
            }
        },
        changePass() {
            const that = this;
            const d = {
                cookie: localStorage.cookie_admin,
                old_password: that.pass.old,
                new_password: that.pass.new,
            };
            axios.post('/user/changePassword', d).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert(res.msg);
                    that.centerDialogVisible = false;
                }
            })
        },
        register() {
            if (this.netpoint == "") {
                alert("不能为空");
                return;
            }
            const that = this;
            axios.post('/sendman/registerNetpoint', {
                cookie: localStorage.cookie_admin,
                net_point_id: that.netpoint
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("发送申请成功!")
                }
            })
        }
    }
}
</script>
<style scoped>
#AccountMes {
    margin-left: 40px;
}

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

.item {
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.ipt {
    margin-top: 20px;
}
</style>