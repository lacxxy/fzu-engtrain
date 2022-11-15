<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="可揽件" name="0"></el-tab-pane>
            <el-tab-pane label="我的揽件" name="1"></el-tab-pane>
        </el-tabs>

        <el-table v-if="activeName == 0" size="large" :data="tableData" style="width: 100%" max-height="400px">
            <el-table-column fixed prop="recvNmae" label="收件人" />
            <el-table-column prop="status" :formatter="formatState" label="快递状态" />
            <el-table-column prop="package_order_id" label="快递单号" />
            <el-table-column prop="create_time" :formatter="formatTime" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="takeDlv(scope.$index)">
                        揽件
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table v-if="activeName == 1" size="large" :data="myData" style="width: 100%" max-height="400px">
            <el-table-column prop="recvNmae" label="收件人" />
            <el-table-column prop="status" :formatter="formatState" label="快递状态" />
            <el-table-column prop="package_order_id" label="快递单号" />
            <el-table-column prop="create_time" :formatter="formatTime" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click.prevent="confirm(scope.$index)">
                        妥投
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ListView',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
            activeName: '0',
            options: [
                {
                    value: '0',
                    label: '全部',
                },
                {
                    value: '1',
                    label: '未发货',
                },
                {
                    value: '2',
                    label: '已发货',
                },
            ],
            tableData: [

            ],
            myData: [

            ]
        }
    },
    created() {
        this.getWaitTake()
    },
    methods: {
        handleClick(i) {
            if (i == 0) {
                this.getWaitTake();
            } else if (i == 1) {
                this.getTaken();
            }
        },
        takeDlv(i) {
            const that = this;
            axios.post('/sendman/takeDelivery', {
                cookie: localStorage.cookie_admin,
                delivery_order_id: that.tableData[i].delivery_order_id,
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("揽件成功");
                    that.getWaitTake();
                }
            })
        },
        confirm(i) {
            const that = this;
            axios.post('/sendman/finishDelivery', {
                cookie: localStorage.cookie_admin,
                delivery_order_id: that.myData[i].delivery_order_id
            }).then(res => {
                res = res.data;
                alert(res.msg)
            })
        },
        finishDelivery(i) {
            const that = this;
            axios.post('/sendman/finishDelivery', {
                cookie: localStorage.cookie_admin,
                delivery_order_id: that.myData[i].package_order_id,
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("妥投成功");
                    that.getWaitTake();
                }
            })
        },
        getWaitTake() {
            const that = this;
            axios.post('/sendman/getWaitTake', {
                cookie: localStorage.cookie_admin,
                net_point_id: -1
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData = res.objs;
                }
            })
        },
        getTaken() {
            const that = this;
            axios.post('/sendman/getTaken', {
                cookie: localStorage.cookie_admin,
                net_point_id: -1,
                status: "2"
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.myData = res.objs;
                }
            })
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