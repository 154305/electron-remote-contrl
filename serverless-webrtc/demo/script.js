const EVENT_TYPE = {
    CANDIDATE: 'CANDIDATE',
    SHARED_INITED: 'SHARED_INITED',
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


class Room {
    drone = getScaleDroneInstance();
    room;
    roomName = 'observable-1111';
    //rtc列表
    rtcList = {};
    //是否是分享者
    isShare;
    //视频流
    stream;

    selfRtc;

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
                        chromeMediaSourceId: chromeMediaSourceId,
                        minWidth: 1280,
                        maxWidth: 4000,
                        minHeight: 720,
                        maxHeight: 4000
                    }
                }
            })
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

            // We're connected to the room and received an array of 'members'
            // connected to the room (including us). Signaling server is ready.
            this.room.on('members', members => {
            });

            // Listen to signaling data from Scaledrone
            this.room.on('data', (message, client) => {
                // Message was sent by us
                if (message.clientId === this.drone.clientId) {
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
                    room.on('data', (message, client) => {
                        // Message was sent by us
                        if (message.clientId === this.drone.clientId) {
                            return;
                        }
                        console.log(message)
                        if (message.type === EVENT_TYPE.SDP) {
                            this.rtcList[message.clientId].processSDP(message);
                        }
                        if (message.type == EVENT_TYPE.CANDIDATE) {
                            this.rtcList[message.clientId].processCandidate(message);
                        }
                    })
                    this.stream && this.rtcList[message.clientId].setStream(this.stream);
                    this.drone.publish({
                        room: roomName,
                        message: {
                            clientId: this.drone.clientId,
                            type: EVENT_TYPE.CREATE_CHANEL_DONE
                        }
                    });

                    setTimeout(() => {
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
                                    }
                                })
                            }
                        });
                    }, 1000)
                }
            })
            //不是分享端 就只创建自己的rtc
            if (!this.isShare) {
                const roomName = this.roomName + "_" + this.drone.clientId
                const room = this.drone.subscribe(roomName);
                room.on('open', error => {
                    console.log(room, '房间已创建');
                });
                // Listen to signaling data from Scaledrone
                room.on('data', (message, client) => {
                    console.log('message', message)
                    // Message was sent by us
                    if (message.clientId === this.drone.clientId) {
                        return;
                    }
                    if (message.type === EVENT_TYPE.SDP) {
                        this.selfRtc.processSDP(message);
                    }
                    if (message.type === EVENT_TYPE.CANDIDATE) {
                        this.selfRtc.processCandidate(message);
                    }
                    if (message.type === EVENT_TYPE.CREATE_CHANEL_DONE) {
                        this.selfRtc = new WebTRC({
                            isShare: this.isShare,
                            room,
                            sendMessage: (type, message) => {
                                this.drone.publish({
                                    room: roomName,
                                    message: {
                                        type,
                                        ...message,
                                        clientId: this.drone.clientId,
                                    }
                                })
                            }
                        });
                    }
                })
                this.drone.publish({
                    room: this.roomName,
                    message: {
                        clientId: this.drone.clientId,
                        type: EVENT_TYPE.CREATE_CHANEL
                    }
                })
            }
        });
    }
}

class WebTRC {
    room;
    pc;
    configuration = {
        iceServers: [{
            urls: 'stun:stun.l.google.com:19302'
        }]
    }

    constructor(room) {
        this.room = room;
        this.startWebRTC(room.isShare);
    }

    startWebRTC(isOfferer) {
        this.pc = new RTCPeerConnection(this.configuration);
        // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
        // message to the other peer through the signaling server
        this.pc.addEventListener('onicecandidate', (event) => {
            console.log(' this.pc.onicecandidate')
            if (event.candidate) {
                console.log(' this.pc.onicecandidate event.candidate')
                this.room.sendMessage(EVENT_TYPE.CANDIDATE, {
                    'candidate': event.candidate
                });
            }
        })
        this.pc.onicecandidate = event => {
            console.log(' this.pc.onicecandidate')
            if (event.candidate) {
                console.log(' this.pc.onicecandidate event.candidate')
                this.room.sendMessage(EVENT_TYPE.CANDIDATE, {
                    'candidate': event.candidate
                });
            }
        };

        // If user is offerer let the 'negotiationneeded' event create the offer
        if (isOfferer) {
            // this.pc.onnegotiationneeded = () => {
            // this.pc.createOffer().then(this.localDescCreated).catch(onError);
            // }
            setTimeout(()=>{
                this.pc.createOffer().then(this.localDescCreated.bind(this)).catch(onError);
            },1000)
        } else {
            this.pc.ontrack = event => {
                console.log(event)
                // const remoteVideo = document.getElementById('remoteVideo');
                const stream = event.streams[0];
                console.log(stream)
                // if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
                //   remoteVideo.srcObject = stream;
                // }
            };
        }
    }

    setStream(stream) {
        if (!this.pc) {
            return;
        }
        //先移除之前的
        this.pc.getTracks().forEach(this.pc.removeTrack)
        // Add your stream to be sent to the conneting peer
        stream.getTracks().forEach(this.pc.addTrack);
    }

    processSDP(message) {
        // This is called after receiving an offer or answer from another peer
        this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
            // When receiving an offer lets answer it
            if (this.pc.remoteDescription.type === 'offer') {
                console.log('offer',message.sdp)
                this.pc.createAnswer().then(this.localDescCreated.bind(this)).catch(onError);
            }
        }, onError);
    }

    processCandidate(message) {
        // Add the new ICE candidate to our connections remote description
        this.pc.addIceCandidate(new RTCIceCandidate(message.candidate), onSuccess, onError);
    }

    localDescCreated(desc) {
        console.log('this.pc', this.pc)
        this.pc.setLocalDescription(desc, () => this.room.sendMessage(EVENT_TYPE.SDP, {'sdp': this.pc.localDescription}), onError);
    }
}


function onSuccess() {
    console.log(...arguments)
}

function onError() {
    console.error(...arguments);
}

new Room(false);
