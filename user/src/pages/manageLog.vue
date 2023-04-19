<template>
  <div>
    <!-- <Breadcrumb :name="name" /> -->
    <el-card>

      <el-table :data="users" style="width: 100%" stripe>
        <el-table-column label="公司名" prop="user_name" width=100></el-table-column>
        <el-table-column label="公司联系电话" prop="phone_number"></el-table-column>
        <el-table-column label="公司地址" prop="company_address"></el-table-column>

        <el-table-column label="申请理由"></el-table-column>
        <el-table-column label="注册状态" prop="register_status">
          <template #default="scope">
            <el-tag v-if="scope.row.register_status === 0" type="info">审核中</el-tag>
            <el-tag v-else-if="scope.row.register_status === 1" type="success">审核通过</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="small" @click="approveUser(scope.row.phone_number)"
              :disabled="scope.row.register_status === 1">审核通过</el-button>
            <el-button type="danger" size="small" @click="rejectUser(scope.row.phone_number)"
              :disabled="scope.row.register_status === 1">审核不通过</el-button>
          </template>
        </el-table-column>
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
      name: "公司申请审核",
      users: [],
    };
  },
  // components: {
  //   Breadcrumb,
  // },
  methods: {
    getUserList() {
      axios
        .get("/root/getRegister")
        .then((response) => {
          console.log(response)
          this.users = response.data;
        });
    },
    approveUser(phonenumber) {
      var sendData = {
        "phone_number": phonenumber
      };


      // 发送审核通过请求，
      axios
        .post("/root/approveRegister", JSON.stringify(sendData), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          if (response.data.state == 200) {
            this.getUserList();
            return this.$message.success("操作成功");

          }


        });
    },
    rejectUser() {
      // 发送审核不通过请求，并更新用户列表
      // ...
    },
  },
  created() {
    this.users.forEach(user => {
      user.company_address = this.getRandomAddress();
    });
    this.getUserList();
  },
};
</script>