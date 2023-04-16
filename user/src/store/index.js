import { createStore } from 'vuex'
// 类似 Redux 中的建立状态树

export default createStore({

    // 1、 存储所有全局数据
    state: {
        num: 1,
        websock: null,
        message: [],
        chatlist: []
    },

    // 2、 需要通过计算获取state里的内容获取的数据
    // 只能读取不可修改
    getters: {

    },

    //  3、定义对state的各种操作
    // why不直接实现在mutation里需要写到action里?
    // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
    // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
    mutations: {
        increment(state) {
            state.num++
        },
        initWebSocket(state, url) {
            let ws_on_line = url
            console.log('111111111111', ws_on_line)
            // var ws_scheme = window.location.protocol==="https:"?"wss":"ws"      
            state.websock = new WebSocket(ws_on_line);
            // state.websock.onopen = this.websocketonopen;
            state.websock.onmessage = (e) => {
                //数据接收
                let websocket_data = JSON.parse(e.data);
                websocket_data.time = new Date()
                let phone = websocket_data.from
                let flag = 0
                console.log("websocket-res", JSON.stringify(websocket_data))
                console.log("接收后端数据type", typeof (websocket_data))
                for (let i in state.chatlist) {
                    if (state.chatlist[i].user.phone_number == phone) {
                        state.chatlist.unshift(state.chatlist.splice(i, 1)[0]);
                        state.chatlist[0].message.push(websocket_data)
                        flag = 1
                        break
                    }
                }
                if (flag == 0) {
                    let newData = {
                        user: {
                            phone_number: phone,
                            user_name: websocket_data.from_name
                        },
                        message: [websocket_data]
                    }
                    state.chatlist.unshift(newData)
                }
                console.log(111)
                // state.message.push(websocket_data)
            }

        },
        sendMessage(state, Data) {
            //数据发送     
            let d = Data
            d.time = new Date();
            let phone = Data.to;
            for (let i in state.chatlist) {
                if (state.chatlist[i].user.phone_number == phone) {
                    state.chatlist.unshift(state.chatlist.splice(i, 1)[0]);
                    state.chatlist[0].message.push(d)
                    break
                }
            }
            state.websock.send(JSON.stringify(Data));
        },
        newChat(state, d) {
            d.message = []
            for (let i in state.chatlist) {
                if (state.chatlist[i].user.phone_number == d.user.phone_number) {
                    state.chatlist.unshift(state.chatlist.splice(i, 1)[0]);
                    return;
                }
            }
            state.chatlist.unshift(d)
            console.log(state.chatlist)
        }
    },

    // 3、定义对state的各种操作
    // actions无法直接修改state，需要在mutations里更新
    // mutation不支持异步，所以需要在action里写api到url
    actions: {
        // 比说action定义了更新state的操作
        // 但是不可对其直接修改
        // 所有的修改操作必须放到mutations里
    },

    // state中信息过长时
    // 用来将state进行分割
    // 如下，将state树分割出一个user state。

})

