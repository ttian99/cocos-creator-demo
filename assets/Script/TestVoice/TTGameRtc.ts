import rtcMgr from "./rtcMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TTGameRtc extends cc.Component {


    start() {
        this.init();
    }

    init() {
        rtcMgr.authorize(() => {
            rtcMgr.init();

            // 3. 监听需要的事件
            rtcMgr.on("joinChannelSuccess", () => { })
            rtcMgr.on("connectionLost", () => { })
            rtcMgr.on("warning", () => { })
            rtcMgr.on("error", () => { })
            // 4. 获取频道（对接开发者服务获取）
            let channelId = 'channelIdtest';
            // 5. 广播连麦 channelId，所有用户加入频道
            rtcMgr.joinChannel(channelId, 'user1');
            // 6. 开启本地推流
            rtcMgr.enableLocalAudio();
        });
    }

}
