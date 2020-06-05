import popMgr from "./utils/libs/popMgr";

(() => {
    cc.game.on(cc.game.EVENT_GAME_INITED, () => {
        popMgr.init();
    });
})();