import logger from "../utils/libs/logger";
import wsMgr from "./wsMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TTGameRecord extends cc.Component {
    @property(cc.Label) btnLabel: cc.Label = null;
    @property(cc.Node) btn: cc.Node = null;
    @property(cc.Label) playInfo: cc.Label = null;
    @property(cc.Label) recordInfo: cc.Label = null;

    recordMgr = null;
    file = '';

    start() {
        this.init();

        this.recordMgr = tt.getRecorderManager();

        this.recordMgr.onStart(() => {
            this.setInfo('开始录音');
        });

        this.recordMgr.onStop((res) => {
            this.setInfo('录音停止');
            logger.log('res.tempFilePath = ' + res.tempFilePath);
            this.file = res.tempFilePath;
            
            this.sendVoice();
        });

        this.recordMgr.onError((res) => {
            this.setInfo('录音错误');
            logger.log(res);
        })

    }

    init() {
        wsMgr.init();
        const self = this;
        wsMgr.ws.onmessage = (event) => {
            console.log('= get message =');
            this.setPlayInfo('收到语音数据');
            const data = event.data;

            const fileMgr = tt.getFileSystemManager();
            const dirPath = tt.env.USER_DATA_PATH;
            const fileName = `tmp_${Date.now()}.wav`;
            const filePath = dirPath + '/' + fileName;
            
            
            self.setPlayInfo('开始 保存语音文件');
            fileMgr.writeFile({
                filePath: filePath,
                data: data,
                encoding: 'binary',
                success(res) {
                    self.setPlayInfo('成功 保存语音文件');
                    logger.log('success');
                    logger.log(res);
                    self.setPlayInfo('开始 加载语音文件');
                    cc.loader.load(filePath, (err, data) => {
                        if (err) {
                            self.setPlayInfo('失败 加载语音文件');
                            logger.error('loadRes error');
                            logger.error(err);
                            return;
                        }
                        self.setPlayInfo('成功 加载语音文件 => 播放语音');
                        logger.log('loadRes success');
                        logger.log(data);
                        const playId = cc.audioEngine.play(data, false, 1);
                        cc.audioEngine.setFinishCallback(playId, () => {
                            self.setPlayInfo('等待接收语音');

                        });
                    });
                },
                fail(res) {
                    self.setPlayInfo('失败 保存语音文件');
                    logger.error('fail');
                    logger.error(res);
                }
            });
        }
    }

    onEnable() {
        this.btn.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.btn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onDisable() {
        this.btn.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btn.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.btn.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    setInfo(str) {
        this.recordInfo.string = str;
    }
    setPlayInfo(str) {
        this.playInfo.string = str;
    }
    onTouchStart() {
        logger.log('onTouchStart');


        const param = {
            duration: 30000,//	number	60000	否	录音自动完成时长，单位 ms	1.0.0
            sampleRate: 8000,//	number	8000	否	采样率，有效值可以是 8000, 16000, 44100	1.0.0
            numberOfChannels: 1,//	number	1	否	录音通道数，有效值可以是 1 或 2	1.0.0
            encodeBitRate: 4800,//	number	48000	否	码率	1.0.0
            frameSize: false,//	number		否	帧大小，单位 KB。如果设置了值，那么每当录音内容达到帧大小时会通过onFrameRecorded返回内容。	1.0.0
            format: 'mp3'
        };

        this.setInfo('录音启动中...');


        this.recordMgr.start({ duration: 30000 });


    }
    onTouchMove() {
        // logger.log('onTouchMove');
    }
    onTouchEnd() {
        logger.log('onTouchEnd');
        this.recordMgr.stop()
        this.setInfo('准备停止')
    }
    onTouchCancel() {
        logger.log('onTouchCancel');
        this.recordMgr.stop();
    }

    playVoice() {
        const url = this.file;
        cc.loader.load(url, (err, audioClip) => {
            if (err) {
                logger.error(err);
            }
            logger.warn(audioClip);
            cc.audioEngine.play(audioClip, false, 1);
        });
    }

    upload(filePath) {

        let task = tt.uploadFile({
            url: "someuploadurl",
            filePath: filePath,
            name: "file",
            success(res) {
                if (res.statusCode === 200) {
                    console.log(`uploadFile调用成功 ${res.data}`);
                }
            },
            fail(res) {
                console.log(`uploadFile调用失败`);
            }
        });

        task.onProgressUpdate(res => {
            logger.log('progress = ' + res.progress);
            // this.setData({
            //   progress: res.progress
            // });
        });

    }


    onSaveVoice() {

    }

    sendVoice() {
        const fileMgr = tt.getFileSystemManager();
        const filePath = this.file;
        fileMgr.readFile({
            filePath: filePath,
            encoding: 'binary',
            success(res) {
                logger.log('success');
                // logger.log(res);
                const data = res.data;
                // logger.log('typeof data = ' + typeof data);
                // logger.log('data.toString()' + data.toString());
                wsMgr.send(data);
            },
            fail(res) {
                logger.error('fail');
                logger.error(res)
            }
        });
    }
}
