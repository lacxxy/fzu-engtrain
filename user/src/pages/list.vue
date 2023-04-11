<template>
    <div id="ListView">
        <div class="row">
            <el-input v-model="order_id" class="ipt" placeholder="请输入单号" />
            <el-button type="primary" @click="search">查询</el-button>
        </div>

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
                <div>
                    <span :style="'color:' + formatClass(item.order_status)">{{ formatState('', '', item.order_status)
                    }}</span>
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
            message: {},
            activeName: '0',
            order_id: '',
            page1: 1,
            page2: 1,
            tableData: [
                {
                    "order_actual_time_end": 1680623568000,
                    "order_actual_time_start": 1680623543000,
                    "order_addr": "福建省福州市福州大学旗山校区",
                    "order_appoint_time_end": 0,
                    "order_appoint_time_start": 1680623543000,
                    "order_estimation": "好",
                    "order_extra_user_demand": "无",
                    "order_id": 3,
                    "order_reject_reason": "",
                    "order_star": 9,
                    "order_status": "3",
                    "service": {
                        "service_id": 4,
                        "service_img": "/img/家庭搬家.jpg",
                        "service_name": "家庭搬家",
                        "service_process": "1.专业的客服人员为您的搬家服务估价\n2.由专业的搬家顾问为您上门测量记录所需要打包收纳和搬运的物品尺寸，以便在搬家时给您带来合适尺寸的收纳和打包工具\n3.在搬家顾问给您测量需要搬迁打包的物品后为您参考合适的搬家套餐\n4.熊猫搬团队为您的物品进行专业的打包和收纳\n5.专业的搬家工人为您的物品进行运输搬迁\n6.熊猫搬会提供专业的保洁服务，给您的新家做一次保洁清洗服务\n7.熊猫搬在为您服务完成后会对您进行满意度电话回访保证我们服务质量的改善",
                        "service_status": 1,
                        "service_type": 9,
                        "user_id": 10
                    },
                    "serviceman_id": 12,
                    "user_id": 8
                },
                { "order_addr": "福建省福州市福州大学旗山校区", "order_appoint_time_end": 0, "order_appoint_time_start": 0, "order_estimation": "", "order_extra_user_demand": "要求半价", "order_id": 4, "order_reject_reason": "无法半价", "order_star": 0, "order_status": "3", "service": { "service_id": 4, "service_img": "/img/家庭搬家.jpg", "service_name": "家庭搬家", "service_process": "1.专业的客服人员为您的搬家服务估价\n2.由专业的搬家顾问为您上门测量记录所需要打包收纳和搬运的物品尺寸，以便在搬家时给您带来合适尺寸的收纳和打包工具\n3.在搬家顾问给您测量需要搬迁打包的物品后为您参考合适的搬家套餐\n4.熊猫搬团队为您的物品进行专业的打包和收纳\n5.专业的搬家工人为您的物品进行运输搬迁\n6.熊猫搬会提供专业的保洁服务，给您的新家做一次保洁清洗服务\n7.熊猫搬在为您服务完成后会对您进行满意度电话回访保证我们服务质量的改善", "service_status": 1, "service_type": 9, "user_id": 10 }, "user_id": 8 }]
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
</style>