<template>
    <div id="ListView">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="网点快递" name="0"></el-tab-pane>
        </el-tabs>
        <div class="row">
            <span class="sub-title">
                快递单号
            </span>
            <el-input class="ipt" placeholder="请输入单号" />
            <el-button type="primary">查询</el-button>
        </div>


        <el-table size="large" :data="tableData" style="width: 100%" max-height="300px">
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
                        指明下一网点
                    </el-button>
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        确认送达
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
            ]
        }
    },
    methods: {
        handleClick(i) {
            console.log(i)
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