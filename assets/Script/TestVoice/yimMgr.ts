/** 回调事件 */
interface cbEvent {
    code: YIMErrorcode,
    message: string,
    data: any,
}

enum YIMErrorcode {
    YIMErrorcode_Success = 0,	        //成功
    YIMErrorcode_EngineNotInit = 1,	    //IM SDK未初始化
    YIMErrorcode_NotLogin = 2,	        //IM SDK未登录
    YIMErrorcode_ParamInvalid = 3,	    //无效的参数
    YIMErrorcode_TimeOut = 4,	        //超时
    YIMErrorcode_StatusError = 5,	    //状态错误
    YIMErrorcode_SDKInvalid = 6,	    //Appkey无效
    YIMErrorcode_AlreadyLogin = 7,	    //已经登录
    YIMErrorcode_LoginInvalid = 1001,	//登录无效
    YIMErrorcode_ServerError = 8,	    //服务器错误
    YIMErrorcode_NetError = 9,	        //网络错误
    YIMErrorcode_LoginSessionError = 10,//登录状态出错
    YIMErrorcode_NotStartUp = 11,	    //SDK未启动
    YIMErrorcode_FileNotExist = 12,	    //文件不存在
    YIMErrorcode_SendFileError = 13,	//文件发送出错
    YIMErrorcode_UploadFailed = 14,	    //文件上传失败
    YIMErrorcode_UsernamePasswordError = 15,//	用户名密码错误
    YIMErrorcode_UserStatusError = 16,  //用户状态为无效用户
    YIMErrorcode_MessageTooLong = 17,   //消息太长
    YIMErrorcode_ReceiverTooLong = 18,  //接收方ID过长（检查频道名）
    YIMErrorcode_InvalidChatType = 19,  //无效聊天类型
    YIMErrorcode_InvalidReceiver = 20,  //无效用户ID
    YIMErrorcode_UnknowError = 21,      //未知错误
    YIMErrorcode_InvalidAppkey = 22,    //AppKey无效
    YIMErrorcode_ForbiddenSpeak = 23,   //被禁止发言
    YIMErrorcode_CreateFileFailed = 24, //创建文件失败
    YIMErrorcode_UnsupportFormat = 25,  //支持的文件格式
    YIMErrorcode_ReceiverEmpty = 26,    //接收方为空
    YIMErrorcode_RoomIDTooLong = 27,    //房间名太长
    YIMErrorcode_ContentInvalid = 28,   //聊天内容严重非法
    YIMErrorcode_NoLocationAuthrize = 29,   //未打开定位权限
    YIMErrorcode_UnknowLocation = 30,   //未知位置
    YIMErrorcode_Unsupport = 31,        //不支持该接口
    YIMErrorcode_NoAudioDevice = 32,    //无音频设备
    YIMErrorcode_AudioDriver = 33,      //音频驱动问题
    YIMErrorcode_DeviceStatusInvalid = 34,  //设备状态错误
    YIMErrorcode_ResolveFileError = 35, //文件解析错误
    YIMErrorcode_ReadWriteFileError = 36,   //文件读写错误
    YIMErrorcode_NoLangCode = 37,       //语言编码错误
    YIMErrorcode_TranslateUnable = 38,  //翻译接口不可用
    YIMErrorcode_PTT_Start = 2000,	    //开始录音
    YIMErrorcode_PTT_Fail = 2001,	    //录音失败
    YIMErrorcode_PTT_DownloadFail = 2002,	//语音消息文件下载失败
    YIMErrorcode_PTT_GetUploadTokenFail = 2003,	//获取语音消息Token失败
    YIMErrorcode_PTT_UploadFail = 2004,	//语音消息文件上传失败
    YIMErrorcode_PTT_NotSpeech = 2005,	//没有录音内容
    YIMErrorcode_PTT_DeviceStatusError = 2006,  //语音设备状态错误
    YIMErrorcode_PTT_IsSpeeching = 2007,//录音中
    YIMErrorcode_PTT_FileNotExist = 2008,//文件不存在
    YIMErrorcode_PTT_ReachMaxDuration = 2009,//达到最大时长限制
    YIMErrorcode_PTT_SpeechTooShort = 2010,//录音时间太短
    YIMErrorcode_PTT_StartAudioRecordFailed = 2011,//启动录音失败
    YIMErrorcode_PTT_SpeechTimeout = 2012,//音频输入超时
    YIMErrorcode_PTT_IsPlaying = 2013,  //在播放
    YIMErrorcode_PTT_NotStartPlay = 2014,//未开始播放
    YIMErrorcode_PTT_CancelPlay = 2015, //主动取消播放
    YIMErrorcode_PTT_NotStartRecord = 2016,//未开始语音
    YIMErrorcode_Fail = 10000,	        //语音服务启动失败
    YIMErrorcode_NOTLOGIN = 20001,      //未登录
    YIMErrorcode_INVALID_PARAM = 20002, //参数设置无效
    YIMErrorcode_INVALID_LOGIN = 20003, //登录失败
    YIMErrorcode_USERNAME_TOKEN_ERROR = 20004,//用户名、token无效
    YIMErrorcode_LOGIN_TIMEOUT = 20005, //登录超时
    YIMErrorcode_SERVICE_OVERLOAD = 20006,//服务器超载
    YIMErrorcode_MSG_TOO_LONG = 20007	//发送消息内容超长
}

/**
 * 游密语音管理类
 * @wiki https://www.youme.im/doc/IMSDKHtml5.php#%E5%88%9D%E5%A7%8B%E5%8C%96SDK
 */
class YimMgr {
    aYim = null;

    init() {
        const dirtyWordsArray = [];
        const appKey = 'YOUMEF2A580046CBFB83F88AD3C82EB881D09199B7B80';
        const events = {
            onLogin(YIMErrorcodeOC: YIMErrorcode, event: cbEvent) {
                console.log('=== onLogin ==');
                console.log('YIMErrorcodeOC = ' + YIMErrorcodeOC);
                console.log('event', event);

            },
            onLogout() { },
            onJoinChatRoom() { },
            onLeaveChatRoom() { },
            onSendMessageStatus() { },
            onVoiceMsgSend() { },
            onRecvMessage() { },
            onKickOff() { },

        };
        this.aYim = new yim.getInstance(dirtyWordsArray, appKey, events);
        this.aYim.debug = true;
    }

    login() {
        this.aYim.login('9001', '');
    }


}

const yimMgr = new YimMgr();
export default yimMgr;