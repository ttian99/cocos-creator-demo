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

            onLogin(YIMErrorcodeOC, event) {},
            onLogout() {},
            onJoinChatRoom() {},
            onLeaveChatRoom() {},
            onSendMessageStatus() {},
            onVoiceMsgSend() {},
            onRecvMessage() {},
            onKickOff() {},

        };
        this.aYim = new yim.getInstance(dirtyWordsArray, appKey, events);
        this.aYim.debug = true;
    }

    login() {

    }


}

const yimMgr = new YimMgr();
export default yimMgr;