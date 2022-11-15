<template>
    <div id="PostManager">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="网点信息查询" name="0"></el-tab-pane>
            <el-tab-pane label="网点注册审核" name="1"></el-tab-pane>
        </el-tabs>

        <el-input v-if="activeName == 0" placeholder="请输入网点id" v-model="netid" @input="search"></el-input>


        <el-table v-if="activeName == 0" size="large" :data="tableData" style="width: 100%" max-height="300px">
            <el-table-column fixed prop="user.name" label="账户名" />
            <el-table-column fixed prop="user.tel" label="手机号" />
            <el-table-column fixed prop="now_sended_num" label="送达数量" />
            <el-table-column fixed prop="now_wait_send_num" label="待送达数量" />
            <el-table-column fixed prop="user.email" label="邮箱" />
        </el-table>
        <el-table v-if="activeName == 1" size="large" :data="applyData" style="width: 100%" max-height="300px">
            <el-table-column prop="user.name" label="申请人" />
            <el-table-column prop="user.tel" label="手机号" />
            <el-table-column fixed prop="netPoint.name" label="申请网点名" />
            <el-table-column prop="netPoint.address" label="申请网点地址" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="dealApply(scope.$index, '0')">
                        通过申请
                    </el-button>
                    <el-button link type="danger" size="small" @click.prevent="dealApply(scope.$index, '1')">
                        拒绝申请
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'PostManager',
    data() {
        return {
            activeName: '0',
            tableData: [


            ],
            applyData: [

            ],
            netid: '',
            timer: null
        }
    },
    methods: {
        handleClick(i) {
            if (i == 1) {
                this.getApplyList()
            }
        },
        search() {
            const that = this;
            if (that.timer !== null) clearTimeout(that.timer)
            that.timer = setTimeout(() => {
                axios.post('/netPointManage/findAllSendman', {
                    cookie: that.netid
                }).then(res => {
                    res = res.data;
                    if (res.state == 200) {
                        that.tableData = res.objs;
                    }
                })
            }, 1000)
        },
        getApplyList() {
            const that = this;
            axios.get('/admin/getRegister').then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.applyData = res.objs;
                }
            })
        },
        dealApply(i, type) {
            const that = this;
            axios.post('/admin/processRegister', {
                user_id: that.applyData[i].user.user_id,
                status: type
            }).then(res => {
                res = res.data;
                alert(res.msg);
                window.location.reload()
            })
        }
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
}
</style>