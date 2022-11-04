<template>
    <div id="insert">
        <el-avatar class="avatarRecv"> 收 </el-avatar>
        <span class="title">收件人</span>
        <el-row :gutter="20" class="demo-autocomplete">
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    姓名
                </div>
                <el-input placeholder="请输入收件人姓名" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    联系方式
                </div>
                <el-input placeholder="请输入联系方式" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    公司
                </div>
                <el-input placeholder="请输入公司名称" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    固定电话
                </div>
                <el-input placeholder="请输入固定电话" />
            </el-col>
        </el-row>
        <el-row :gutter="20" class="demo-autocomplete text-center">
            <el-col :span="10">
                <div class="sub-title">
                    所在地区
                </div>
                <el-input placeholder="请选择所在省市区" />
            </el-col>
            <el-col :span="10">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    详细地址
                </div>
                <el-input placeholder="请输入详细地址" />
            </el-col>
        </el-row>
    </div>
    <div id="insert">
        <el-avatar class="avatarSend"> 寄 </el-avatar>
        <span class="title">寄件人</span>
        <el-row :gutter="20" class="demo-autocomplete">
            <el-col :span="5">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    姓名
                </div>
                <el-input placeholder="请输入收件人姓名" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    联系方式
                </div>
                <el-input placeholder="请输入联系方式" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    公司
                </div>
                <el-input placeholder="请输入公司名称" />
            </el-col>
            <el-col :span="5">
                <div class="sub-title">
                    固定电话
                </div>
                <el-input placeholder="请输入固定电话" />
            </el-col>
        </el-row>
        <el-row :gutter="20" class="demo-autocomplete text-center">
            <el-col :span="10">
                <div class="sub-title">
                    所在地区
                </div>
                <el-input placeholder="请选择所在省市区" />
            </el-col>
            <el-col :span="10">
                <div class="sub-title">
                    <span class="redstar">*</span>
                    详细地址
                </div>
                <el-input placeholder="请输入详细地址" />
            </el-col>
        </el-row>
        <el-button>寄出</el-button>
    </div>
</template>
<script>

export default {
    name: 'InsertNew',
}
</script>
<style scoped>
#insert {
    margin: 0 20px;
    margin-top: 60px;
}

.el-col {
    margin: 8px 0;
}

.avatarRecv {
    background-color: rgb(123 4 152);
    margin-right: 20px;
}

.el-row {
    margin-left: 50px !important;
}

.avatarSend {
    background-color: rgb(3, 172, 101);
    margin-right: 20px;
}

.title {
    font-size: 18px;
}

.sub-title {
    margin: 5px 0;
}

.redstar {
    color: red;
}


</style>