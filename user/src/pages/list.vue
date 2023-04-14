<template>
    <div id="ListView">
        <!-- <div class="row">
            <el-input v-model="order_id" class="ipt" placeholder="请输入单号" />
            <el-button type="primary" @click="search">查询</el-button>
        </div> -->

        <div>
            <el-card class="box-card" v-for="item, i in tableData" :key="item" @click="showdetail(i)">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.service.service_name }}服务</span>
                    </div>
                </template>
                <div>
                    <span>{{ formatTime('', '', item.order_appoint_time_start) }}</span>
                    <span>~</span>
                    <span>{{ formatTime('', '', item.order_appoint_time_end) }}</span>
                </div>
                <div class="end-btn">
                    <span :style="'color:' + formatClass(item.order_status)">{{ formatState('', '', item.order_status)
                    }}</span>
                    <el-button v-if="item.order_status == 2"
                        @click.stop="this.centerStarVisible = true; this.select_id = item.order_id">服务结束</el-button>
                </div>

            </el-card>

        </div>


        <el-dialog v-model="centerDialogVisible" width="600px" align-center>
            <el-descriptions title="服务详情" direction="vertical" :column="3" :size="size" border>
                <el-descriptions-item label="服务">{{ message.service.service_name }}</el-descriptions-item>
                <el-descriptions-item label="地址">{{ message.order_addr }}</el-descriptions-item>
                <el-descriptions-item label="预约开始时间">{{ formatTime(0, 0, message.order_appoint_time_start)
                }}</el-descriptions-item>
                <el-descriptions-item label="预约结束时间">{{ formatTime(0, 0, message.order_appoint_time_end)
                }}</el-descriptions-item>
                <el-descriptions-item label="评价">{{ message.order_estimation }}</el-descriptions-item>
                <el-descriptions-item label="单号">{{ message.order_id }}</el-descriptions-item>
                <el-descriptions-item label="订单状态">{{ formatState(0, 0, message.order_status) }}</el-descriptions-item>
                <el-descriptions-item label="家政员编号">{{ message.serviceman_id }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <el-dialog v-model="centerStarVisible" width="400px" align-center>
            <div class="star_area">
                <el-input class="ipt" v-model="desc" clearable="true" placeholder="服务评价" />
                <el-rate v-model="star" :max=10 />
                <el-button class="ipt" @click="endService">结束服务</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie'
export default {
    name: 'ListView',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
            centerDialogVisible: false,
            centerStarVisible: false,
            message: {},
            activeName: '0',
            order_id: '',
            select_id: null,
            star: 0,
            desc: '',
            tableData: [
            ]
        }
    },
    created() {
        this.getRecv();
    },
    methods: {
        formatState(row, column, cellValue) {
            let res = '';
            if (cellValue == 0) {
                res = '已下单'
            }
            else if (cellValue == 1) {
                res = '已分配家政员'
            }
            else if (cellValue == 2) {
                res = '家政员服务中'
            }
            else if (cellValue == 3) {
                res = '服务结束'
            }
            return res;
        },
        formatClass(val) {
            const obj = {
                0: 'green',
                1: 'blue',
                2: 'green',
                3: 'red',
            }
            return obj[val]
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
        getRecv() {
            const that = this;
            axios.post('/user/getMyOrder', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                that.tableData = res;
            })
        },
        showdetail(i) {
            const d = this.activeName == 0 ? this.tableData : this.sendData;
            this.message = d[i];
            this.centerDialogVisible = true
        },
        async endService() {
            const that = this;
            if (this.desc == "" || this.star == 0) {
                alert("不能为空");
                return;
            }
            let res = await axios.post('/user/endService', {
                order_id: that.select_id
            });
            if (res.data.state != 200) {
                alert(res.msg);
                return;
            }
            res = await axios.post('/user/starAndEstimation', {
                order_id: that.select_id,
                order_star: that.star,
                order_estimation: that.desc
            });
            alert(res.data.msg);
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

.card-mes {
    display: flex;
    justify-content: space-around;
}

img {
    width: 30px;
}

.dlvState {
    text-align: center;
    font-size: 14px;
}

.row {
    display: flex;
    margin: 5px 0;
}

.box-card {
    margin: 10px 0;
    background-color: rgb(205 230 247 / 20%);
}

.card-main {
    text-align: center;
}

.card-img {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-area {
    font-weight: bolder;
    font-size: 18px;
}

.card-name {
    color: rgb(148, 147, 147);
}

.end-btn {
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
}

.star_area {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ipt {
    width: 80%;
    margin: 10px 0;
}
</style>