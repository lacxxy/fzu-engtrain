<template>
    <div id="insert">
        <div id="search-area">
            <div class="column-area">
                <label>选择类别</label>
                <el-select v-model="type" collapse-tags multiple placeholder="注册类型" size="middle" @change="changeType">
                    <el-option v-for="item in serveType" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="column-area">
                <label>名称</label>
                <el-input clearable v-model="search_name" @input="changeIpt"></el-input>
            </div>

        </div>
        <div id="main-insert">
            <!-- <div class="card-div" v-for="item in serveType" :key="item.value">
                <i></i>
                <span>{{ item.label }}</span>
                <a @click="choose(item.value)">
                    <img src="../assets/arrow.png">
                    <img src="../assets/arrow1.png">
                </a>

            </div> -->
            <el-table :data="tableData" style="width: 100%" size="large" stripe="true">
                <!-- <el-table-column fixed prop="service_id" label="服务id" width="100" /> -->
                <el-table-column prop="service_name" label="服务名称" width="150" />
                <el-table-column prop="service_type" :formatter="formatType" label="服务类型" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button link type="success" size="small"
                            @click="showDetail(scope.$index, scope.row)">服务详情</el-button>
                        <el-button @click="choose(scope.$index, scope.row)" link type="primary"
                            size="small">下单服务</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="centerDialogVisible" width="600px" align-center>
            <el-form label-width="120px">

                <p class="insert-title">服务目的地：</p>
                <div class="row">
                    <el-input size="middle" v-model="addr" placeholder="请输入服务的目的地"></el-input>
                </div>

                <p class="insert-title">服务预约时间：</p>

                <div class="row">
                    <el-date-picker v-model="serve_time" type="datetimerange" range-separator="To" start-placeholder="开始时间"
                        end-placeholder="结束时间" />
                </div>

                <p class="insert-title">备注：</p>

                <div class="row">
                    <el-input v-model="supplyMes" type="textarea" placeholder="补充..."></el-input>
                </div>

                <el-button style="margin-top:16px" @click="sendDil">提交</el-button>
            </el-form>
        </el-dialog>

        <el-dialog v-model="centerDetailVisible" width="600px" align-center>
            <el-descriptions title="服务详情" direction="vertical" :column="3" :size="size" border>
                <el-descriptions-item label="服务id">{{ showMes.service_id }}</el-descriptions-item>
                <el-descriptions-item label="服务图片">
                    <img class="server_img" v-bind:src="url + showMes.service_img">
                </el-descriptions-item>
                <el-descriptions-item label="服务名称">{{ showMes.service_name
                }}</el-descriptions-item>
                <el-descriptions-item label="服务描述">{{ showMes.service_process
                }}</el-descriptions-item>

            </el-descriptions>
        </el-dialog>
    </div>
</template>
<script>

import axios from 'axios'
import Cookies from 'js-cookie'
import common from '../../common'
export default {
    name: 'InsertNew',
    data() {
        return {
            options: [

            ],
            url: null,
            tableData: [],
            addr: '',
            select_serverid: null,
            serve_time: null,
            supplyMes: '',
            centerDialogVisible: false,
            centerDetailVisible: false,
            serveType: [
            ],
            type: null,
            showMes: null,
            search_name: ''
        }
    },
    created() {
        //this.getServeType()
        this.serveType = common.serverList
        this.url = common.baseUrl
        this.getAll()
    },
    methods: {
        choose(i, r) {
            this.centerDialogVisible = true;
            this.select_serverid = r.service_id
        },
        changeIpt(e) {
            const that = this;
            this.type = []
            if (e.length == 0) {
                this.getAll();
                return;
            }
            axios.post('/service/getByName', {
                service_name: e
            }).then(res => {
                res = res.data;
                that.tableData = res;
            })
        },
        changeType(e) {
            this.search_name = ''
            if (e.length == 0) {
                this.getAll()
                return;
            }
            const that = this;
            axios.post('/service/getByType', {
                field: e
            }).then(res => {
                res = res.data;
                that.tableData = res
            })
        },
        showDetail(i, r) {
            this.showMes = r;
            this.centerDetailVisible = true;
        },
        formatType(row, column, val) {
            return this.serveType[val].label
        },
        getAll() {
            const that = this;
            axios.get('/service/getAll').then(res => {
                res = res.data;
                that.tableData = res
            })
        },
        async sendDil() {
            const that = this;
            if (!this.serve_time) {
                alert("无法为空");
                return;
            }
            let begin_time = this.serve_time[0].getTime();
            let end_time = this.serve_time[1].getTime();
            const d = {
                order_addr: this.addr,
                order_extra_user_demand: this.supplyMes,
                order_appoint_time_start: begin_time,
                order_appoint_time_end: end_time,
                user_id: Cookies.get('user_id'),
                service_id: this.select_serverid
            }
            for (let key in d) {
                console.log(d[key])
                if (d[key] == undefined || d[key] == "" || d[key] == null) {
                    alert("错误");
                    return;
                }
            }
            axios.post('/user/createOrder', d).then(res => {
                res = res.data;
                alert(res.msg);
                if (res.state == 200) {
                    that.select_serverid = null;
                    that.addr = '';
                    that.serve_time = null;
                    that.supplyMes = '';
                }
            })
        }
    },

}
</script>
<style>
#insert {
    width: 100%;
    height: 100%;
}

#main-insert {
    display: flex;
    flex-wrap: wrap;
}

.card-div {
    margin: 20px;
    padding: 5px;
    width: 40%;
    display: flex;
    flex-direction: column;
}

.card-div:hover {
    background-color: #f2f2f2;
}

.card-div i {
    display: block;
    width: 45px;
    height: 2px;
    background-color: #409eff;
    margin-bottom: 10px;
}

.card-div span {
    height: 40px;
    color: #409eff;
    font-size: 20px;
}

.card-div img {
    width: 30px;
    height: 30px;
}

.card-div img:last-child {
    display: none;
}

a:hover img:last-child {
    display: block;
    cursor: pointer;
}

a:hover img:first-child {
    display: none;
}

.el-cascader-panel {
    display: flex;
    flex-wrap: wrap;
    max-width: 500px;
}

.server_img {
    width: 80px;
    height: 80px;
}

.el-cascader-menu {
    width: 200px !important;
}

.insert-title {
    margin: 16px 0;
}

.el-picker-panel__body-wrapper {
    height: 300px;
    overflow: scroll;
}

#search-area {
    display: flex;
}

.column-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

label {
    min-width: 40px;
    margin: 0 15px;
}

.el-input {
    height: 30px;
}
</style>