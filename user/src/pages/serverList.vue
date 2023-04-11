<template>
    <div id="ServerList">
        <div>
            <el-card class="box-card" v-for="item, i in tableData" :key="i">
                <template #header>
                    <div class="card-header">
                        <span>{{ item.service_name }}服务</span>
                        <span class="server_status">服务状态：{{ item.service_status == 0 ? '下线' : '上线' }}</span>
                    </div>
                </template>

                <div class="process_area">
                    {{ item.service_process }}
                </div>
                <div class="btn-area">
                    <el-button @click="showDetail(item)">
                        查看详情
                    </el-button>
                    <el-button @click="onlineService(item.service_id)" type=success v-if="item.service_status == 0">
                        上线服务
                    </el-button>
                    <el-button @click="offlineService(item.service_id)" type=danger v-else>
                        下线服务
                    </el-button>
                </div>
            </el-card>

            <el-dialog v-model="centerDialogVisible" width="500px" align-center>
                <div id="ServerPush">
                    <el-form label-width="150px">
                        <el-select v-model="detail.type_name" placeholder="请选择服务类别" size="middle" @change="handelType">
                            <el-option v-for="item in server_table" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>

                        <p class="insert-title">服务名称：</p>
                        <div class="row">
                            <el-input size="middle" v-model="detail.service_name" placeholder="请输入服务的名称"></el-input>
                        </div>

                        <p class="insert-title">服务封面：</p>
                        <div class="row">
                            <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
                                :on-change="uploadFile">
                                <img v-if="detail.service_img" :src="detail.service_img" class="avatar" />
                                <span v-else class="avatar-uploader-icon">
                                    +
                                </span>
                            </el-upload>
                        </div>

                        <p class="insert-title">服务流程描述：</p>
                        <div class="row">
                            <el-input v-model="detail.service_process" type="textarea" placeholder="服务流程描述..."></el-input>
                        </div>

                        <el-button style="margin-top:16px" @click="submitOrder">提交</el-button>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie'
import commmon from '../../common.js'
export default {
    name: 'ServerList',
    data() {
        return {
            tableData: [
                {
                    "service_id": 4,
                    "service_img": "/img/家庭搬家.jpg",
                    "service_name": "家庭搬家",
                    "service_process": "1.专业的客服人员为您的搬家服务估价\n2.由专业的搬家顾问为您上门测量记录所需要打包收纳和搬运的物品尺寸，以便在搬家时给您带来合适尺寸的收纳和打包工具\n3.在搬家顾问给您测量需要搬迁打包的物品后为您参考合适的搬家套餐\n4.熊猫搬团队为您的物品进行专业的打包和收纳\n5.专业的搬家工人为您的物品进行运输搬迁\n6.熊猫搬会提供专业的保洁服务，给您的新家做一次保洁清洗服务\n7.熊猫搬在为您服务完成后会对您进行满意度电话回访保证我们服务质量的改善",
                    "service_status": 1,
                    "service_type": 9,
                    "user_id": 10
                },
                {
                    "service_id": 5,
                    "service_img": "/img/家具安装.jpg",
                    "service_name": "家具安装",
                    "service_process": "1)从货车上卸下产品后要背负式或肩抗式搬运上楼。\r2)到顾客门口放下后敲门或按门铃。敲门每次敲3下每次敲门或摁门铃的时间间隔1-3分钟。\r4)进入顾客房间时穿戴鞋套，不可不穿戴鞋套就直接进入。建议给安装人员配置鞋套。\r5)进门后询问需要放在哪个房间，确认安装的空间是否合适安装。空间不够时要与顾客协商在客厅安装好后再放进房间。\r8)安装完毕后，征询顾客放置的位置和使用者的身高调节到顾客试用觉得适合的高度并安放好\r9)在安装完毕后，必须清洁产品全部部位",
                    "service_status": 1,
                    "service_type": 9,
                    "user_id": 10
                },
                {
                    "service_id": 6,
                    "service_img": "/img/热水器维修.jpg",
                    "service_name": "热水器维修",
                    "service_process": "热水器维修",
                    "service_status": 1,
                    "service_type": 1,
                    "user_id": 10
                },
                {
                    "service_id": 7,
                    "service_img": "/img/家用电器维修.jpg",
                    "service_name": "家用电器维修",
                    "service_process": "家用空调:空调维修、空调清洗、空调加氟、空调移机、空调拆装、空调漏水维修、空调不制冷 (热) 维修厨卫维修:热水器维修、燃气灶维修、油烟机维修、电热水器维修、锅炉维修、热水器清洗、油烟机清洗、集成灶维修\n壁挂炉:壁挂炉维修、壁挂炉清洗、壁挂炉保养、地暖维修、地暖清洗、进口壁挂炉维修\n洗衣机:洗衣机维修、滚筒洗衣机维修、波轮洗衣机维修、洗衣机清洗、进口洗衣机维修",
                    "service_status": 1,
                    "service_type": 1,
                    "user_id": 10
                },
                {
                    "service_id": 8,
                    "service_img": "/img/防水补漏.jpg",
                    "service_name": "防水补漏",
                    "service_process": "专业从事卫生间防水、屋面防水、楼顶防水、地下室防水防潮、墙面防水、隧道桥梁防水防潮等",
                    "service_status": 1,
                    "service_type": 1,
                    "user_id": 10
                },
                {
                    "service_id": 9,
                    "service_img": "/img/月嫂服务.jpg",
                    "service_name": "月嫂服务",
                    "service_process": "生活护理:指导正确哺乳、喂养、呵护、洗澡、穿衣、\n换洗尿布、物品消毒。\n专业护理:婴儿洗澡、抚触、按摩，体温测量、大小便观察，口腔、黄痘、脐部护理，臀红、尿布疹、发热、腹泻、便秘、啼哭的观察及护理。\n潜能开发:早期智力开发，婴儿被动操，建立良好的生活习惯。",
                    "service_status": 1,
                    "service_type": 3,
                    "user_id": 10
                },
                {
                    "service_id": 10,
                    "service_img": "/img/家庭陪护.jpg",
                    "service_name": "家庭陪护",
                    "service_process": "老人陪护:护理老人个人卫生、健康，按照老人饮食的基础原则，科学合理的进食，保证老人的营养需求。掌握老人起居特点，使老人安全舒适的生活。病人陪护:根据病人良好的习惯，对病人的日常生活进行护理，做好生活照料，按医嘱的要求为病人提供营养丰富的饮食。采取不同的护理知识和技术，减轻病痛尽快帮助病人恢复健康。",
                    "service_status": 1,
                    "service_type": 6,
                    "user_id": 10
                },
                {
                    "service_id": 11,
                    "service_img": "/img/育婴师服务.jpg",
                    "service_name": "育婴师服务",
                    "service_process": "2、为婴儿营造适宜睡眠条件，正确包裹婴儿，正常给婴儿穿脱衣服，更换尿布或纸尿裤，并给予皮肤清洁护理;适时对婴儿进行二便控制训练、三浴锻炼;\n3、负责婴儿居室卫生清洁、环境布局;婴儿被褥;正确进行四具消毒(卧具、餐具、玩具、家具) ;\n4、为婴儿洗澡、抚触、做主、被动操、模仿操、训练婴儿抬头、做、爬、站、走、跑、跳等;",
                    "service_status": 1,
                    "service_type": 3,
                    "user_id": 10
                },
                {
                    "service_id": 12,
                    "service_img": "/img/开荒保洁.jpg",
                    "service_name": "开荒保洁",
                    "service_process": "1、首先将室内残留装修垃圾清除干净。\n2、用吸尘器由上到下全面吸尘。\n3、将玻璃框用抹布擦拭干净，再用专业的玻璃清洗剂均匀涂抹在玻璃上，用刮子从上到下刮干净，最后残留水痕用报纸擦干，因为报纸上面有油墨，可以迅速去除玻璃上污渍。\n4、擦洗卫生间墙壁，尤其是瓷砖缝隙处一定要清洗干净。卫生间内洁具建议用毛巾清洁，水龙头、管等用专门清洁剂清洁，最后用洗地机清洁地面，如果是木板则不能用洗地机。清洁时要注意地面的边角，进行针对性的除污，所以清理完后用干毛巾把水龙头等管件擦拭遍。",
                    "service_status": 1,
                    "service_type": 0,
                    "user_id": 10
                },
                {
                    "service_id": 13,
                    "service_img": "/img/油烟机清洗.jpg",
                    "service_name": "油烟机清洗",
                    "service_process": "抽油烟机表面清洗\n用百洁布将水溶液涂于物体表面(先清洁厨房内油污较少器物、柜、墙瓷砖等表面;最后灶台附近、油烟机。\n2、抽油烟机扇叶清洗\n将专用清洁剂喷在扇叶上，静置3分钟;\n将一锅水煮至沸腾，并使水蒸气对准抽油烟口，接着打开抽油烟机，利用离心力原理，使残存在扇叶上的油污随着流入集油杯中;\n关掉开关，拿干净抹布擦拭，扇叶立即清洁溜溜",
                    "service_status": 1,
                    "service_type": 0,
                    "user_id": 10
                },
                {
                    "service_id": 14,
                    "service_img": "/img/空调清洗.jpg",
                    "service_name": "空调清洗",
                    "service_process": "清洗步骤\n1首先拆卸导风板、过滤网;拆卸中框螺钉取下外壳,移开遥控器信号接收板;移开温度传感器，拆掉导风叶Ko\n2套上空调防水罩，喷洒空调清洗剂清洗铝翅片;3喷洒塑壳清洗剂清洗风轮，刷洗空调风轮;\n4刷洗空调铝翅片,冲洗空调风轮，清洗空调排水槽。",
                    "service_status": 1,
                    "service_type": 0,
                    "user_id": 10
                },
                {
                    "service_id": 15,
                    "service_img": "/img/1680622032383logo.jpg",
                    "service_name": "打扫卫生3",
                    "service_process": "打扫卫生,打扫卫生",
                    "service_status": 1,
                    "service_type": 0,
                    "user_id": 10
                }
            ],
            url: '',
            centerDialogVisible: false,
            server_table: [],
            formData: null,
            detail: {
                type_name: '',
                service_name: '',
                service_img: '',
                service_process: '',
                service_type: null,
                service_id: null
            }
        }
    },
    created() {
        this.getServer()
        this.server_table = commmon.serverList
        this.url = commmon.baseUrl
    },
    methods: {
        showDetail(d) {
            this.detail = d;
            this.detail.type_name = commmon.serverList[d.service_type]
            this.detail.service_img = commmon.baseUrl + d.service_img
            this.centerDialogVisible = true
        },
        onlineService(id) {
            axios.post('/company/onlineService', {
                service_id: id
            }).then(res => {
                res = res.data;
                alert(res.msg);
                window.location.reload();
            })
        },
        offlineService(id) {
            axios.post('/company/offlineService', {
                service_id: id
            }).then(res => {
                res = res.data
                alert(res.msg);
                window.location.reload();
            })
        },
        getServer() {
            axios.post('/company/getMyService', {
                user_id: Cookies.get('user_id')
            }).then(res => {
                res = res.data;
                this.tableData = res;
            })
        },
        handelType(val) {
            this.detail.service_type = val;
        },
        uploadFile(item) {
            this.formData = item.raw; // 图片文件
            this.detail.service_img = URL.createObjectURL(item.raw); // 图片上传浏览器回显地址
            console.log(this.imageUrl, "imageUrl")
            console.log(this.formData, "formData")
        },
        submitOrder() {
            var formData = new FormData();
            formData.append("service_id", this.detail.service_id);
            if (this.formData != null) {
                formData.append("service_img", this.formData);  // 照片文件
            }
            formData.append("service_name", this.detail.service_name); // 其他参数
            formData.append("service_process", this.detail.service_process); // 其他参数
            formData.append("service_status", 0); // 其他参数
            formData.append("service_type", this.detail.service_type); // 其他参数
            // if (formData.get('service_img') == null) {
            //     alert("不能为空")
            //     return;
            // }
            axios.post('/company/editService', formData).then(res => {
                res = res.data;
                alert(res.msg)
                window.location.reload()
            })
        }
    }
}
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
}

.server_status {
    font-size: 12px;
}

.box-card {
    margin: 10px 0;
    background-color: rgb(205 230 247 / 20%);
}

.process_area {
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.btn-area {
    margin-top: 10px;
}

.avatar {
    width: 80px;
    height: 80px;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>