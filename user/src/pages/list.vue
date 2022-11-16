<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="我收的" name="0"></el-tab-pane>
            <el-tab-pane label="我寄的" name="1"></el-tab-pane>
        </el-tabs>
        <div class="row">
            <span class="sub-title">
                快递单号
            </span>
            <el-input v-model="order_id" class="ipt" placeholder="请输入单号" />
            <el-button type="primary" @click="search">查询</el-button>
        </div>

        <el-table v-if="activeName == 0" size="large" :data="tableData.slice(5 * (page1 - 1), 5 * page1)"
            style="width: 100%" max-height="300px">
            <el-table-column fixed prop="s_name" label="寄件人" />
            <el-table-column prop="status" :formatter="formatState" label="快递状态" />
            <el-table-column prop="now_point_name" label="当前所在网点" />
            <el-table-column prop="package_order_id" label="快递单号" />
            <el-table-column prop="create_time" :formatter="formatTime" label="创建时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small"
                        @click.prevent="showdetail(5 * (page1 - 1) + scope.$index)">
                        详情
                    </el-button>
                    <el-button v-if="tableData[5 * (page1 - 1) + scope.$index].status == 2" link type="danger"
                        size="small" @click.prevent="signFor(s5 * (page1 - 1) + scope.$index)">
                        签收
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination style="margin-top:25px" v-if="activeName == 0" background layout="prev, pager, next"
            :total="tableData.length" :page-size="5" v-model:current-page="page1" />






        <el-table v-if="activeName == 1" size="large" :data="sendData" style="width: 100%" max-height="300px">
            <el-table-column fixed prop="r_name" label="收件人" />
            <el-table-column prop="status" :formatter="formatState" label="快递状态" />
            <el-table-column prop="now_point_name" label="当前所在网点" />
            <el-table-column prop="package_order_id" label="快递单号" />
            <el-table-column prop="create_time" :formatter="formatTime" label="创建时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small"
                        @click.prevent="showdetail(5 * (page2 - 1) + scope.$index)">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:25px" v-if="activeName == 1" background layout="prev, pager, next"
            :total="sendData.length" :page-size="5" v-model:current-page="page2" />



        <el-dialog v-model="centerDialogVisible" width="600px" align-center>
            <el-descriptions title="快递详情" direction="vertical" :column="3" :size="size" border>
                <el-descriptions-item label="寄件人">{{ message.s_name }}</el-descriptions-item>
                <el-descriptions-item label="寄件人电话">{{ message.s_tel }}</el-descriptions-item>
                <el-descriptions-item label="寄件地址">{{ message.s_addr }}</el-descriptions-item>
                <el-descriptions-item label="收件人">{{ message.r_name }}</el-descriptions-item>
                <el-descriptions-item label="收件人电话">{{ message.r_tel }}</el-descriptions-item>
                <el-descriptions-item label="收件地址">{{ message.r_addr }}</el-descriptions-item>
                <el-descriptions-item label="快递编号">{{ message.package_order_id }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{ formatTime(0, 0, message.create_time) }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ListView',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
            centerDialogVisible: false,
            message: {},
            activeName: '0',
            order_id: '',
            page1: 1,
            page2: 1,
            tableData: [
            ],
            sendData: [
            ]
        }
    },
    created() {
        this.getRecv();
    },
    methods: {
        handleClick(i) {
            if (i == 0) {
                this.getRecv();
            } else if (i == 1) {
                this.getSend();
            }
        },
        formatState(row, column, cellValue) {
            let res = '';
            if (cellValue == 0) {
                res = '待处理'
            }
            else if (cellValue == 1) {
                res = '运输中'
            }
            else if (cellValue == 2) {
                res = '已送达'
            }
            else if (cellValue == 3) {
                res = '已签收'
            }
            return res;
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
                return y + '-' + MM + '-' + d
            }
        },
        getRecv() {
            const that = this;
            axios.post('/user/searchRecvParcel', {
                cookie: localStorage.cookie
            }).then(res => {
                res = res.data;
                that.tableData = res.objs;
            })
        },
        getSend() {
            const that = this;
            axios.post('/user/searchSendParcel', {
                cookie: localStorage.cookie
            }).then(res => {
                res = res.data;
                that.sendData = res.objs;
            })
        },
        showdetail(i) {
            const d = this.activeName == 0 ? this.tableData : this.sendData;
            this.message = d[i];
            this.centerDialogVisible = true
        },
        search() {
            const that = this;
            axios.post('/user/getParcelInfo', { package_order_id: that.order_id }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.message = res.obj;
                    that.centerDialogVisible = true;
                }
                else {
                    alert("无此快递或服务器错误")
                }
            })
        },
        signFor(i) {
            const that = this;
            axios.post('/user/signPackage', {
                package_order_id: that.tableData[i].package_order_id
            }).then(res => {
                res = res.data;
                alert(res.msg);
                that.getRecv()
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