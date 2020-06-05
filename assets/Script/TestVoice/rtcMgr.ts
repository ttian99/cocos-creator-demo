import logger from "../utils/libs/logger";

class RtcMgr {

    re = null;
    init() {
        this.re = tt.getRtcEngine();
        const isSupport = this.isSupported();
        console.log('当前设备是否支持 rtc 连麦的使用: ' + isSupport);
    }
    /** 当前设备是否支持 rtc 连麦的使用 */
    isSupported() {
        return this.re.isSupported();
    }
    /** 销毁 RtcEngine 实例，释放所有资源 */
    destory() {
        this.re.destory();
    }
    /** 
     * 加入到通信房间中
     * errCode错误码
     * - 101	资源被释放了，需要重新获取实例
     * - 102	api 调用失败
     * - 103	参数错误 
     */
    joinChannel(channelId, uid) {
        this.re.joinChannel({
            channelId: channelId,
            uid: uid,
            success(res) {
                logger.log('joinChannel sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('joinChannel fail');
                logger.error(res);
            },
        })
    }
    /** 离开当前频道 */
    leaveChannel() {
        this.re.leaveChannel({
            success(res) {
                logger.log('leaveChannel sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('leaveChannel fail');
                logger.error(res);
            },
        })
    }
    /** 获取当前推流状态 */
    getLocalAudioStatus() {
        return this.re.getLocalAudioStatus();
    }
    /** 开启本地麦克风推流，需要开启白名单 */
    enableLocalAudio() {
        this.re.enableLocalAudio({
            success(res) {
                logger.log('enableLocalAudio sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('enableLocalAudio fail');
                logger.error(res);
            },
        })
    }
    /** 关闭本地麦克风推流 */
    disableLocalAudio() {
        this.re.disableLocalAudio({
            success(res) {
                logger.log('disableLocalAudio sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('disableLocalAudio fail');
                logger.error(res);
            },
        })
    }
    /**针对当前设备，静音远端用户音频流 */
    muteRemoteAudioStream(uid) {
        this.re.muteRemoteAudioStream({
            uid: uid,
            success(res) {
                logger.log('muteRemoteAudioStream sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('muteRemoteAudioStream fail');
                logger.error(res);
            },
        })
    }
    /**针对当前设备，取消静音远端用户音频流 */
    unmuteRemoteAudioStream(uid) {
        this.re.unmuteRemoteAudioStream({
            uid: uid,
            success(res) {
                logger.log('unmuteRemoteAudioStream sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('unmuteRemoteAudioStream fail');
                logger.error(res);
            },
        })
    }
    /** 针对当前设备，静音所有远端用户音频流 */
    muteAllRemoteAudioStream() {
        this.re.muteAllRemoteAudioStream({
            success(res) {
                logger.log('muteAllRemoteAudioStream sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('muteAllRemoteAudioStream fail');
                logger.error(res);
            },
        })
    }
    /** 针对当前设备，取消静音所有远端用户音频流 */
    unmuteAllRemoteAudioStream() {
        this.re.unmuteAllRemoteAudioStream({
            success(res) {
                logger.log('unmuteAllRemoteAudioStream sucess');
                logger.log(res);
            },
            fail(res) {
                logger.error('unmuteAllRemoteAudioStream fail');
                logger.error(res);
            },
        })
    }
    /**
     * 调节播放音量（该方法只能加入房间成功后调用才生效）
     * volume	int	音量可在0~200范围内进行调节
      - 0   : 静音
      - 100 : 原始音量
      - 200 : 最大可为原始音量的 2 倍(自带溢出保护)
     */
    adjustPlaybackSignalVolume(volume) {
        this.re.adjustPlaybackSignalVolume(volume);
    }
    /**
     * 调节录音音量，采集麦克风的音量（该方法只能加入房间成功后调用才生效）
     * volume	int	音量可在0~200范围内进行调节
      - 0   : 静音
      - 100 : 原始音量
      - 200 : 最大可为原始音量的 2 倍(自带溢出保护)
     */
    adjustRecordingSignalVolume(volume) {
        this.re.adjustRecordingSignalVolume(volume);
    }

    /**
     * @brief 启用说话者音量提示
     * > 该方法启用说话者音量提示。调用该方法后，将收到 audioVolumeIndication 事件回调。
        @note 该方法只有在joinChannel之后才生效
     * • 参数列表
     * interval	int	音量提示间隔，默认 200 ms
     */
    enableAudioVolumeIndication(interval: number) {
        this.re.enableAudioVolumeIndication({ interval });
    }
    /**
     * 回调相关
     * 
        事件名称	说明
        joinChannelSuccess 	当加入房间成功时回调该事件
        rejoinChannelSuccess	从用户掉线后重新加入房间成功回调该事件
        connectionLost	当网络连接断开时回调该事件
        connectionInterrupted	 当用户意外从房间内掉线时回调该事件，此时房间将继续尝试加入房间
        userJoined	当有其他用户加入到相同的房间后收到该事件
        userOffline	当用户离开房间时回调该事件
        networkQuality	当收到网络质量报告时回调该事件
        firstLocalAudioFrame	当收到本地第一帧音频的时候上报该事件
        firstRemoteAudioFrame	当收到远端流的第一帧音频的时候上报该事件
        userMuteAudio	当远端用户流开/禁声音时回调该事件
        userEnableAudio	当远端用户是否包含音频流的回调
        userEnableLocalAudio	当远端用户允许开启音频设备时回调该事件
        warning	当内部发生警告信息时回调该事件
        error	当内部发生不可逆转测错误时回调
     */
    on(eventName, cb) {
        this.re.on(eventName, cb);
    }


    authorize(success?, fail?) {
        // 1. 在合适的时机先获取麦克风权限
        tt.authorize({
            scope: 'scope.record',
            success: () => {
                console.log('授权成功');
                success && success();
            },
            fail: () => {
                console.log('授权失败');
                fail && fail();
            }
        })

    }
}

const rtcMgr = new RtcMgr();
export default rtcMgr;