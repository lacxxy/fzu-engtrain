<template>
  <div class="common-layout">
    <el-container style="height: 100%;">
      <el-header id="header">
        <p id="logo">闪电家政</p>
        <el-button text @click="centerDialogVisible = true" v-if="!iflogin">
          登录
        </el-button>
        <span class="headimg" v-else><img src="./assets/man.png">{{ username }}</span>
      </el-header>

      <el-container class="main">
        <el-aside width="200px">
          <el-menu class="bottom-menu" mode="vertical" background-color="#FFFFFF" :collapse-transition="false"
            :default-active="$route.path" :router="true" id="menu-top">
            <div v-if="ifuser">
              <router-link to="/insert">
                <el-menu-item index="/insert">
                  下单服务
                </el-menu-item>
              </router-link>
              <router-link to="/list">
                <el-menu-item index="/list">列表</el-menu-item>
              </router-link>
            </div>
            <div v-if="ifcompany">
              <router-link to="/serverPush">
                <el-menu-item index="/serverPush">发布服务</el-menu-item>
              </router-link>
              <router-link to="/serverList">
                <el-menu-item index="/serverList">服务列表</el-menu-item>
              </router-link>
              <router-link to="/serverManList">
                <el-menu-item index="/serverManList">家政员列表</el-menu-item>
              </router-link>
              <router-link to="/orderList">
                <el-menu-item index="/orderList">订单列表</el-menu-item>
              </router-link>
            </div>

            <div v-if="ifserverman">
              <router-link to="/manageLog">
                <el-menu-item index="/manageLog">
                  我的订单
                </el-menu-item>
              </router-link>
            </div>

            <div v-if="ifadmin">
              <router-link to="/manageLog">
                <el-menu-item index="/manageLog">
                  公司申请审核
                </el-menu-item>
              </router-link>
              <router-link to="/employeeTable">
                <el-menu-item index="/employeeTable">
                  员工查询
                </el-menu-item>
              </router-link>
              <router-link to="/statistics">
                <el-menu-item index="/statistics">
                  统计数据
                </el-menu-item>
              </router-link>
            </div>

            <router-link to="/chat" v-if="!ifadmin">
              <el-menu-item index="/chat">聊天</el-menu-item>
            </router-link>
            <router-link to="/account">
              <el-menu-item index="/account">账户</el-menu-item>
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
      <el-select class="login-ipt" v-model="type" placeholder="注册类型" size="middle" @change="handelType">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input class="login-ipt" v-model="registerMes.phone" clearable="true" placeholder="手机号" />
      <el-input class="login-ipt" v-model="registerMes.username" clearable="true" placeholder="账户名" />
      <el-input class="login-ipt" v-model="registerMes.password" type="password" clearable="true" placeholder="密码" />

      <el-select class="login-ipt" v-if="registerMes.type == 3" collapse-tags v-model="good_type" multiple
        placeholder="擅长领域" @change="handelGood">
        <el-option v-for="item in serveType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-input v-if="registerMes.type == 3" class="login-ipt" v-model="registerMes.desc" clearable="true"
        placeholder="自我描述" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="register">注册</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
import common from '../common'

export default {
  name: 'App',
  components: {

  },
  computed: {
    ifcompany() {
      return Cookies.get('type') == 2
    },
    ifuser() {
      return Cookies.get('type') == 1
    },
    ifserverman() {
      return Cookies.get('type') == 3
    },
    ifadmin() {
      return Cookies.get('type') == 0
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
      good_type: null,
      phone_number: null,
      options: [
        {
          value: '1',
          label: '用户',
        },
        {
          value: '2',
          label: '家政公司',
        },
        {
          value: '3',
          label: '家政员',
        },
      ],
      serveType: [

      ],
      centerRegisterVisible: false,
      type: '用户',
      registerMes: {
        phone: '',
        password: '',
        username: '',
        type: 1,
        field: [],// 仅用于家政员
        desc: ""// 仅用于家政员
      },
    }
  },

  mounted() {
    axios.defaults.baseURL = common.baseUrl;
    if (Cookies.get('cookie')) {
      this.$store.commit('initWebSocket', `ws://10.133.52.143:9090/webSocket/${Cookies.get('phone_number')}`)
    }
    const that = this;
    axios.get('/service/getAllClass').then(res => {
      res = res.data;
      for (let index in res) {
        that.serveType.push(
          {
            label: res[index],
            value: index
          }
        )
      }
    })
  },

  methods: {
    initWebSocket() {
      var ws_on_line = `ws://10.133.52.143:9090/webSocket/${Cookies.get('phone_number')}`
      console.log('111111111111', ws_on_line)
      // var ws_scheme = window.location.protocol==="https:"?"wss":"ws"      
      this.websock = new WebSocket(ws_on_line);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      // this.websock.onclose = this.websocketclose;   
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据     
      console.log("建立连接");
      var actions = { message: "连接测试" };
      this.sendMessage(actions);
    },

    websocketonerror(e) {
      //连接建立失败重连      
      console.log("连接error", e);
      // this.initWebSocket();
    },

    websocketonmessage(e) {
      //数据接收      
      this.websocket_data = JSON.parse(e.data);
      console.log("websocket-res", JSON.stringify(this.websocket_data))
      console.log("接收后端数据type", typeof (this.websocket_data))
      // 将websocket消息展示在消息提示框     
      var h = this.$createElement;
      // 创建html元素      
      this.hrender = h("p", null, [
        h(
          "div", [
          h("div",
            JSON.stringify(this.websocket_data.message)),
          // 传变量           
          //   },         
          // }),           
        ],
          null
        ),
      ]);

    },
    sendMessage(Data) {
      //数据发送     
      this.websock.send(JSON.stringify(Data));
    },
    websocketclose(e) {  //关闭      
      console.log('断开连接', e);
    },
    closeConn() {
      //socket.close(); // 向服务端发送断开连接的请求
    },

    changeIflogin(val) {
      this.iflogin = val;
    },
    handelType(val) {
      this.registerMes.type = val;
      this.registerMes.field = [];
      this.good_type = []
      this.registerMes.desc = ''
    },
    handelGood(val) {
      this.registerMes.field = val;
    },
    login() {
      const data = {
        phone_number: this.phone,
        password: this.password
      }
      axios.post('/common/login', data).then(res => {
        res = res.data;
        if (res.state == 200) {
          alert("登录成功！");

          if (Cookies.get("cookie")) {
            Cookies.remove("cookie")
            Cookies.remove("user_name")
            Cookies.remove("user_id");
            Cookies.remove("type");
            Cookies.remove("phone_number")
          }

          Cookies.set("cookie", res.cookie);
          Cookies.set("user_name", res.user_name);
          Cookies.set("user_id", res.user_id);
          Cookies.set("type", res.type);
          Cookies.set("phone_number", res.phone_number)
          this.iflogin = true;
          this.username = res.user_name;
          this.centerDialogVisible = false;
          window.location.reload()
        } else {
          alert("登录失败");
        }
      })
    },
    register() {
      const data = {
        user_name: this.registerMes.username,
        password: this.registerMes.password,
        phone_number: this.registerMes.phone,
        type: this.registerMes.type,
        field: this.registerMes.field,
        desc: this.registerMes.desc,
      }
      axios.post('/common/register', data).then(res => {
        res = res.data;
        if (res.state == 200) {
          alert(res.msg);
          this.centerRegisterVisible = false;
        }
      })
    },
  },
  created() {

    if (Cookies.get('cookie')) {
      this.iflogin = true;
      this.username = Cookies.get('user_name');
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

.main {
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

.bottom-menu {
  height: 100%;
}

.el-menu-item.is-active {
  background-color: #ffffff !important;
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

.headimg img {
  width: 30px;
}
</style>
