import logger from "../utils/libs/logger";
import popMgr from "../utils/libs/popMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TTGameWs extends cc.Component {

    ws = null;

    start() {
        popMgr.show('---==================');
        this.init();
    }

    init() {
        const url = 'ws://192.168.10.163:8080/?uid='+ 12;
        const ws = new WebSocket(url);
        this.ws = ws;

        ws.binaryType = 'arraybuffer';

        ws.onopen = function (event) {
            console.log('open connected');
            // let buffer = new Uint8Array([1, 2, 3]);
            // ws.send(buffer.toString());

            popMgr.show('open connected');
        }

        ws.onclose = function (event) {
            console.log('disconnected');
        }

        ws.onmessage = function (event) {
            console.log('= get message =');
            console.log(event);
            console.log(event.data);
            const arr = new Float32Array(event.data);
            console.log(arr);
        }

        ws.onerror = function (event) {
            console.error('error');
            console.error(arguments);
        }


        // ws.on('open', function open() {
        //     console.log('connected');
        //     ws.send(Date.now());
        // });
        // ws.on('close', function close() {
        //     console.log('disconnected');
        // });
        // ws.on('message', function incoming(data) {
        //     console.log(`Roundtrip time: ${Date.now() - data} ms`);

        //     setTimeout(function timeout() {
        //         ws.send(Date.now());
        //     }, 500);
        // });
    }


    sendMp3() {
        const ws = this.ws;

        // let arr = new Float32Array(4);
        // arr.set([1,2,3], 1);
        // arr[0] = 1;
        // ws.send(arr.buffer);
        // return;
        cc.loader.loadRes('camera', cc.AudioClip, (err, res: cc.AudioClip) => {
            if (err) {
                popMgr.show(err);
                logger.error(err);
                return;
            }
            logger.warn(res);
            logger.warn(res._audio);

            const buffer: ArrayBuffer = res._audio.getChannelData(0);
            const len = buffer.byteLength;
            // logger.log('len = ' + len);
            let arr = new Float32Array(len + 1);
            arr.set(buffer, 1);
            arr[0] = 36;
            popMgr.show('==> send msg ==');

            ws.send(arr);


            // ws.send(buffer.toString());

            // const rawUrl = res.nativeUrl;
            // cc.loader.load(rawUrl + '?useDom=1', (err, data) => {
            //     if (err) {
            //         logger.error(err);
            //         return;
            //     }
            //     logger.log('rawURL success');
            //     logger.warn(data);
            // });

            // const fileMgr = tt.getFileSystemManager();
            // fileMgr.writeFile({
            //     filePath: 'test.mp3',
            //     data: buffer,
            //     success(res) {
            //         logger.log('success');
            //         logger.log(res);
            //     },
            //     fail(res) {
            //         logger.error('fail');
            //         logger.error(res)
            //     }
            // });

        })
    }
}
