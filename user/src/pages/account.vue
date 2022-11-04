<template>
    <div id="AccountMes">
        <div class="item">
            <span class="title">账户</span>
            <span>：</span>
            <span>czh</span>
        </div>
        <div class="item">
            <span class="title">昵 称</span>
            <span>：</span>
            <span>czh</span>
        </div>
        <div class="item">
            <span class="title">手机号码</span>
            <span>：</span>
            <span>1233453123</span>
        </div>
        <div class="item">
            <span class="title">绑定邮箱</span>
            <span>：</span>
            <span>1233534659@qq.com</span>
        </div>
        <div class="item">
            <span class="title">公司</span>
            <span>：</span>
            <span></span>
        </div>
        <div class="item">
            <span class="title">固定电话</span>
            <span>：</span>
            <span>1233534659</span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'AccountMes',
    data() {
        return {

        }
    }
}
</script>
<style scoped>
#AccountMes{
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
span{
    font-size: 20px;
}
.item{
    margin-top: 20px;
}
</style>