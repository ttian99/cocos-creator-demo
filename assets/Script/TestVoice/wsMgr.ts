import popMgr from "../utils/libs/popMgr";

class WsMgr {
    ws = null;

    init() {
        const url = 'ws://192.168.10.163:8080';
        const ws = new WebSocket(url);
        this.ws = ws;

        ws.binaryType = 'arraybuffer';

        ws.onopen = function (event) {
            console.log('open connected');
            popMgr.show('open connected');
        }

        ws.onclose = function (event) {
            console.log('disconnected');
        }

        ws.onerror = function (event) {
            console.error('error');
            console.error(arguments);
        }

    }

    onmessage(cb) {
        this.ws.onmessage = cb;
        
        // function (event) {
        //     console.log('= get message =');
        //     // console.log(event);
        //     // console.log(event.data);
        //     const data = event.data;
        //     // logger.log('typeof data = ' + data);

        //     const fileMgr = tt.getFileSystemManager();
        //     const dirPath = tt.env.USER_DATA_PATH;
        //     const fileName = 'tmp.wav';
        //     const filePath = dirPath + '/' + fileName;

        //     fileMgr.writeFile({
        //         filePath: filePath,
        //         data: data,
        //         encoding: 'binary',
        //         success(res) {
        //             logger.log('success');
        //             logger.log(res);
        //             cc.loader.load(filePath, (err, data) => {
        //                 if (err) {
        //                     logger.error('loadRes error');
        //                     logger.error(err);
        //                     return;
        //                 }
        //                 logger.log('loadRes success');
        //                 logger.log(data);

        //                 cc.audioEngine.play(data, false, 1);
        //             });
        //         },
        //         fail(res) {
        //             logger.error('fail');
        //             logger.error(res)
        //         }
        //     });
        //     return;

        //     fileMgr.access({
        //         path: filePath,
        //         success(res) {
        //             logger.log('access success');
        //             logger.log(res);

        //             logger.log('has dir');
        //             fileMgr.writeFile({
        //                 filePath: filePath,
        //                 data: data,
        //                 encoding: 'binary',
        //                 success(res) {
        //                     logger.log('success');
        //                     logger.log(res);
        //                     cc.loader.load(filePath, (err, data) => {
        //                         if (err) {
        //                             logger.error('loadRes error');
        //                             logger.error(err);
        //                             return;
        //                         }
        //                         logger.log('loadRes success');
        //                         logger.log(data);

        //                         cc.audioEngine.play(data, false, 1);
        //                     });
        //                 },
        //                 fail(res) {
        //                     logger.error('fail');
        //                     logger.error(res)
        //                 }
        //             });

        //         },
        //         fail(res) {
        //             logger.error('access fail');
        //             logger.error(res)

        //             fileMgr.mkdir({
        //                 dirPath: dirPath,
        //                 success(res) {
        //                     logger.log('mkdir success');
        //                     logger.log(res);
        //                     fileMgr.writeFile({
        //                         filePath: filePath,
        //                         data: data,
        //                         encoding: 'binary',
        //                         success(res) {
        //                             logger.log('success');
        //                             logger.log(res);
        //                             cc.loader.load(filePath, (err, data) => {
        //                                 if (err) {
        //                                     logger.error('loadRes error');
        //                                     logger.error(err);
        //                                     return;
        //                                 }
        //                                 logger.log('loadRes success');
        //                                 logger.log(data);

        //                                 cc.audioEngine.play(data, false, 1);
        //                             });
        //                         },
        //                         fail(res) {
        //                             logger.error('fail');
        //                             logger.error(res)
        //                         }
        //                     });
        //                 },
        //                 fail(res) {
        //                     logger.error('mkdir fail');
        //                     logger.error(res)
        //                 }
        //             })
        //         }
        //     });


        // }
    }

    send(data) {
        this.ws.send(data);
    }
}

const wsMgr = new WsMgr();
export default wsMgr;