<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-header id="header">
        <p id="logo">闪电快递</p>
        <el-button text @click="centerDialogVisible = true" v-if="!iflogin">
          登录
        </el-button>
        <span class="headimg" v-else><img src="./assets/man.png">{{ username }}</span>
      </el-header>

      <el-container class="main">
        <el-main>
          <router-view :changeIflogin="changeIflogin"></router-view>
        </el-main>

      </el-container>
      <el-footer>

        <el-menu class="bottom-menu" mode="horizontal" background-color="#FFFFFF"
          :collapse-transition="false" :default-active="$route.path" :router="true" id="menu-top">
          <router-link to="/insert">
            <el-menu-item index="/insert">
              寄快递
            </el-menu-item>
          </router-link>
          <router-link to="/list">
            <el-menu-item index="/list">快递</el-menu-item>
          </router-link>
          <router-link to="/account">
            <el-menu-item index="/account">账户</el-menu-item>
          </router-link>
        </el-menu>

      </el-footer>
    </el-container>

    <el-dialog v-model="centerDialogVisible" width="400px" align-center>
      <p class="login-title">登录</p>
      <el-input class="login-ipt" v-model="phone" clearable="true" placeholder="手机号" />
      <el-input class="login-ipt" v-model="password" type="password" clearable="true" placeholder="密码" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerRegisterVisible = true">前往注册</el-button>
          <el-button type="primary" @click="login">
            登录
          </el-button>
        </span>
      </template>
    </el-dialog>


    <el-dialog v-model="centerRegisterVisible" width="400px" align-center>
      <p class="login-title">注册</p>
      <el-input class="login-ipt" v-model="registerMes.phone" clearable="true" placeholder="手机号" />
      <el-input class="login-ipt" v-model="registerMes.username" clearable="true" placeholder="账户名" />
      <el-input class="login-ipt" v-model="registerMes.password" type="password" clearable="true" placeholder="密码" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="register">用户注册</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      activate: 0,
      activateSub: 0,
      centerDialogVisible: false,
      phone: '',
      password: '',
      iflogin: false,
      username: '',
      centerRegisterVisible: false,
      registerMes: {
        phone: '',
        password: '',
        username: ''
      },
    }
  },
  mounted() {
    axios.defaults.baseURL = 'http://10.133.0.36:8080/';
    //axios.defaults.baseURL = 'http://127.0.0.1:8080/';
  },
  methods: {
    changeIflogin(val) {
      this.iflogin = val;
    },
    login() {
      const data = {
        phone: this.phone,
        password: this.password
      }
      axios.post('/user/login', data).then(res => {
        res = res.data;
        if (res.state == 200) {
          alert("登录成功！");
          localStorage.cookie = res.cookie;
          localStorage.username = res.username
          this.iflogin = true;
          this.username = res.username;
          this.centerDialogVisible = false;
          window.location.reload()
        } else {
          alert("登录失败")
        }
      })
    },
    register() {
      const data = {
        username: this.registerMes.username,
        password: this.registerMes.password,
        phone: this.registerMes.phone,
        type: "1",
        net_point_id: "-1"
      }
      axios.post('/user/register', data).then(res => {
        res = res.data;
        if (res.state == 200) {
          alert("注册成功！");
          this.centerRegisterVisible = false;
        }
      })
    },
  },
  created() {
    if (localStorage.cookie != 'null' && localStorage.cookie) {
      this.iflogin = true;
      this.username = localStorage.username;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.common-layout {
  height: 100%;
}
.main{
  overflow: scroll;
}
#logo {
  display: inline-block;
  width: 200px;
  font-size: 20px;
  display: flex;
  align-items: center;
}

#menu-top {
  flex: 1;
  background-color: #ffffff;
}

#header {
  display: flex;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px rgb(233, 233, 233) solid;
}

.el-menu-item.is-active {
  background-color: #ffffff !important;
}


.bottom-menu{
  display: flex;
  justify-content: space-around;
}

a {
  text-decoration: none;
}

.login-title {
  font-size: 20px;
  text-align: center;
}

.login-ipt {
  margin-top: 20px;
}
.headimg {
  display: flex;
  align-items: center;
  font-weight: bolder;
}
.headimg img{
  width: 30px;
}
</style>
