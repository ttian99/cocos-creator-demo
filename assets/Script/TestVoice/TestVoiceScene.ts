import yimMgr from "./yimMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestVoiceScene extends cc.Component {

    @property(cc.Label) label: cc.Label = null;

    start () {
        yimMgr.init();
        yimMgr.login();
    }
}
