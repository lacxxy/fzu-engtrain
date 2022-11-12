<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="全部" name="0"></el-tab-pane>
            <el-tab-pane label="未发货" name="1"></el-tab-pane>
            <el-tab-pane label="已发货" name="2"></el-tab-pane>
        </el-tabs>
        <el-row class="row">
            <el-col>
                <span class="sub-title">
                    查询时间
                </span>
                <el-date-picker v-model="sendtime" type="date" placeholder="发货时间" />
                <el-radio-group v-model="radio">
                    <el-radio :label="0">昨天</el-radio>
                    <el-radio :label="1">今天</el-radio>
                    <el-radio :label="2">最近一周</el-radio>
                    <el-radio :label="3">最近一个月</el-radio>
                    <el-radio :label="4">90天之内</el-radio>
                    <el-radio :label="5">90天之前</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>

        <div class="row">
            <span>
                <span class="sub-title">
                    快递状态
                </span>
                <el-select v-model="poststate" placeholder="请选择" class="ipt">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </span>

            <span class="sub-title">
                快递单号
            </span>
            <el-input class="ipt" placeholder="请输入单号" />

        </div>

        <el-row class="row">
            <span class="sub-title">
                收件人姓名
            </span>
            <el-input class="ipt" placeholder="请输入姓名" />

            <span class="sub-title">
                收件人电话
            </span>
            <el-input class="ipt" placeholder="请输入电话" />

        </el-row>

        <el-row :gutter="10" class="row">
            <el-button>重置</el-button>
            <el-button type="primary">查询</el-button>
        </el-row>

        <el-table size="large" :data="tableData" style="width: 100%" max-height="300px">
            <el-table-column fixed prop="recv" label="收件人"/>
            <el-table-column prop="state" label="快递状态"/>
            <el-table-column prop="number" label="快递单号"/>
            <el-table-column prop="time" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

export default {
    name: 'ListView',
    data() {
        return {
            radio: '',
            poststate: '',
            sendtime: '',
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
                {
                    time: '2016-05-01',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-02',
                    recv: 'Tom',
                    state: '待发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-03',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },{
                    time: '2016-05-01',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-02',
                    recv: 'Tom',
                    state: '待发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-03',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },{
                    time: '2016-05-01',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-02',
                    recv: 'Tom',
                    state: '待发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-03',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },{
                    time: '2016-05-01',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-02',
                    recv: 'Tom',
                    state: '待发货',
                    number: '12312432',
                },
                {
                    time: '2016-05-03',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
            ]
        }
    }
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