function handleStream(stream) {
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
}

export const EVENT_TYPE = {
    CANDIDATE: 'CANDIDATE',
    SHARED_INITED: 'SHARED_INITED',
    OFFER: "OFFER",
    ANSWER: "ANSWER",
    SDP: "SDP",
    CREATE_CHANEL: "CREATE_CHANEL",
    CREATE_CHANEL_DONE: "CREATE_CHANEL_DONE"
}

const getScaleDroneInstance = (() => {
    let scaleDroneInstance;
    return () => {
        if (!scaleDroneInstance) {
            scaleDroneInstance = new ScaleDrone('yiS12Ts5RdNhebyM')
        }
        return scaleDroneInstance
    }
})();

function getUserIP() {
    if (typeof window != 'undefined') {
        var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
        console.log("TCL: RTCPeerConnection", RTCPeerConnection)
        // window.mozRTCPeerConnection ||
        if (RTCPeerConnection) {
            var rtc = new RTCPeerConnection()
            rtc.createDataChannel(''); //创建一个可以发送任意数据的数据通道
            rtc.createOffer((offerDesc) => { //创建并存储一个sdp数据
                rtc.setLocalDescription(offerDesc)
            }, (e) => {
                console.log(e)
            })
            rtc.onicecandidate = (evt) => { //监听candidate事件
                console.log('evt.candidate', evt.candidate)
                if (evt.candidate) {
                    let ip_rule = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
                    // var ip_addr = ip_rule.exec(evt.candidate.candidate)[1]
                    var ip_addr = evt.candidate.address
                    // this.test(ip_addr);//调用方法把ip地址的值传出去
                    localStorage.setItem('ipInfo', ip_addr)
                    // func(ip_addr)
                }
            }
        }
    }
}

// getUserIP()

// window.onbeforeunload = () => getScaleDroneInstance().close()

export class Room {
    drone = getScaleDroneInstance();
    room;
    roomName = 'observable-1111';
    //rtc列表
    rtcList = {} as Record<string, WebTRC>;
    //是否是分享者
    isShare;
    //视频流
    stream;

    selfRtc: WebTRC;

    constructor(isShare) {
        this.isShare = isShare
        this.init();
    }

    //切换屏幕
    async switchScreen(chromeMediaSourceId) {
        try {
            // @ts-ignore
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId,
                        minWidth: 1280,
                        maxWidth: 4000,
                        minHeight: 720,
                        maxHeight: 4000
                    }
                }
            })
            this.stream = stream;
            Object.values(this.rtcList).forEach((rtc) => rtc.setStream(stream))
            handleStream(stream)
        } catch (e) {
            console.log(e)
        }
    }


    init() {
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            this.room = this.drone.subscribe(this.roomName);

            this.room.on('open', error => {
                console.log(this.room, '房间已创建');
            });

            this.room.on('message', ({data: message, id, timestamp, clientId, member}) => {
                console.log({data: message, id, timestamp, clientId, member})
                if (clientId === this.drone.clientId) {
                    return;
                }
                console.log(message)
                if (this.isShare && EVENT_TYPE.CREATE_CHANEL == message.type) {
                    const roomName = this.roomName + "_" + message.clientId
                    const room = this.drone.subscribe(roomName);

                    room.on('open', error => {
                        console.log(room, '房间已创建');
                    });
                    // Listen to signaling data from Scaledrone
                    room.on('message', ({data: message, id, timestamp, clientId, member}) => {
                        console.log({data: message, id, timestamp, clientId, member})
                        if (message.clientId === this.drone.clientId) {
                            return;
                        }
                        if (message.type == EVENT_TYPE.SDP) {
                            this.rtcList[message.clientId].processSDP(message.sdp);
                        }
                        if (message.type == EVENT_TYPE.CANDIDATE) {
                            this.rtcList[message.clientId].processCandidate(message.candidate);
                        }
                    })
                    this.rtcList[message.clientId] = new WebTRC({
                        isShare: this.isShare,
                        room,
                        sendMessage: (type, message) => {
                            this.drone.publish({
                                room: roomName,
                                message: {
                                    type,
                                    ...message,
                                    clientId: this.drone.clientId,
                                    isShare: this.isShare,
                                }
                            })
                        }
                    });
                    console.log('this.stream', this.stream)
                    // this.rtcList[message.clientId].sendOffer();
                    this.stream && this.rtcList[message.clientId].setStream(this.stream);
                    console.log('rtcList', this.rtcList)
                }
            })
            //不是分享端 就只创建自己的rtc
            if (!this.isShare) {
                const roomName = this.roomName + "_" + this.drone.clientId
                const room = this.drone.subscribe(roomName);
                room.on('open', error => {
                    this.selfRtc = new WebTRC({
                        isShare: this.isShare,
                        room,
                        sendMessage: (type, message) => {
                            this.drone.publish({
                                room: roomName,
                                message: {
                                    type,
                                    clientId: this.drone.clientId,
                                    ...message,
                                }
                            })
                        }
                    });
                    this.drone.publish({
                        room: this.roomName,
                        message: {
                            clientId: this.drone.clientId,
                            type: EVENT_TYPE.CREATE_CHANEL
                        }
                    })
                });
                room.on('message', ({data: message, id, timestamp, clientId, member}) => {
                    console.log({data: message, id, timestamp, clientId, member})
                    if (message.clientId === this.drone.clientId || !message.isShare) {
                        return;
                    }
                    if (message.type == EVENT_TYPE.SDP) {
                        this.selfRtc.processSDP(message.sdp);
                    }
                    if (message.type == EVENT_TYPE.CANDIDATE) {
                        this.selfRtc.processCandidate(message.candidate);
                    }
                })
            }
        });
    }
}

export class WebTRC {
    room;
    peer: RTCPeerConnection;
    configuration = {
        iceServers: [
            {urls: 'stun:stun01.sipphone.com'},
            {urls: 'stun:stun.ekiga.net'},
            {urls: 'stun:stun.fwdnet.net'},
            {urls: 'stun:stun.ideasip.com'},
            {urls: 'stun:stun.iptel.org'},
            {urls: 'stun:stun.rixtelecom.se'},
            {urls: 'stun:stun.schlund.de'},
            {urls: 'stun:stun.l.google.com:19302'},
            {urls: 'stun:stun1.l.google.com:19302'},
            {urls: 'stun:stun2.l.google.com:19302'},
            {urls: 'stun:stun3.l.google.com:19302'},
            {urls: 'stun:stun4.l.google.com:19302'},
            {urls: 'stun:stunserver.org'},
            {urls: 'stun:stun.softjoys.com'},
            {urls: 'stun:stun.voiparound.com'},
            {urls: 'stun:stun.voipbuster.com'},
            {urls: 'stun:stun.voipstunt.com'},
            {urls: 'stun:stun.voxgratia.org'},
            {urls: 'stun:stun.xten.com'},
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
            {
                urls: 'turn:192.158.29.39:3478?transport=udp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            },
            {
                urls: 'turn:192.158.29.39:3478?transport=tcp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            }
        ]
    }

    constructor(room) {
        this.room = room;
        this.init();
    }

    init() {
        this.peer = new RTCPeerConnection();
        this.peer.createDataChannel('');
        this.peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            console.log(' this.peer.onicecandidate')
            if (event.candidate) {
                console.log(' this.peer.onicecandidate event.candidate')
                this.room.sendMessage(EVENT_TYPE.CANDIDATE, {
                    'candidate': event.candidate
                });
            }
        }
        if (this.room.isShare) {
            this.peer.onnegotiationneeded = () => {
                console.log('this.peer.onnegotiationneeded')
                this.sendOffer()
            }
        }
        this.peer.ontrack = event => {
            console.log('this.peer.ontrack', this.peer.ontrack)
            console.log('this.peer.ontrack event', event)
            if (!event.streams?.length) {
                console.log('event.streams?.length', event.streams?.length)
                return
            }
            const remoteVideo = document.getElementsByTagName('video')[0] as HTMLVideoElement;
            console.log('remoteVideo', remoteVideo)
            remoteVideo.srcObject = event.streams[0];
            remoteVideo.onloadedmetadata = ()=>{
                remoteVideo.play()
            }
            console.log(remoteVideo.srcObject)
        };
    }

    /**
     * 发送offer
     */
    async sendOffer() {
        // 发送方 创建offer
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        this.room.sendMessage(EVENT_TYPE.SDP, {sdp: this.peer.localDescription});
    }

    /**
     * 接受offer
     * @param offer
     */
    async processSDP(sdp) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(sdp));
        console.log('this.peer.remoteDescription.type', this.peer.remoteDescription.type)
        if (this.peer.remoteDescription.type === 'offer') {
            const answer = await this.peer.createAnswer();
            await this.peer.setLocalDescription(answer);
            this.room.sendMessage(EVENT_TYPE.SDP, {sdp: this.peer.localDescription});
        }
    }

    /**
     * 传输本地流到远程
     * @param stream
     */
    setStream(stream) {
        if (!this.peer) {
            return;
        }
        //先移除之前的
        // this.peer.getTracks().forEach(this.peer.removeTrack)
        // Add your stream to be sent to the conneting peer
        console.log('stream.getTracks()', stream.getTracks())
        stream.getTracks().forEach((track) => this.peer.addTrack(track, stream));
    }

    /**
     * 处理ice
     * @param candidate
     */
    async processCandidate(candidate) {
        await this.peer.addIceCandidate(candidate);
    }
}
