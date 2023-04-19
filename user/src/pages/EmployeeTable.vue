<template>
    <div>
        <!-- <Breadcrumb :name="name" /> -->
        <el-card>
            <!-- 搜索栏 -->
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-input placeholder="请输员工ID" v-model="userID">

                        <template #append>
                            <el-button @click="getInfo">查询</el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 表格区 -->
            <el-table :data="Info" stripe>
                <el-table-column prop="user_id" label="员工ID"></el-table-column>
                <el-table-column prop="company_id" label="隶属公司ID"></el-table-column>
                <el-table-column prop="user_name" label="名字"></el-table-column>
                <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                <el-table-column prop="desc" label="个人描述"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
// import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
export default {
    data() {
        return {
            name: "员工查询",
            userID: "",
            Info: []
        };
    },
    // components: {
    //     Breadcrumb,
    // },
    methods: {
        //获取快递员表 发请求
        getInfo() {
            var sendData = {
                "user_id": this.userID
            };
            axios.post("/common/getInfo", JSON.stringify(sendData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((response) => {

                    this.Info = [response.data];
                    console.log(this.Info)
                })
        },
    },
};
</script>
  
<style></style>