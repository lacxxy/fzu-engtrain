<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="可揽件" name="0"></el-tab-pane>
            <el-tab-pane label="我的揽件" name="1"></el-tab-pane>
        </el-tabs>

        <el-table v-if="showState == 0" size="large" :data="tableData" style="width: 100%" max-height="400px">
            <el-table-column fixed prop="recv" label="收件人" />
            <el-table-column prop="state" label="快递状态" />
            <el-table-column prop="number" label="快递单号" />
            <el-table-column prop="time" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        详情
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        揽件
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table v-if="showState == 1" size="large" :data="myData" style="width: 100%" max-height="400px">
            <el-table-column fixed prop="recv" label="收件人" />
            <el-table-column prop="state" label="快递状态" />
            <el-table-column prop="number" label="快递单号" />
            <el-table-column prop="time" label="发货时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        详情
                    </el-button>
                    <el-button link type="danger" size="small" @click.prevent="showdetail(scope.$index)">
                        妥投
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
            showState: 0,
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
                }, {
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
                }, {
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
                }, {
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
            ],
            myData: [
                {
                    time: '2016-05-01',
                    recv: 'Tom',
                    state: '已发货',
                    number: '12312432',
                },
            ]
        }
    },
    methods: {
        handleClick(i) {
            this.showState = i;
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