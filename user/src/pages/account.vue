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
        <!---div class="item">
            <span class="title" @click="editorChange(2)">邮 箱</span>
            <span>：</span>
            <span v-show="!editor.email" @click="editorChange(2)">{{ email }}</span>
            <el-input ref="emailEdit" v-model="email" v-show="editor.email" style="width:200px" @blur="postChange(2)" />
        </div-->
        <div class="item">
            <span class="title">
                <el-button type="danger" @click="exit">退出登录</el-button>
            </span>
            <span class="title">
                <el-button @click="centerDialogVisible = true">修改密码</el-button>
            </span>
        </div>

        <el-dialog v-model="centerDialogVisible" width="400px" align-center>
            <!--el-input v-model="pass.old" class="ipt" placeholder="旧密码" /-->
            <el-input v-model="pass.new" class="ipt" placeholder="新密码" />
            <el-button class="ipt" type="danger" @click="changePass">确认更改</el-button>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie'
export default {
    name: 'AccountMes',
    data() {
        return {
            id_number: "",
            name: "",
            net_point_id: '',
            password: "",
            status: null,
            tel: "",
            type: null,
            user_id: null,
            prename: '',
            centerDialogVisible: false,
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
        this.getMes()
    },
    methods: {
        exit() {
            Cookies.remove("cookie")
            Cookies.remove("user_name")
            Cookies.remove("user_id");
            this.changeIflogin(false);
            window.location.reload()
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
            })
        },
        /*postChange(type) {
            if (this.preemail == this.email && this.prename == this.name) {
                this.editor.name = false;
                this.editor.email = false;
                return;
            }
            const d = {
                cookie: localStorage.cookie,
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
        },*/
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
                }else{
                    alert(res.msg);
                }
            })
        }
    }
}
</script>
<style scoped>
#AccountMes {
   
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

.ipt {
    margin-top: 20px;
}

.item {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
</style>