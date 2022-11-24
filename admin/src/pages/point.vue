<template>
    <div id="Netpoint">


        <el-table size="large" :data="tableData" style="width: 100%" max-height="400px">
            <el-table-column fixed prop="netPoint.name" label="网点名" />
            <el-table-column prop="netPoint.address" label="网点地址" />
            <el-table-column prop="netPoint.net_point_id" label="网点id" />
            <el-table-column prop="status" :formatter="formatState" label="状态" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button v-if="tableData[scope.$index].status==2" link type="primary" size="small" @click.prevent="apply(scope.$index)">
                        申请注册
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'NetPoint',
    data() {
        return {
            tableData: [
            ],

        }
    },
    created() {
        this.getSendmanNetpoint()
    },
    methods: {
        getSendmanNetpoint() {
            const that = this;
            axios.post('/sendman/getSendmanNetpoint', {
                cookie: localStorage.cookie_admin,
                status: '0'
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    that.tableData = res.objs;
                }
            })
        },
        formatState(row, column, cellValue) {
            let res = '';
            if (cellValue == 1) {
                res = '已注册'
            }
            else if (cellValue == 2) {
                res = '未注册'
            }
            else if (cellValue == 3) {
                res = '审核中'
            }
            return res;
        },
        apply(i) {
            const that = this;
            axios.post('/sendman/registerNetpoint', {
                cookie: localStorage.cookie_admin,
                net_point_id: that.tableData[i].netPoint.net_point_id
            }).then(res => {
                res = res.data;
                if (res.state == 200) {
                    alert("发送申请成功!");
                    that.getSendmanNetpoint()
                }
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