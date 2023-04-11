<template>
    <div id="insert">

        <div id="main-insert">
            <div class="card-div" v-for="item in serveType" :key="item.value">
                <i></i>
                <span>{{ item.label }}</span>
                <a @click="choose(item.value)">
                    <img src="http://www.51ejz.com/images/index-icon-1.png">
                    <img src="http://www.51ejz.com/images/index-icon-3-1.png">
                </a>

            </div>
        </div>

        <el-dialog v-model="centerDialogVisible" width="600px" align-center>
            <el-form :model="send" label-width="120px">
                <el-select v-model="serve_type" placeholder="请选择服务" size="middle">
                    <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key" />
                </el-select>

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
            serve_type: null,
            addr: '',
            serve_time: null,
            supplyMes: '',
            centerDialogVisible: false,
            serveType: [
            ]
        }
    },
    created() {
        //this.getServeType()
        this.serveType=common.serverList
    },
    methods: {
        // getServeType() {
        //     const that = this;
        //     axios.get('/service/getAllClass').then(res => {
        //         res = res.data;
        //         for (let index in res) {
        //             that.serveType.push(
        //                 {
        //                     label: index,
        //                     value: res[index]
        //                 }
        //             )
        //         }
        //     });
        // },
        choose(item) {
            this.options = []
            this.serve_type = null
            this.centerDialogVisible = true;
            console.log(item);
            const that = this;
            axios.post('/service/getByType', {
                field: item
            }).then(res => {
                res = res.data;
                for (let index in res) {
                    that.options.push(
                        {
                            key: res[index].service_id,
                            label: res[index].service_name,
                            value: res[index]
                        }
                    )
                }
            });
            console.log(this.options)
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
                service_id: this.serve_type
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
                    that.serve_type = null;
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
    background-color: #FF7124;
    margin-bottom: 10px;
}

.card-div span {
    height: 40px;
    color: #FF7124;
    font-size: 20px;
}

.card-div img {
    width: 25px;
    height: 25px;
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

.el-cascader-menu {
    width: 200px !important;
}

.insert-title {
    margin: 16px 0;
}
.el-picker-panel__body-wrapper{
    height: 150px;
    overflow: scroll;
}
</style>