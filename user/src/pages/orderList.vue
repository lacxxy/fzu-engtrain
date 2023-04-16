<template>
    <div id="OrderList">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="order_id" label="订单号" width="100" />
            <el-table-column prop="order_status" :formatter="formatStatus" label="订单状态" width="150" />
            <el-table-column prop="order_appoint_time_start" :formatter="formatTime" label="预定开始时间" />
            <el-table-column prop="order_addr" label="地点" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="success" size="small" v-if="scope.row.order_status == 0"
                        @click="showAllocate(scope.$index, scope.row)">分配家政员</el-button>
                    <el-button @click="showRefuse(scope.$index, scope.row)" link type="danger" size="small"
                        v-if="scope.row.order_status == 0">拒绝订单</el-button>

                    <el-button link type="primary" size="small" @click="begin_server(scope.$index, scope.row)"
                        v-if="scope.row.order_status == 1 && ifServerman">开始服务</el-button>

                    <el-button link type="primary" size="small" @click="openChat(scope.row)">发起聊天</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="centerDialogVisible_refuse" width="400px" align-center>
            <p class="login-title">拒绝订单</p>
            <el-input class="login-ipt" v-model="refuse_reason" clearable="true" placeholder="拒绝理由" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="danger" @click="refuse">
                        确认拒绝
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="centerDialogVisible_allocate" width="400px" align-center>
            <p class="login-title">分配家政员</p>

            <el-select @change="handelMan" class="login-ipt" v-model="serveManName" placeholder="选择家政员">
                <el-option v-for="item in serveManList" :key="item.user_id" :label="item.user_name" :value="item.user_id" />
            </el-select>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="allocation">
                        确认分配
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    name: 'OrderList',
    data() {
        return {
            centerDialogVisible_refuse: false,
            centerDialogVisible_allocate: false,
            refuse_reason: '',
            id: null,
            serveManName: '',
            serveManId: null,
            serveManList: [],
            tableData: []
        }
    },
    computed: {
        ifServerman() {
            return Cookies.get('type') == 3;
        },
    },
    created() {
        this.getServerMan();
        this.gettableData();
    },
    methods: {
        openChat(r) {
            this.$store.commit('newChat', r)
            this.$router.push('/chat')
        },
        handelMan(val) {
            this.serveManId = val;
        },
        formatStatus(row, column, cellValue) {

            const obj = ['订单创建', '分配家政员', '家政员开始服务', '结束服务']
            return obj[cellValue]
        },
        formatTime(row, column, cellValue) {
            let value = cellValue
            if (value == null) {
                return ''
            } else {
                const date = new Date(value * 1)
                const y = date.getFullYear()// 年
                let MM = date.getMonth() + 1 // 月
                MM = MM < 10 ? ('0' + MM) : MM
                let d = date.getDate() // 日
                d = d < 10 ? ('0' + d) : d
                let h = date.getHours() // 小时
                h = h < 10 ? ('0' + h) : h;
                let s = date.getSeconds() // 秒
                s = s < 10 ? ('0' + s) : s;
                return y + '年' + MM + '月' + d + '日' + h + ':' + s;
            }
        },
        getServerMan() {
            const that = this;
            axios.post('/company/getMyServiceman', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                that.serveManList = res;
            })
        },
        allocation() {
            const that = this;
            axios.post('/company/assignServiceMan', {
                user_id: that.serveManId,
                order_id: that.id
            }).then(res => {
                res = res.data;
                alert(res.msg);
            })
        },
        gettableData() {
            let type = Cookies.get('type');
            let url = type == 2 ? '/company/getMyOrder' : '/serviceman/getMyOrder'
            const that = this;
            axios.post(url, {
                user_id: Cookies.get('user_id'),
            }).then(res => {
                res = res.data;
                that.tableData = res;
            })
        },
        showRefuse(i) {
            this.centerDialogVisible_refuse = true;
            this.id = this.tableData[i].order_id;
        },
        showAllocate(i) {
            this.centerDialogVisible_allocate = true;
            this.id = this.tableData[i].order_id;
        },
        refuse() {
            const that = this;
            axios.post('/company/rejectOrder', {
                order_id: that.id,
                reject_reason: that.refuse_reason
            }).then(res => {
                res = res.data;
                alert(res.msg)
            })
        },
        begin_server(i, r) {
            axios.post('/serviceman/startService', {
                order_id: r.order_id
            }).then(res => {
                res = res.data;
                alert(res.msg);
                window.location.reload()
            })
        }
    }
}
</script>