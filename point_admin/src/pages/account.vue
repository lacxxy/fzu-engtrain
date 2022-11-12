<template>
    <div id="AccountMes">
        <div class="item">
            <span class="title">昵 称</span>
            <span>：</span>
            <span>{{ username }}</span>
        </div>
        <div class="item">
            <span class="title">手机号码</span>
            <span>：</span>
            <span>{{ phone }}</span>
        </div>
        <div class="item">
            <span class="title">邮箱</span>
            <span>：</span>
            <span>{{ email }}</span>
        </div>
        <div class="item">
            <span class="title">公司</span>
            <span>：</span>
            <span>{{ company }}</span>
        </div>
        <div class="item">
            <span class="title">固定电话</span>
            <span>：</span>
            <span>{{ staticPhone }}</span>
        </div>
        <div class="item">
            <span class="title">
                <el-button type="danger" @click="exit">退出登录</el-button>
            </span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'AccountMes',
    data() {
        return {
            username: 'czh',
            phone: '3112312311',
            email: '1233534659@qq.com',
            company: '福州大学',
            staticPhone: '18897852',
            netpoint: ''
        }
    },
    props: {
        changeIflogin: Function
    },
    methods: {
        exit() {
            localStorage.cookie = null;
            this.changeIflogin(false);
            window.location.reload()
        }
    }
}
</script>
<style scoped>
#AccountMes {
    margin-left: 40px;
}

.title {
    font-size: 20px;
    display: inline-block;
    width: 100px;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
}

span {
    font-size: 20px;
}

.item {
    margin-top: 20px;
    display: flex;
    align-items: center;
}
</style>