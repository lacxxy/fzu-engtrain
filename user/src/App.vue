<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-header id="header">
        <p id="logo">快递管家</p>
        <el-menu id="menu-top" default-active="0" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">打单发货</el-menu-item>
          <el-menu-item index="1">物流跟踪</el-menu-item>
          <el-menu-item index="2">我的账户</el-menu-item>
        </el-menu>
        <el-button text @click="centerDialogVisible = true">
          登录
        </el-button>
      </el-header>
      <el-container>
        <el-aside id="side">
          <el-col>
            <el-menu :default-active="activateSub">
              <el-menu-item v-for="(item, i) in navigator[activate]" :key="i" :index="i" @click="routerGo(item.router)">
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
    <el-dialog v-model="centerDialogVisible" width="400px" align-center>
      <p class="login-title">登录</p>
      <el-input class="login-ipt" v-model="phone" clearable="true" placeholder="手机号" />
      <el-input class="login-ipt" v-model="password" type="password" clearable="true" placeholder="密码" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="login">
            登录
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  components: {

  },
  watch: {
    activate: function () {
      let path = this.navigator[this.activate][0].router;
      this.routerGo(path);
    }
  },
  data() {
    return {
      activate: 0,
      activateSub: 0,
      centerDialogVisible: false,
      phone: '',
      password: '',
      navigator: [[
        {
          name: '单个录入',
          router: '/insert',
          index: 0
        },
        {
          name: '批量录入',
          router: '/main',
          index: 1
        },
      ], [
        {
          name: '订单列表',
          router: '/list',
          index: 0
        },
      ],
      [
        {
          name: '账户信息',
          router: '/account',
          index: 0
        },
        {
          name: '地址簿管理',
          router: '/lists',
          index: 1
        },
      ]]
    }
  },
  methods: {
    handleSelect(key) {
      this.activate = key
    },
    login() {
      alert(1)
    }
  },
  setup() {
    const router = useRouter()
    function routerGo(path) {
      router.push({
        path: path
      })
    }
    return {
      routerGo
    }
  }
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

.login-title {
  font-size: 20px;
  text-align: center;
}

.login-ipt {
  margin-top: 20px;
}
</style>
