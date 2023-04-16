<template>
    <div id="ChatPage">
        <div id="phone" class="panel">
            <!-- <div id="panel-heading">
                <p>对方手机号</p>
            </div>
            <div id="panel-body">
                <el-input class="ipt" v-model="phone" clearable="true" placeholder="手机号" />
            </div> -->
            <div v-for="item in $store.state.chatlist" :key="item" class="list_item"
                :class="getclassName1(item.user.phone_number)" @click="selectChat(item.user.phone_number)">
                <el-avatar :size="40" :src=imgUrl></el-avatar>
                <span>{{ item.user.user_name }}</span>
            </div>
        </div>
        <div class="panel" id="chat-area">
            <div id="panel-heading"></div>
            <div id="panel-body">
                <div id="log-container">
                    <div v-for="item in chooseItem.message" :key="item" :class="getclassName(item.from)">
                        <label class="text-info">{{ item.from }} {{ getdate(item.time) }}</label>
                        <div class="text-text">{{ item.text }}</div>
                    </div>
                </div>
                <div class="send-area">
                    <el-input class="ipt-mes" v-model="mes" clearable="true" placeholder="输入" />
                    <el-button @click="sendMes">发送</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import imgUrl from '../assets/head.png'
export default {
    name: 'ChatPage',
    data() {
        return {
            phone: '',
            mes: '',
            chooseItem: { message: [], user: { phone_number: null } },
            imgUrl: '',
        }
    },
    created() {
        this.imgUrl = imgUrl;
    },
    computed: {
        getclassName() {
            return function (e) {
                return Cookies.get('phone_number') == e ? 'bg-info' : 'bg-sucess'
            };
        },
        getclassName1() {
            const that = this;
            return function (e) {
                console.log(that.chooseItem)
                return that.chooseItem.user.phone_number == e ? 'selectUser' : ''
            };
        },
        getdate() {
            return function (d) {
                console.log(d)
                var date = d
                var year = date.getFullYear();
                var month = date.getMonth() + 1;    //js从0开始取 
                var date1 = date.getDate();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                var second = date.getSeconds();
                return (year + "-" + month + "-" + date1 + "-" + ' ' + hour + ":" + minutes + ":" + second);
            };
        }
    },
    methods: {
        sendMes() {
            const that = this;
            if (this.chooseItem.user.phone_number == null || this.mes == "") {
                alert("无法为空")
                return
            }
            this.$store.commit('sendMessage', {
                from: Cookies.get('phone_number'),
                from_name: Cookies.get('user_name'),
                to: that.chooseItem.user.phone_number,
                to_name: that.chooseItem.user.user_name,
                text: that.mes,
            });
            that.mes = ""
        },
        selectChat(phone) {
            let arr = this.$store.state.chatlist;
            for (let item of arr) {
                if (item.user.phone_number == phone) {
                    this.chooseItem = item
                    break
                }
            }
            console.log(this.chooseItem)
        }
    }
}
</script>

<style>
#ChatPage {
    display: flex;
    height: 100%;
}

.list_item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.list_item span {
    margin-left: 10px;
}

.list_item:hover {
    cursor: pointer;
    background: #e3e3e3;
}

.selectUser {
    background: #cfcece;
}

#phone {
    width: 25%;
    margin-right: 10px;
    overflow-y: scroll;
}

.panel {
    border: 1px #337ab7 solid;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

#panel-heading {
    background-color: #337ab7;
    border-color: #337ab7;
    padding: 10px 15px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: white;
}

#chat-area {
    flex: 1;
}

.ipt {
    width: 90%;
}

#panel-body {
    height: 70%;
    text-align: center;
    margin: 10px 0;
}

#log-container {
    height: 80%;
    overflow-y: scroll;
    min-height: 20px;
    padding: 19px;
    margin: 20px;
    margin-bottom: 0;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
}

.send-area {
    text-align: left;
    padding: 19px;
}

.ipt-mes {
    margin-bottom: 10px;
}

.bg-info {
    background-color: #d9edf7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
    color: #a94442;
}

.bg-sucess {
    background-color: #dff0d8;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #31708f;
}

.text-info {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    margin-left: 0;
}

.text-text {
    color: #31708f;
}
</style>