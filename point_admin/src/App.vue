<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-header id="header">
        <p id="logo">快递管家</p>
        <el-button text @click="centerDialogVisible = true" v-if="!iflogin">
          登录
        </el-button>
        <span v-else>{{ username }}</span>
      </el-header>
      <el-container>
        <el-aside id="side">
          <el-menu id="menu-top" :default-active="$route.path" :router="true">
            <router-link to="/list">
              <el-menu-item index="/list">快递处理</el-menu-item>
            </router-link>
            <router-link to="/postManager">
              <el-menu-item index="/postManager">快递员管理</el-menu-item>
            </router-link>
            <router-link to="/account">
              <el-menu-item index="/account">我的账户</el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view :changeIflogin="changeIflogin"></router-view>
        </el-main>

      </el-container>
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
      <el-input class="login-ipt" v-model="registerMes.name" clearable="true" placeholder="网点名称" />
      <el-input class="login-ipt" v-model="address" clearable="true" placeholder="详细地址" />
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
  mounted() {
    axios.defaults.baseURL = 'http://127.0.0.1:8080/';
    axios.interceptors.request.use(function (config) {
      //let url = config.url.split('/').at(-1);
      return config;
    }, function (err) {
      //请求错误之前可以进行处理
      return Promise.reject(err)
    });
  },
  created() {
    if (localStorage.cookie_point!='null') {
      this.iflogin = true;
      this.username = localStorage.username_point;
    }else{
      this.iflogin = false;
    }
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
      selectedOptions: [],
      address: '',
      registerMes: {
        phone: '',
        password: '',
        username: '',
        name: '',
      },
    }
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
          localStorage.cookie_point = res.cookie;
          localStorage.username_point = res.username
          this.iflogin = true;
          this.username = res.username;
          this.centerDialogVisible = false;
          window.location.reload()
        }else{
          alert(res.msg)
        }
      })
    },
    register() {
      const data = {
        username: this.registerMes.username,
        password: this.registerMes.password,
        phone: this.registerMes.phone,
        name: this.registerMes.name,
        address: this.address,
        type: "3",
      }
      console.log(data);
      axios.post('/user/register', data).then(res => {
        res = res.data;
        if (res.state == 200) {
          alert("注册成功！");
          this.centerRegisterVisible = false;
        }
      })
    },
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

#logo {
  display: inline-block;
  width: 15%;
  font-size: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}

#menu-top {
  flex: 1;
  background-color: #dedede;
}

#header {
  display: flex;
  background-color: #dedede;
  justify-content: space-between;
  align-items: center;
}

.el-menu-item.is-active {
  background-color: #dedede !important;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: #409eff !important;
  background: #dedede !important;
}

#side {
  background-color: #dedede !important;
}

.el-menu {
  background-color: #dedede !important;
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
</style>
