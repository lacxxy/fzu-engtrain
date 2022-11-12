<template>
    <div id="PostManager">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="网点快递员列表" name="0"></el-tab-pane>
            <el-tab-pane label="注册申请" name="1"></el-tab-pane>
        </el-tabs>


        <el-table v-if="activeName == 0" size="large" :data="tableData" style="width: 100%" max-height="300px">
            <el-table-column fixed prop="username" label="账户名" />
            <el-table-column fixed prop="phone" label="手机号" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        移除出网点
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table v-if="activeName == 1" size="large" :data="applyData" style="width: 100%" max-height="300px">
            <el-table-column fixed prop="username" label="账户名" />
            <el-table-column fixed prop="phone" label="手机号" />
            <el-table-column fixed prop="time" label="申请时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click.prevent="showdetail(scope.$index)">
                        通过申请
                    </el-button>
                    <el-button link type="danger" size="small" @click.prevent="showdetail(scope.$index)">
                        拒绝申请
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

export default {
    name: 'PostManager',
    data() {
        return {
            activeName: '0',
            tableData: [
                {
                    username: 'Tom',
                    phone: '12312432',
                },
            ],
            applyData: [
                {
                    username: 'Tom',
                    phone: '12312432',
                    time: '2011-2-11'
                },
            ]
        }
    },
    methods: {
        handleClick() {
            console.log(this.activeName)
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