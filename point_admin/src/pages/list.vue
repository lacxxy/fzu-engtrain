<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="网点待处理快递" name="0"></el-tab-pane>
        </el-tabs>
        <!---
        <div class="row">
            <span class="sub-title">
                快递单号
            </span>
            <el-input class="ipt" placeholder="请输入单号" />
            <el-button type="primary">查询</el-button>
        </div>
        -->

        <el-table size="large" :data="tableData" style="width: 100%" max-height="300px">
            <el-table-column prop="status" :formatter="formatState" label="快递状态" />
            <el-table-column prop="delivery_order_id" label="快递单号" />
            <el-table-column prop="create_time" :formatter="formatTime" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small"
                        @click.prevent="selectId = scope.$index; centerVisible = true">
                        指明下一网点
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="centerVisible" width="400px" align-center>
            <el-input v-model="nextpoint" placeholder="输入下一网点号"></el-input>
            <el-button @click="submitNext" style="margin-top: 20px;">确定</el-button>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ListView',
    data() {
        return {
            tableData: [

            ],
            centerVisible: false,
            nextpoint: '',
            selectId: null
        }
    },
    created() {
        this.getDlv();
    },
    methods: {
        handleClick(i) {
            console.log(i)
        },
        getDlv() {
            const that = this;
            axios.post('/netpoint/getDelivery', {
                cookie: localStorage.cookie_point,
                status: 0,
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData = res.objs
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
        submitNext() {
            const that = this;
            const d = {
                delivery_order_id: that.tableData[that.selectId].delivery_order_id,
                net_point_id_next: that.nextpoint
            }
            axios.post('/netPointManage/processDelivery', d).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("分配成功！");
                    that.centerVisible = false;
                    that.getDlv()
                }
            })
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